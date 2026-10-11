export default function Blog() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center w-full text-white">
      <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">The Blog</h1>
      <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-12 font-light leading-relaxed">
        I am currently moving my articles and technical deep-dives to this new platform. Stay tuned!
      </p>
      <a 
        href="https://www.reddit.com/user/Wide_Peach4055/submitted/" 
        target="_blank" 
        rel="noreferrer"
        className="px-8 py-4 bg-slate-800 hover:bg-blue-600 border border-slate-600 hover:border-blue-500 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] text-lg"
      >
        See my Reddit Posts
      </a>
    </div>
  );
}
