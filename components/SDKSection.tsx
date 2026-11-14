"use client";

import { useState } from "react";
import { SiNpm, SiYarn, SiPnpm, SiBun } from "react-icons/si";
import { t, type Locale } from "@/lib/i18n";

const managers = [
  { id: "npm", label: "npm", icon: SiNpm, color: "#CB3837", cmd: "npm install" },
  { id: "yarn", label: "yarn", icon: SiYarn, color: "#2C8EBB", cmd: "yarn add" },
  { id: "pnpm", label: "pnpm", icon: SiPnpm, color: "#F69220", cmd: "pnpm add" },
  { id: "bun", label: "bun", icon: SiBun, color: "#FBF0DF", cmd: "bun add" },
];


export default function SDKSection({ locale = "en" }: { locale?: Locale }) {
  const text = t(locale).sdk;
  const packages = Object.entries(text.packages).map(([name, description]) => ({ name, description }));
  const [manager, setManager] = useState("npm");

  const currentCmd = managers.find((m) => m.id === manager)!.cmd;

  return (
    <section aria-labelledby="sdk-title" className="py-14 md:py-20 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#F43F5E] tracking-widest uppercase mb-3">
            SDKs
          </p>
          <h2 id="sdk-title" className="text-[clamp(28px,3.4vw,40px)] tracking-tight font-bold text-white leading-tight mb-4">
            {text.title}
          </h2>
          <p className="text-[#A9A1B6] text-[17px] max-w-2xl">
            {text.leadBefore} <code className="text-white font-mono text-sm bg-white/5 px-1.5 py-0.5 rounded">@clowk/core</code>{" "}
            {text.leadAfter}
          </p>
        </div>

        {/* Package manager selector */}
        <div className="flex mb-8">
          <div className="inline-flex gap-1 p-1 rounded-lg bg-white/5 border border-white/[0.09]">
            {managers.map((m) => {
              const Icon = m.icon;

              return (
                <button
                  key={m.id}
                  onClick={() => setManager(m.id)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    manager === m.id
                      ? "bg-white/10 text-white"
                      : "text-[#A9A1B6] hover:text-white"
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
        <div className="flex mb-10">
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
              className="group p-6 rounded-[18px] bg-[#140D1C] border border-white/[0.09] hover:border-white/25 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#F43F5E]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </span>
                <h3 className="font-mono text-sm font-semibold text-white">
                  {pkg.name}
                </h3>
              </div>
              <p className="text-sm text-[#A9A1B6] leading-relaxed mb-4">
                {pkg.description}
              </p>
              <code className="block text-xs text-[#A9A1B6] font-mono bg-white/5 px-3 py-2 rounded-lg">
                {currentCmd} {pkg.name}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
