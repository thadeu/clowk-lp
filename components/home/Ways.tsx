const ways = [
  { title: 'Your servers', text: 'Run each product on a box you control. Install with one command.' },
  { title: 'Small on purpose', text: 'One binary or one app, configured in one file. No cluster to babysit.' },
  { title: 'Docs for people and agents', text: 'Short pages in plain words, written for developers and for AI agents.' },
];

export default function Ways() {
  return (
    <section aria-labelledby="ways-title" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20 flex flex-col gap-6 md:gap-7">
      <h2 id="ways-title" className="text-[clamp(28px,3.4vw,40px)] tracking-tight font-bold text-white">
        One way of working
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4">
        {ways.map(way => (
          <div key={way.title} className="p-6 rounded-[20px] border border-white/[0.09] flex flex-col gap-2.5">
            <h3 className="text-[19px] font-bold text-white">{way.title}</h3>
            <p className="text-[15px] leading-relaxed text-[#C9C3D4]">{way.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
