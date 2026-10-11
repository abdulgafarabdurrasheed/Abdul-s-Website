export default function Contact() {
  return (
    <div className="w-full text-neutral-200">
      <div className="mb-10 pb-4 border-b border-neutral-700">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Get In Touch</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <p className="text-base md:text-lg text-neutral-300 leading-relaxed">
            I'm always open to new projects, creative ideas, and collaboration.
            Whether it's a Hack Club initiative, a full-stack gig, or open-source work — let's talk.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4 p-4 border border-neutral-800 hover:border-neutral-600 transition-colors">
              <span className="text-xl fa-solid fa-location-dot"></span>
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-bold">Location</p>
                <p className="text-white text-sm">Ibadan, Oyo, Nigeria</p>
              </div>
            </div>

            <a
              href="https://github.com/abdulgafarabdurrasheed"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 border border-neutral-800 hover:border-neutral-600 transition-colors group"
            >
              <span className="text-xl fa-brands fa-github"></span>
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-bold">GitHub</p>
                <p className="text-white text-sm group-hover:text-neutral-300">@abdulgafarabdurrasheed</p>
              </div>
            </a>

            <a
              target=""
              rel="noreferrer"
              className="flex items-center gap-4 p-4 border border-neutral-800 hover:border-neutral-600 transition-colors group"
            >
              <span className="text-xl fa-regular fa-folder-open"></span>
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-bold">Portfolio</p>
                <p className="text-white text-sm group-hover:text-neutral-300"></p>
              </div>
            </a>
          </div>
        </div>

        <form
          className="bg-neutral-900/60 border border-neutral-700 p-6 md:p-8 space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <h3 className="text-lg font-bold text-white mb-2">Send a Message</h3>

          <div>
            <label className="block text-xs text-neutral-500 uppercase tracking-wider font-bold mb-2">Name</label>
            <input
              type="text"
              className="w-full bg-neutral-950 border border-neutral-700 px-4 py-3 text-white text-sm focus:outline-none focus:border-neutral-400 transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-500 uppercase tracking-wider font-bold mb-2">Email</label>
            <input
              type="email"
              className="w-full bg-neutral-950 border border-neutral-700 px-4 py-3 text-white text-sm focus:outline-none focus:border-neutral-400 transition-colors"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-500 uppercase tracking-wider font-bold mb-2">Message</label>
            <textarea
              rows="4"
              className="w-full bg-neutral-950 border border-neutral-700 px-4 py-3 text-white text-sm focus:outline-none focus:border-neutral-400 transition-colors resize-none"
              placeholder="How can we work together?"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-3 px-4 text-sm uppercase tracking-wider hover:bg-neutral-200 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
