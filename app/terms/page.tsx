import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Clowk",
  description: "Clowk terms of service, acceptable use policy, and legal information.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#0C0014] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Link href="/" className="text-white/40 text-sm hover:text-white/70 transition-colors mb-6 inline-block">
            ← Back to home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-white/50 text-base">
            Last updated: March 22, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose prose-zinc max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#18181B] [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#18181B] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#71717A] [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-[#71717A] [&_ul]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_strong]:text-[#18181B]">

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using Clowk (&quot;the Service&quot;), operated by Clowk (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Clowk is an authentication broker that handles OAuth authentication flows between your application and identity providers (Google, GitHub, Twitter). Clowk is not an authentication UI provider — it brokers the authentication through a redirect flow and returns a signed JWT to your application.
          </p>

          <h2>3. Accounts</h2>
          <p>
            To use the Service, you must create an account at <strong>app.clowk.in</strong>. You are responsible for:
          </p>
          <ul>
            <li>Maintaining the security of your account credentials</li>
            <li>All activity that occurs under your account</li>
            <li>Keeping your publishable and secret keys secure</li>
            <li>Notifying us immediately at <strong>support@clowk.in</strong> if you suspect unauthorized access</li>
          </ul>

          <h2>4. Plans and Pricing</h2>
          <p>
            Clowk offers a <strong>Free plan</strong> and a <strong>PRO plan</strong>. The Free plan is available at no cost and includes core authentication features. There is no per-MAU (monthly active user) billing on any plan.
          </p>
          <p>
            We reserve the right to modify pricing for the PRO plan with 30 days&apos; notice. The Free plan will remain free.
          </p>

          <h2>5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to the Service or its infrastructure</li>
            <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
            <li>Transmit any malware, viruses, or harmful code through the Service</li>
            <li>Use the Service to store or transmit content that infringes intellectual property rights</li>
            <li>Exceed reasonable usage limits or abuse API endpoints</li>
          </ul>

          <h2>6. Data and Privacy</h2>
          <p>
            Clowk processes authentication data (email addresses, OAuth tokens, user profiles) on behalf of your application. We act as a data processor. You remain the data controller for your end users.
          </p>
          <ul>
            <li>OAuth tokens are used transiently during the authentication flow and are not stored long-term</li>
            <li>JWT tokens are signed and returned to your application — your app verifies them independently</li>
            <li>We do not sell, share, or monetize your users&apos; data</li>
            <li>You are responsible for your own privacy policy with your end users</li>
          </ul>

          <h2>7. SDKs and Client Libraries</h2>
          <p>
            Clowk provides official SDKs (<code>@clowk/core</code>, <code>@clowk/react</code>, <code>@clowk/nextjs</code>, <code>@clowk/express</code>, <code>@clowk/hono</code>, <code>@clowk/sdk</code>) under the MIT License. Use of these SDKs is subject to their respective license terms.
          </p>

          <h2>8. Service Availability</h2>
          <p>
            We aim to provide high availability but do not guarantee 100% uptime. We are not liable for any downtime, data loss, or service interruptions. We will make reasonable efforts to notify users of planned maintenance.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Clowk shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service, including but not limited to loss of profits, data, or business opportunities.
          </p>

          <h2>10. Termination</h2>
          <p>
            We may suspend or terminate your account if you violate these Terms. You may delete your account at any time. Upon termination, your data will be deleted within 30 days.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. We will notify users of material changes via email or through the Service. Continued use after changes constitutes acceptance of the updated Terms.
          </p>

          <h2>12. Contact</h2>
          <p>
            For questions about these Terms, contact us at{" "}
            <a href="mailto:support@clowk.in" className="text-[#F43F5E] hover:underline font-medium">
              support@clowk.in
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}
