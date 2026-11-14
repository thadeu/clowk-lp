export default function InstallLine({ command }: { command: string }) {
  return (
    <div className="rounded-xl bg-[#0A0610] border border-white/[0.08] px-3.5 py-3 font-mono text-[13px] text-[#E4DFEA] overflow-x-auto whitespace-nowrap">
      <span className="text-[#FB7185]">$ </span>
      {command}
    </div>
  );
}
