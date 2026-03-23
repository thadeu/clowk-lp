const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    title: "No embedded UI",
    description:
      "Clowk handles the entire auth flow on its own domain. Your app just redirects and receives a JWT back — no forms, no iframes in your DOM.",
    accent: "from-[#FEF2F4] to-[#FDE6E9]",
    iconColor: "text-[#F43F5E]",
    iconBg: "bg-[#FEF2F4]",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Every stack",
    description:
      "SDKs for React, Next.js, Express, Hono, and Rails. The @clowk/core package is runtime-agnostic — Node.js, Bun, Deno, Workers.",
    accent: "from-[#FEF7EC] to-[#FCEFD9]",
    iconColor: "text-[#E8930C]",
    iconBg: "bg-[#FEF7EC]",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: "Multi-provider",
    description:
      "Google, GitHub, and Twitter OAuth out of the box, plus email/password. Add providers without touching your app code.",
    accent: "from-[#FEF2F4] to-[#FDE6E9]",
    iconColor: "text-[#F43F5E]",
    iconBg: "bg-[#FEF2F4]",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    title: "Security by isolation",
    description:
      "Credentials and OAuth tokens never touch your app's DOM. The auth flow happens entirely on the Clowk domain, returned as a signed JWT.",
    accent: "from-[#FEF7EC] to-[#FCEFD9]",
    iconColor: "text-[#E8930C]",
    iconBg: "bg-[#FEF7EC]",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Multi-tenant",
    description:
      "One Clowk instance, unlimited apps. Each app gets its own keys, OAuth callbacks, and user namespace.",
    accent: "from-[#FEF2F4] to-[#FDE6E9]",
    iconColor: "text-[#F43F5E]",
    iconBg: "bg-[#FEF2F4]",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    ),
    title: "Free forever",
    description:
      "Free plan with everything you need to ship. PRO plan available for teams that need more. No per-MAU billing, ever.",
    accent: "from-[#FEF7EC] to-[#FCEFD9]",
    iconColor: "text-[#E8930C]",
    iconBg: "bg-[#FEF7EC]",
  },
];

export default function Features() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#F43F5E] tracking-widest uppercase mb-3">
            Why Clowk
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#18181B] leading-tight mb-4">
            Everything auth needs. Nothing extra.
          </h2>
          <p className="text-[#71717A] text-lg max-w-2xl mx-auto">
            Clowk brokers authentication between your app and OAuth providers.
            Your app controls its own buttons and pages — Clowk handles the rest.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-[#E4E4E7] hover:border-[#FBCCD3] hover:shadow-lg hover:shadow-[#F43F5E]/5 transition-all duration-300"
            >
              <div className={`w-11 h-11 rounded-xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-[#18181B] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#71717A] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
