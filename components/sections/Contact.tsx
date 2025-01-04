"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";

const CONTACT_API_URL =
  "https://script.google.com/macros/s/AKfycbwLN0Ir3ADcA67rqYCXhMpTavSExEJtQC4QzgVm-sOzLaQEcrHLnreq6GKqR0hsqizTGw/exec";

const Contact = () => {
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      message: (document.getElementById("message") as HTMLInputElement).value,
    };

    setSubmitDisabled(true);

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      (document.getElementById("name") as HTMLInputElement).value = "";
      (document.getElementById("email") as HTMLInputElement).value = "";
      (document.getElementById("message") as HTMLInputElement).value = "";

      alert("Message sent successfully!");
      console.log("data", response);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitDisabled(false);
    }
  };

  return (
    <section id="contact" className="border-y border-white/10 py-12">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-[26.875rem] flex-col items-center gap-6"
      >
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-center text-lg font-extrabold text-white">
            Get in touch with me
          </h2>
          <p className="text-balance text-center text-sm font-medium">
            Feel free to send me a message using the form or email me at{" "}
            <Link
              className="font-bold leading-relaxed text-accent hover:underline"
              href="mailto:ethanclanting@gmail.com"
              target="_blank"
            >
              ethanclanting@gmail.com
            </Link>
          </p>
        </div>

        <div className="w-full space-y-1">
          <label htmlFor="name" className="text-xs font-semibold text-white">
            Name <span className="text-red-700">*</span>
          </label>
          <input
            required
            className="w-full rounded-full border border-white/10 bg-background px-3 py-2 text-xs text-white focus:border-accent focus:outline-none"
            id="name"
          />
        </div>

        <div className="w-full space-y-1">
          <label htmlFor="name" className="text-xs font-semibold text-white">
            Email <span className="text-red-700">*</span>
          </label>
          <input
            required
            type="email"
            className="w-full rounded-full border border-white/10 bg-background px-3 py-2 text-xs text-white focus:border-accent focus:outline-none"
            id="email"
          />
        </div>

        <div className="w-full space-y-1">
          <label htmlFor="name" className="text-xs font-semibold text-white">
            Message <span className="text-red-700">*</span>
          </label>
          <textarea
            required
            className="min-h-28 w-full rounded-2xl border border-white/10 bg-background px-3 py-2 text-xs text-white focus:border-accent focus:outline-none"
            id="message"
          />
        </div>

        <div className="flex w-full justify-end">
          <button
            type="submit"
            disabled={submitDisabled}
            className="flex items-center gap-1 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-background transition-colors hover:bg-white/75 disabled:cursor-not-allowed disabled:bg-white/70"
          >
            {submitDisabled ? (
              <>
                <svg
                  className="size-3.5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="text-black opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="fill-black"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Send
              </>
            ) : (
              <>
                <Send size={14} /> Send
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
