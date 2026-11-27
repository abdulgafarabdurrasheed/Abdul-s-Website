import { Link, useParams } from 'react-router-dom';

const postModules = import.meta.glob('/blogs/*.jsx', { eager: true });

const posts = Object.values(postModules)
  .map((module) => ({
    metadata: module.metadata,
    Component: module.default,
  }))
  .filter((post) => post.metadata?.slug && post.Component)
  .sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));

function formatDate(date) {
  if (!date) return '';

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${date}T12:00:00`));
}

function BlogCard({ post }) {
  const { metadata } = post;

  return (
    <Link
      to={`/blog/${metadata.slug}`}
      className="group flex min-h-[320px] flex-col overflow-hidden border border-neutral-700 bg-neutral-900/70 transition-colors hover:border-neutral-400"
    >
      {metadata.coverImage ? (
        <img
          src={metadata.coverImage}
          alt=""
          className="h-44 w-full border-b border-neutral-700 object-cover grayscale transition duration-300 group-hover:grayscale-0"
          loading="lazy"
        />
      ) : (
        <div className="flex h-44 items-end border-b border-neutral-700 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black p-5">
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-neutral-500">Field Notes</span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">
          <span>{formatDate(metadata.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{metadata.readTime} min read</span>
        </div>
        <h2 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-neutral-300">
          {metadata.title}
        </h2>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-400">{metadata.excerpt}</p>
        <div className="mb-5 flex flex-wrap gap-2">
          {(metadata.tags || []).map((tag) => (
            <span key={tag} className="border border-neutral-700 bg-neutral-800 px-2 py-1 text-xs font-semibold text-neutral-300">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 transition-colors group-hover:text-white">
          Read article <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

function ArticlePage({ post }) {
  const { Component } = post;

  return (
    <div className="mx-auto w-full max-w-4xl text-neutral-200">
      <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-neutral-400 transition-colors hover:text-white">
        <span aria-hidden="true">←</span> All articles
      </Link>
      <Component />
      <div className="mt-12 border-t border-neutral-800 pt-6">
        <Link to="/blog" className="text-sm font-bold uppercase tracking-[0.16em] text-neutral-400 transition-colors hover:text-white">
          ← Back to the blog
        </Link>
      </div>
    </div>
  );
}

export default function Blog() {
  const { slug } = useParams();

  if (slug) {
    const post = posts.find((item) => item.metadata.slug === slug);

    if (post) return <ArticlePage post={post} />;

    return (
      <div className="mx-auto flex min-h-[55vh] max-w-3xl flex-col items-start justify-center text-neutral-200">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">404 · Article not found</p>
        <h1 className="mb-6 text-3xl font-bold text-white">That post isn’t here.</h1>
        <Link to="/blog" className="border border-neutral-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-neutral-800">
          Browse all articles
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full text-neutral-200">
      <header className="mb-8 border-b border-neutral-700 pb-7">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-neutral-500">Ideas, notes &amp; deep dives</p>
          <h1 className="text-3xl font-bold text-white md:text-4xl">The Blog</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">
            Writing about the things I’m building, learning, and figuring out along the way.
          </p>
        </div>
      </header>

      {posts.length ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => <BlogCard key={post.metadata.slug} post={post} />)}
        </div>
      ) : (
        <div className="border border-dashed border-neutral-700 bg-black/20 px-6 py-16 text-center">
          <p className="mb-2 text-lg font-bold text-white">No articles published yet.</p>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-400">
            New writing will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
