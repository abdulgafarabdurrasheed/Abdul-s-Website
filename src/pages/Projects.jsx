const projects = [
  {
    name: "Nigeria Hack Club Directory",
    description: "Full-stack platform mapping hacker communities across Nigeria. Geospatial search, OAuth, and magic-link auth.",
    tech: ["Next.js 15", "TypeScript", "Drizzle", "PostgreSQL", "Tailwind"],
    link: "https://github.com/abdulgafarabdurrasheed/nigeria-hackclub-site",
  },
  {
    name: "Vanguard-SSA",
    description: "Satellite mission control in Rust. Decodes live telemetry, propagates orbits with physics, and runs collision avoidance.",
    tech: ["Rust", "Physics Sim", "Telemetry"],
    link: "https://github.com/abdulgafarabdurrasheed/Vanguard-SSA",
  },
  {
    name: "Scrapbook & Photos",
    description: "Open-source contributions to Hack Club's daily streak system and photo platform. Fixed bulk actions and upload bugs.",
    tech: ["TypeScript", "Next.js", "React"],
    link: "https://github.com/abdulgafarabdurrasheed/scrapbook",
  },
  {
    name: "Fix-Hack-Club",
    description: "YSWS program for PullQuests. Participants submit PRs to improve or fix any part of Hack Club.",
    tech: ["HTML", "Open Source"],
    link: "https://github.com/abdulgafarabdurrasheed/Fix-Hack-Club",
  },
  {
    name: "Flavortown Ledger",
    description: "Financial tracking and ledger system built during a Hack Club sprint.",
    tech: ["JavaScript", "Web"],
    link: "https://github.com/abdulgafarabdurrasheed/flavortown-ledger",
  },
];

export default function Projects() {
  return (
    <div className="w-full text-neutral-200">
      <div className="mb-10 pb-4 border-b border-neutral-700">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Selected Projects</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map((project, idx) => (
          <a
            key={idx}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="bg-neutral-900/60 border border-neutral-700 p-6 flex flex-col hover:border-neutral-400 transition-colors group"
          >
            <h3 className="text-lg font-bold text-white mb-3 group-hover:text-neutral-300 transition-colors">
              {project.name}
            </h3>

            <p className="text-sm text-neutral-400 mb-6 flex-1 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-700"
                >
                  {t}
                </span>
              ))}
            </div>

            <span className="text-xs uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors font-bold">
              View Repo →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
