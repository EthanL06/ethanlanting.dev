// https://dev.to/mattlewandowski93/lazy-loaded-video-component-in-react-22dp

import { CSSProperties, useCallback, useEffect, useRef } from "react";

import { useIsVisible } from "@/hooks/use-is-visible";

type VideoProps = {
  src: string;
  poster?: string;
  alt?: string;
  style?: CSSProperties;
  className?: string;
};
export const Video = ({ src, poster, style, alt, className }: VideoProps) => {
  const { isVisible, targetRef } = useIsVisible(
    {
      root: null,
      rootMargin: "200px",
      threshold: 0.1,
    },
    false,
  );

  const videoRef = useRef<HTMLVideoElement>(null);

  const startVideoOnMouseMove = useCallback(async () => {
    try {
      if (videoRef.current) {
        await videoRef.current.play();
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const stopVideoOnMove = useCallback(() => {
    try {
      videoRef.current?.pause();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      startVideoOnMouseMove();
    } else {
      stopVideoOnMove();
    }
  }, [isVisible, startVideoOnMouseMove, stopVideoOnMove]);

  return (
    <span ref={targetRef as React.RefObject<HTMLSpanElement>}>
      <video
        ref={videoRef}
        loop
        muted
        autoPlay={false}
        preload="none"
        playsInline
        poster={poster}
        aria-label={alt}
        style={style}
        className={className}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag. Please try viewing this
        page in a modern browser.
      </video>
    </span>
  );
};
