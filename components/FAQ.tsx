"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How is Clowk different from Clerk or Auth0?",
    a: "Clerk and Auth0 own the sign-in UI — they render forms, inputs, and social buttons inside your app. Clowk takes a different approach: it brokers the authentication between your app and OAuth providers through a redirect flow. Your app redirects to Clowk, the user authenticates, and your app receives a signed JWT back. No embedded UI to maintain, no frontend lock-in.",
  },
  {
    q: "What does \"broker\" mean?",
    a: "Your App → Clowk (handles OAuth) → Your App (receives signed JWT). OAuth requires redirects anyway — Google, GitHub, and Twitter will redirect the user regardless. Embedding a UI doesn't eliminate the redirect, it just adds an intermediary. Clowk removes that intermediary.",
  },
  {
    q: "How do I get started?",
    a: "Sign up at clowk.dev, create an app, and grab your publishable and secret keys. Install the SDK for your stack (@clowk/react, @clowk/nextjs, @clowk/express, or @clowk/hono) and you're ready to authenticate users in minutes.",
  },
  {
    q: "Which OAuth providers are supported?",
    a: "Google, GitHub, and Twitter are built in. Email/password authentication is also included. More providers are on the roadmap.",
  },
  {
    q: "Does Clowk work with non-Rails apps?",
    a: "Yes. The @clowk/react, @clowk/nextjs, @clowk/express, and @clowk/hono packages cover most JavaScript stacks. The @clowk/core package is runtime-agnostic and works on Node.js, Bun, Deno, and Cloudflare Workers.",
  },
  {
    q: "Is Clowk really free?",
    a: "Yes. The Free plan includes everything you need to ship authentication. A PRO plan is available for teams that need advanced features. There's no per-MAU billing — ever. Contact support for details on plans.",
  },
  {
    q: "How does multi-tenancy work?",
    a: "One Clowk account, unlimited apps. Each app gets its own publishable key, secret key, OAuth redirect URIs, and user namespace. Users are scoped per app, not shared globally.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-[#F43F5E] tracking-widest uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#18181B] leading-tight">
            Common questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-200 ${
                open === i
                  ? "border-[#FBCCD3] bg-[#FEF2F4]"
                  : "border-[#E4E4E7] bg-white hover:border-[#FBCCD3]"
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-[#18181B] font-medium text-base leading-snug">
                  {faq.q}
                </span>
                <span
                  className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    open === i
                      ? "bg-[#F43F5E] text-white rotate-45"
                      : "bg-[#F4F4F5] text-[#71717A]"
                  }`}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>

              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-[#71717A] text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#71717A] text-sm mb-4">
            Still have questions? We&apos;re happy to help.
          </p>
          <a
            href="mailto:support@clowk.in"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#F43F5E] hover:text-[#D1354F] transition-colors"
          >
            Talk to support — support@clowk.in
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
