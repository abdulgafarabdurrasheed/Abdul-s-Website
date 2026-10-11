import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="flex flex-col justify-center min-h-[75vh]">
      <div className="max-w-3xl">
        <p className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-4 font-semibold">Welcome</p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight text-white">
          Abdulgafar<br />Abdurrasheed
        </h1>

        <p className="text-lg md:text-xl text-neutral-300 mb-10 leading-relaxed max-w-2xl">
          Computer Science student at the University of Ibadan & Full-Stack Developer.
          I build elegant solutions to real-world problems.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/projects"
            className="px-7 py-3 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-neutral-200 transition-colors"
          >
            View My Work
          </Link>
          <Link
            to="/contact"
            className="px-7 py-3 border border-neutral-500 text-neutral-200 font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
