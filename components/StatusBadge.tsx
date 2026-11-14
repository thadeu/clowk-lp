export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-[#E8930C]/50 text-[11px] font-semibold text-[#F2C06C]">
      {status}
    </span>
  );
}
