import type { ReactNode } from 'react';
import InstallLine from '@/components/InstallLine';

type Props = { title: string; lead?: string; install?: string; children: ReactNode };

/** The closing block of a page: one line, and the actions passed as children. */
export default function FinalCta({ title, lead, install, children }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-14 md:pt-8 md:pb-20">
      <div className="rounded-[24px] bg-[#140D1C] border border-white/[0.09] px-6 py-10 md:px-12 md:py-14 flex flex-col items-start gap-4">
        <h2 className="max-w-[720px] text-[clamp(26px,3.2vw,38px)] leading-tight tracking-tight font-bold text-white">{title}</h2>

        {lead && <p className="max-w-[620px] text-[17px] leading-relaxed text-[#C9C3D4]">{lead}</p>}

        {install && (
          <div className="w-full max-w-[620px]">
            <InstallLine command={install} />
          </div>
        )}

        <div className="mt-2 flex flex-wrap gap-3">{children}</div>
      </div>
    </section>
  );
}
