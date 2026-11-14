import Code from '@/components/Code';

export default function InstallLine({ command }: { command: string }) {
  return (
    <div tabIndex={0} className="flex gap-2 rounded-xl bg-[#0A0610] border border-white/[0.08] px-3.5 py-3 font-mono text-[13px]">
      <span className="text-[#FB7185] select-none">$</span>
      <Code code={command} lang="bash" wrap className="min-w-0 flex-1 break-all" />
    </div>
  );
}
