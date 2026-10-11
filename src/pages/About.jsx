export default function About() {
  return (
    <div className="w-full text-neutral-200">
      <div className="mb-10 pb-4 border-b border-neutral-700">
        <h1 className="text-3xl md:text-4xl font-bold text-white">About Me</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-5 text-base md:text-lg text-neutral-300 leading-relaxed">
          <p>
            I'm a Computer Science student at the University of Ibadan, Nigeria.
            I specialize in Full-Stack Web Development, bridging the gap between
            clean user interfaces and robust backend systems.
          </p>
          <p>
            I'm deeply involved with <strong className="text-white">Hack Club</strong>, contributing
            to Scrapbook, the Photos repo, and building the Nigeria Hack Club
            Directory from scratch using Next.js, Drizzle ORM, and PostgreSQL.
          </p>
          <p>
            I also recently picked up some interest in E-Waste recycling, 
            turning Old/Legacy android devices into surprisingly capable 
            servers by rooting and sometimes flashing custom linux distros
            like PostmarketOS.
          </p>
          <p>
            Whether I'm writing Rust for satellite mission control or shipping
            React interfaces, my focus is always on clean, scalable,
            impactful code.
          </p>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-neutral-900/80 border border-neutral-700 p-5">
            <img
              src="https://avatars.githubusercontent.com/u/144062193?v=4"
              alt="Abdulgafar Abdurrasheed"
              className="w-full aspect-square object-cover mb-5 grayscale hover:grayscale-0 transition-all duration-500"
            />

            <div className="space-y-4 text-sm">
              <div className="border-l-2 border-neutral-500 pl-3">
                <p className="text-neutral-500 uppercase tracking-wider text-xs font-bold">Location</p>
                <p className="text-white">Ibadan, Oyo, Nigeria 🇳🇬</p>
              </div>
              <div className="border-l-2 border-neutral-500 pl-3">
                <p className="text-neutral-500 uppercase tracking-wider text-xs font-bold">Education</p>
                <p className="text-white">University of Ibadan</p>
              </div>
              <div className="border-l-2 border-neutral-500 pl-3">
                <p className="text-neutral-500 uppercase tracking-wider text-xs font-bold">GitHub</p>
                <a
                  href="https://github.com/abdulgafarabdurrasheed"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-neutral-400 transition-colors"
                >
                  @abdulgafarabdurrasheed
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
