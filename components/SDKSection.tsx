"use client";

import { useState } from "react";
import { SiNpm, SiYarn, SiPnpm, SiBun } from "react-icons/si";

const managers = [
  { id: "npm", label: "npm", icon: SiNpm, color: "#CB3837", cmd: "npm install" },
  { id: "yarn", label: "yarn", icon: SiYarn, color: "#2C8EBB", cmd: "yarn add" },
  { id: "pnpm", label: "pnpm", icon: SiPnpm, color: "#F69220", cmd: "pnpm add" },
  { id: "bun", label: "bun", icon: SiBun, color: "#FBF0DF", cmd: "bun add" },
];

const packages = [
  {
    name: "@clowk/core",
    description:
      "Runtime-agnostic foundation. JWT verification, HTTP client, SDK resources. Works on Node.js, Bun, Deno, and Cloudflare Workers.",
  },
  {
    name: "@clowk/sdk",
    description:
      "User-facing convenience package. Re-exports everything from @clowk/core under a clean import path.",
  },
  {
    name: "@clowk/react",
    description:
      "ClowkProvider, SignInButton, SignUpButton, SignOutButton, useAuth hook. Redirect-based — no embedded UI.",
  },
  {
    name: "@clowk/nextjs",
    description:
      "Server-side middleware for route protection, auth() helper for Server Components, plus React components re-exported.",
  },
  {
    name: "@clowk/express",
    description:
      "Express middleware. Extracts and verifies JWT from query param, cookie, or Authorization header.",
  },
  {
    name: "@clowk/hono",
    description:
      "Hono middleware. Same behavior as Express, adapted for Hono's API. Works on Workers, Bun, Deno, and Node.js.",
  },
];

export default function SDKSection() {
  const [manager, setManager] = useState("npm");

  const currentCmd = managers.find((m) => m.id === manager)!.cmd;

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#F43F5E] tracking-widest uppercase mb-3">
            SDKs
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#18181B] leading-tight mb-4">
            One broker, every runtime
          </h2>
          <p className="text-[#71717A] text-lg max-w-2xl mx-auto">
            All packages depend on <code className="text-[#18181B] font-mono text-sm bg-[#F4F4F5] px-1.5 py-0.5 rounded">@clowk/core</code> for
            token verification. Framework packages are thin wrappers that adapt
            core to each framework&apos;s conventions.
          </p>
        </div>

        {/* Package manager selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex gap-1 p-1 rounded-lg bg-[#F4F4F5] border border-[#E4E4E7]">
            {managers.map((m) => {
              const Icon = m.icon;

              return (
                <button
                  key={m.id}
                  onClick={() => setManager(m.id)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    manager === m.id
                      ? "bg-white text-[#18181B] shadow-sm"
                      : "text-[#71717A] hover:text-[#18181B]"
                  }`}
                  title={m.label}
                >
                  <Icon className="w-4 h-4 shrink-0" style={{ color: m.color }} />
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Architecture diagram */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex flex-col gap-4 px-10 py-8 rounded-2xl bg-[#0C0014] border border-white/10 font-mono text-sm">
            <div className="flex items-center gap-3 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E] shadow-sm shadow-[#F43F5E]/50" />
              <span className="text-[#F43F5E] font-bold text-base">@clowk/core</span>
            </div>
            {[
              "@clowk/sdk",
              "@clowk/react",
              "@clowk/express",
              "@clowk/hono",
              "@clowk/nextjs",
            ].map((pkg, i, arr) => (
              <div key={pkg} className="flex items-center gap-3 pl-1">
                <span className="text-white/30">{i === arr.length - 1 ? "└──" : "├──"}</span>
                <span className="text-white/70">{pkg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Package grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="group p-6 rounded-2xl border border-[#E4E4E7] hover:border-[#FBCCD3] hover:shadow-lg hover:shadow-[#F43F5E]/5 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#F43F5E]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </span>
                <h3 className="font-mono text-sm font-semibold text-[#18181B]">
                  {pkg.name}
                </h3>
              </div>
              <p className="text-sm text-[#71717A] leading-relaxed mb-4">
                {pkg.description}
              </p>
              <code className="block text-xs text-[#71717A] font-mono bg-[#F4F4F5] px-3 py-2 rounded-lg">
                {currentCmd} {pkg.name}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
