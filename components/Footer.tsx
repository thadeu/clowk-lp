import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0C0014] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/clowk-white.svg"
                alt="Clowk"
                width={24}
                height={32}
                className="object-contain"
              />
              <span className="text-white text-lg font-bold tracking-tight">Clowk</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Authentication broker for every stack. No embedded UI, no
              per-MAU billing — your app controls the experience.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://github.com/clowk"
                className="text-white/30 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
              Product
            </p>
            <ul className="space-y-3">
              {[
                { label: "Docs", href: "https://docs.clowk.in" },
                { label: "Changelog", href: "#" },
                { label: "Status", href: "#" },
                { label: "Roadmap", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
              Resources
            </p>
            <ul className="space-y-3">
              {[
                { label: "Blog", href: "#" },
                { label: "Support", href: "mailto:support@clowk.in" },
                { label: "Pricing", href: "#" },
                { label: "Terms", href: "/terms" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Clowk. All rights reserved.
          </p>
          <p className="text-white/25 text-xs">
            Free forever. PRO plan available.
          </p>
        </div>
      </div>
    </footer>
  );
}
