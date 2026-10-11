const skillCategories = [
  {
    title: "Frontend",
    skills: ["React 19", "Next.js", "Tailwind CSS", "HTML5 & CSS3", "JavaScript & TypeScript", "Vite"],
  },
  {
    title: "Backend & Database",
    skills: ["Node.js", "PostgreSQL", "Drizzle ORM", "NextAuth.js", "REST APIs"],
  },
  {
    title: "Systems & Languages",
    skills: ["Rust", "JavaScript (ES6+)", "TypeScript", "Python", "SQL"],
  },
  {
    title: "Tools & Ecosystem",
    skills: ["Git & GitHub", "Vercel", "Supabase / Neon", "ESLint", "Open Source"],
  },
];

export default function Skills() {
  return (
    <div className="w-full text-neutral-200">
      <div className="mb-10 pb-4 border-b border-neutral-700">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Technical Skills</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {skillCategories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-neutral-900/60 border border-neutral-700 p-6"
          >
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-5">
              {cat.title}
            </h2>

            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-2 bg-neutral-800 text-neutral-200 text-sm font-medium border border-neutral-700 hover:bg-white hover:text-black transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
