"use client";

import type { Project } from "@/data/projects";
import { motion, useReducedMotion } from "motion/react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { createPortal, flushSync, preload } from "react-dom";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

type Props = Pick<Project, "media" | "slug" | "title" | "url"> & {
  variant: "thumbnail" | "detail";
};

type ImageRect = {
  height: number;
  left: number;
  top: number;
  width: number;
};

type PendingTransition = {
  direction: "forward" | "back";
  rect: ImageRect;
  slug: string;
  src: string;
};

type ActiveTransition = PendingTransition & {
  destination?: ImageRect;
};

let pendingTransition: PendingTransition | null = null;

const imageTransition = {
  duration: 0.4,
  ease: [0.77, 0, 0.175, 1] as [number, number, number, number],
};

const backImageTransition = {
  bounce: 0.1,
  duration: 0.5,
  type: "spring" as const,
};

const detailImageSizes =
  "(min-width: 1024px) 1024px, (min-width: 640px) calc(100vw - 8rem), calc(100vw - 2.5rem)";

const getRect = (element: HTMLElement): ImageRect => {
  const { height, left, top, width } = element.getBoundingClientRect();

  return { height, left, top, width };
};

const getCurrentImageSource = (element: HTMLElement, fallback: string) =>
  element.querySelector("img")?.currentSrc || fallback;

export const prepareProjectImageBackTransition = () => {
  const detailImage = document.querySelector<HTMLElement>(
    "[data-project-image-detail]",
  );
  const slug = detailImage?.dataset.projectImageSlug;
  const src = detailImage?.querySelector("img")?.currentSrc;

  if (!detailImage || !slug || !src) return;

  pendingTransition = {
    direction: "back",
    rect: getRect(detailImage),
    slug,
    src,
  };
};

export const isProjectImageBackTransitionPending = () =>
  pendingTransition?.direction === "back";

export const isProjectImageForwardTransitionPending = () =>
  pendingTransition?.direction === "forward";

export const preloadProjectImage = (media: string, title: string) => {
  const { props } = getImageProps({
    alt: `${title} project screenshot`,
    height: 810,
    sizes: detailImageSizes,
    src: media,
    width: 1440,
  });

  preload(props.src, {
    as: "image",
    fetchPriority: "high",
    imageSizes: detailImageSizes,
    imageSrcSet: props.srcSet,
  });
};

const ProjectImage = ({ media, slug, title, url, variant }: Props) => {
  const isDetail = variant === "detail";
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupTokenRef = useRef<{ cancelled: boolean }>(null);
  const [activeTransition, setActiveTransition] =
    useState<ActiveTransition | null>(null);
  const expectedDirection = isDetail ? "forward" : "back";
  const isPendingDestination =
    !shouldReduceMotion &&
    pendingTransition?.slug === slug &&
    pendingTransition.direction === expectedDirection;

  useLayoutEffect(() => {
    if (cleanupTokenRef.current) {
      cleanupTokenRef.current.cancelled = true;
    }
    const cleanupToken = { cancelled: false };
    cleanupTokenRef.current = cleanupToken;
    const transitionNode = containerRef.current;
    const frames: number[] = [];
    const isMatch = (pending: PendingTransition | null) =>
      pending?.slug === slug && pending.direction === expectedDirection;
    const nextFrame = (callback: () => void) => {
      frames.push(window.requestAnimationFrame(callback));
    };
    const beginTransition = (pending: PendingTransition) => {
      setActiveTransition(pending);
      const setDestination = () => {
        const destination = containerRef.current;

        if (destination) {
          setActiveTransition({
            ...pending,
            destination: getRect(destination),
          });
        }
      };

      nextFrame(() => {
        if (pending.direction === "back") {
          setDestination();
          return;
        }

        nextFrame(() => {
          setDestination();
        });
      });
    };

    if (isMatch(pendingTransition)) {
      if (shouldReduceMotion) {
        pendingTransition = null;
      } else {
        beginTransition(pendingTransition!);
      }
    } else if (!isDetail) {
      nextFrame(() => {
        if (isMatch(pendingTransition) && !shouldReduceMotion) {
          beginTransition(pendingTransition!);
        }
      });
    }

    return () => {
      frames.forEach((frame) => window.cancelAnimationFrame(frame));

      if (isDetail && !shouldReduceMotion && transitionNode) {
        const reverseTransition: PendingTransition = {
          direction: "back",
          rect: getRect(transitionNode),
          slug,
          src: getCurrentImageSource(transitionNode, media),
        };

        queueMicrotask(() => {
          if (!cleanupToken.cancelled) {
            pendingTransition = reverseTransition;
          }
        });
      }
    };
  }, [expectedDirection, isDetail, media, shouldReduceMotion, slug]);

  useEffect(() => {
    if (
      activeTransition?.direction !== "back" ||
      !activeTransition.destination
    ) {
      return;
    }

    const finishTransition = () => {
      pendingTransition = null;
      flushSync(() => setActiveTransition(null));
    };
    const passiveOptions: AddEventListenerOptions = {
      once: true,
      passive: true,
    };

    window.addEventListener("wheel", finishTransition, passiveOptions);
    window.addEventListener("touchmove", finishTransition, passiveOptions);
    window.addEventListener("pointerdown", finishTransition, { once: true });
    window.addEventListener("keydown", finishTransition, { once: true });

    return () => {
      window.removeEventListener("wheel", finishTransition);
      window.removeEventListener("touchmove", finishTransition);
      window.removeEventListener("pointerdown", finishTransition);
      window.removeEventListener("keydown", finishTransition);
    };
  }, [activeTransition?.destination, activeTransition?.direction]);

  const startForwardTransition = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.detail === 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      shouldReduceMotion
    ) {
      return;
    }

    const thumbnail = containerRef.current;

    if (!thumbnail) return;

    pendingTransition = {
      direction: "forward",
      rect: getRect(thumbnail),
      slug,
      src: getCurrentImageSource(thumbnail, media),
    };
  };

  const image = (
    <Image
      className="project-image aspect-video w-full object-cover object-center"
      width={isDetail ? 1440 : 480}
      height={isDetail ? 810 : 270}
      src={media}
      alt={`${title} project screenshot`}
      sizes={isDetail ? detailImageSizes : undefined}
    />
  );
  const overlayScale = activeTransition?.destination
    ? activeTransition.destination.width / activeTransition.rect.width
    : 1;
  const overlayBorderRadius = activeTransition?.destination
    ? (activeTransition.direction === "forward" ? 16 : 8) / overlayScale
    : activeTransition?.direction === "forward"
      ? 8
      : 16;
  const overlayTransform = activeTransition?.destination
    ? `translate3d(${activeTransition.destination.left - activeTransition.rect.left}px, ${activeTransition.destination.top - activeTransition.rect.top}px, 0) scale(${activeTransition.destination.width / activeTransition.rect.width}, ${activeTransition.destination.height / activeTransition.rect.height})`
    : "translate3d(0px, 0px, 0) scale(1, 1)";

  return (
    <>
      <div
        ref={containerRef}
        data-project-image-detail={isDetail ? "" : undefined}
        data-project-image-slug={slug}
        className={`project-image-interaction overflow-clip border border-white/10 ${
          isDetail ? "shadow-2xl shadow-accent/10" : "hover:cursor-pointer"
        }`}
        style={{
          borderRadius: isDetail ? 16 : 8,
          opacity: activeTransition || isPendingDestination ? 0 : 1,
        }}
      >
        {isDetail ? (
          url ? (
            <a
              className="block"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {image}
            </a>
          ) : (
            image
          )
        ) : (
          <Link
            className="block"
            href={`/projects/${slug}`}
            onClick={startForwardTransition}
          >
            {image}
          </Link>
        )}
      </div>

      {activeTransition &&
        createPortal(
          <motion.div
            aria-hidden="true"
            className="fixed z-50 overflow-hidden border border-white/10 shadow-2xl shadow-accent/10"
            data-project-image-overlay
            initial={false}
            animate={{
              borderRadius: overlayBorderRadius,
              transform: overlayTransform,
            }}
            onAnimationComplete={
              activeTransition.destination
                ? () => {
                    pendingTransition = null;
                    setActiveTransition(null);
                  }
                : undefined
            }
            style={{
              backgroundImage: `url("${activeTransition.src}")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: activeTransition.rect.height,
              left: activeTransition.rect.left,
              pointerEvents: "none",
              top: activeTransition.rect.top,
              transformOrigin: "top left",
              width: activeTransition.rect.width,
              willChange: "transform",
            }}
            transition={
              activeTransition.direction === "back"
                ? backImageTransition
                : imageTransition
            }
          />,
          document.body,
        )}
    </>
  );
};

export default ProjectImage;
