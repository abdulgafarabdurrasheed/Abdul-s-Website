import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogMarkdown from '../components/BlogMarkdown';

const BLOG_ADMIN_PASSWORD = '1G2a3f4a5r!';
const AUTH_STORAGE_KEY = 'my-site-blog-admin-unlocked';
const existingBlogFiles = Object.keys(import.meta.glob('/blogs/*.jsx'));

function todayAsDateInput() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function makeSlug(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function estimateReadTime(body) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(date) {
  if (!date) return 'Your publish date';
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${date}T12:00:00`));
}

function nextFileName() {
  const used = new Set(existingBlogFiles.map((path) => path.split('/').pop()));
  let number = 1;
  while (used.has(`blog${number}.jsx`)) number += 1;
  return `blog${number}.jsx`;
}

function createPostFile(metadata, content) {
  return `import BlogMarkdown from "../src/components/BlogMarkdown.jsx";

export const metadata = ${JSON.stringify(metadata, null, 2)};

const content = ${JSON.stringify(content, null, 2)};

export default function BlogPost() {
  const publishedDate = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(\`${'${metadata.date}'}T12:00:00\`));

  return (
    <article className="mx-auto max-w-3xl pb-8">
      {metadata.coverImage ? (
        <img
          src={metadata.coverImage}
          alt=""
          className="mb-10 max-h-[460px] w-full border border-neutral-800 object-cover"
        />
      ) : null}
      <header className="mb-9 border-b border-neutral-800 pb-8">
        <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
          <time dateTime={metadata.date}>{publishedDate}</time>
          <span aria-hidden="true">·</span>
          <span>{metadata.readTime} min read</span>
        </div>
        <h1 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl">{metadata.title}</h1>
        <p className="max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">{metadata.excerpt}</p>
        {metadata.tags.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {metadata.tags.map((tag) => (
              <span key={tag} className="border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-xs font-semibold text-neutral-300">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </header>
      <BlogMarkdown content={content} />
    </article>
  );
}
`;
}

const inputClass = 'mt-2 w-full border border-neutral-700 bg-black/40 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-neutral-400';
const labelClass = 'block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400';

function AdminAccessGate({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (password === BLOG_ADMIN_PASSWORD) {
      window.sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      onUnlock();
      return;
    }

    setError('That password doesn’t match. Try again.');
    setPassword('');
  }

  return (
    <div className="mx-auto flex min-h-[65vh] w-full max-w-md flex-col justify-center text-neutral-200">
      <Link to="/blog" className="mb-8 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 transition-colors hover:text-white">
        <span aria-hidden="true">←</span> Back to blog
      </Link>
      <div className="border border-neutral-700 bg-neutral-950/80 p-6 md:p-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">Admin access</p>
        <h1 className="mb-3 text-2xl font-bold text-white">Blog admin</h1>
        <p className="mb-6 text-sm leading-relaxed text-neutral-400">Enter your password to open the writing desk.</p>
        <form onSubmit={handleSubmit}>
          <label className={labelClass}>
            Password
            <input
              autoFocus
              autoComplete="current-password"
              required
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError('');
              }}
              className={inputClass}
              placeholder="Enter password"
            />
          </label>
          {error ? <p role="alert" className="mt-3 text-sm text-red-300">{error}</p> : null}
          <button type="submit" className="mt-5 w-full bg-white px-5 py-3.5 text-sm font-bold text-black transition-colors hover:bg-neutral-300">
            Unlock editor <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default function BlogAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => window.sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [date, setDate] = useState(todayAsDateInput);
  const [tagsText, setTagsText] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [downloadedName, setDownloadedName] = useState('');

  useEffect(() => {
    if (!slugEdited) setSlug(makeSlug(title));
  }, [title, slugEdited]);

  const tags = useMemo(() => [...new Set(tagsText.split(',').map((tag) => tag.trim()).filter(Boolean))], [tagsText]);
  const readTime = estimateReadTime(content);
  const metadata = { title: title.trim() || 'Your article title', slug, excerpt: excerpt.trim(), date, readTime, tags, coverImage: coverImage.trim() };

  function lockEditor() {
    window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const existingSlugs = Object.values(import.meta.glob('/blogs/*.jsx', { eager: true }))
      .map((module) => module.metadata?.slug)
      .filter(Boolean);

    if (existingSlugs.includes(slug)) {
      window.alert('That URL slug is already in use. Choose another one before downloading.');
      return;
    }

    const fileName = nextFileName();
    const file = new Blob([createPostFile(metadata, content.trim())], { type: 'text/javascript;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    setDownloadedName(fileName);
  }

  if (!isAuthenticated) {
    return <AdminAccessGate onUnlock={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="w-full text-neutral-200">
      <header className="mb-8 border-b border-neutral-700 pb-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 transition-colors hover:text-white">
            <span aria-hidden="true">←</span> Back to blog
          </Link>
          <button type="button" onClick={lockEditor} className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 transition-colors hover:text-white">
            Lock editor
          </button>
        </div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-neutral-500">Publishing desk</p>
        <h1 className="text-3xl font-bold text-white md:text-4xl">Write an article</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">
          Fill in the details and write in Markdown. Download the finished post component, add it to <code className="text-neutral-200">/blogs</code>, then commit and push.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <form onSubmit={handleSubmit} className="border border-neutral-700 bg-neutral-950/60 p-5 md:p-7">
          <div className="mb-7 flex items-center justify-between border-b border-neutral-800 pb-4">
            <div>
              <h2 className="font-bold text-white">Post details</h2>
              <p className="mt-1 text-xs text-neutral-500">All fields marked with * are required.</p>
            </div>
            <span className="border border-neutral-800 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500">Draft</span>
          </div>

          <div className="space-y-5">
            <label className={labelClass}>
              Article title *
              <input required maxLength={120} value={title} onChange={(event) => setTitle(event.target.value)} className={inputClass} placeholder="A title people will remember" />
            </label>

            <label className={labelClass}>
              URL slug *
              <div className="mt-2 flex items-center border border-neutral-700 bg-black/40 focus-within:border-neutral-400">
                <span className="shrink-0 pl-3.5 text-sm text-neutral-600">/blog/</span>
                <input
                  required
                  pattern="[a-z0-9]+(-[a-z0-9]+)*"
                  title="Use lowercase letters, numbers, and single hyphens."
                  value={slug}
                  onChange={(event) => {
                    setSlugEdited(true);
                    setSlug(makeSlug(event.target.value));
                  }}
                  className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm text-white outline-none placeholder:text-neutral-600"
                  placeholder="your-article-url"
                />
              </div>
            </label>

            <label className={labelClass}>
              Short description *
              <textarea required maxLength={240} rows={3} value={excerpt} onChange={(event) => setExcerpt(event.target.value)} className={`${inputClass} resize-y`} placeholder="A couple of sentences for the article card and page intro." />
              <span className="mt-1 block text-right text-[11px] font-normal tracking-normal text-neutral-600">{excerpt.length}/240</span>
            </label>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                Publish date *
                <input required type="date" value={date} onChange={(event) => setDate(event.target.value)} className={inputClass} />
              </label>
              <div className="border border-neutral-800 bg-black/20 px-3.5 py-3">
                <p className={labelClass}>Estimated reading time</p>
                <p className="mt-2 text-sm font-semibold text-white">{readTime} minute{readTime === 1 ? '' : 's'}</p>
                <p className="mt-1 text-xs font-normal tracking-normal text-neutral-600">Calculated from your article text</p>
              </div>
            </div>

            <label className={labelClass}>
              Tags <span className="font-normal tracking-normal text-neutral-600">(comma separated)</span>
              <input maxLength={180} value={tagsText} onChange={(event) => setTagsText(event.target.value)} className={inputClass} placeholder="React, Notes, Building" />
            </label>

            <label className={labelClass}>
              Cover image URL <span className="font-normal tracking-normal text-neutral-600">(optional)</span>
              <input type="url" value={coverImage} onChange={(event) => setCoverImage(event.target.value)} className={inputClass} placeholder="https://example.com/cover.jpg" />
            </label>

            <label className={labelClass}>
              Article body * <span className="font-normal tracking-normal text-neutral-600">(Markdown)</span>
              <textarea
                required
                minLength={20}
                rows={18}
                value={content}
                onChange={(event) => {
                  setContent(event.target.value);
                  setDownloadedName('');
                }}
                className={`${inputClass} resize-y font-mono text-[13px] leading-6`}
                placeholder={'Start writing here…\n\nUse ## for section headings, **bold**, *italic*, [links](https://example.com), > for quotes, - for lists, and triple backticks for code blocks.'}
              />
              <span className="mt-2 block text-xs font-normal leading-relaxed tracking-normal text-neutral-600">
                Supports headings, paragraphs, bold, italic, links, quotes, lists, inline code, and fenced code blocks.
              </span>
            </label>
          </div>

          <div className="mt-7 border-t border-neutral-800 pt-5">
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 bg-white px-5 py-3.5 text-sm font-bold text-black transition-colors hover:bg-neutral-300 sm:w-auto">
              Generate &amp; download .jsx <span aria-hidden="true">↓</span>
            </button>
            {downloadedName ? (
              <div role="status" className="mt-4 border border-emerald-900/70 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-200">
                <strong>{downloadedName}</strong> downloaded. Move it into <code>/blogs</code>, then commit and push to publish.
              </div>
            ) : null}
          </div>
        </form>

        <aside className="space-y-5 xl:sticky xl:top-5">
          <section className="overflow-hidden border border-neutral-700 bg-neutral-950/70">
            <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">Live preview</p>
                <h2 className="mt-1 text-sm font-bold text-white">Article card</h2>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-600">/blog/{slug || 'your-slug'}</span>
            </div>
            {coverImage ? (
              <img src={coverImage} alt="" className="h-40 w-full border-b border-neutral-800 object-cover" />
            ) : (
              <div className="flex h-40 items-end border-b border-neutral-800 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black p-5">
                <span className="text-xs font-bold uppercase tracking-[0.28em] text-neutral-500">Field Notes</span>
              </div>
            )}
            <div className="p-5">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                <span>{formatDate(date)}</span><span aria-hidden="true">·</span><span>{readTime} min read</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">{title || 'Your article title'}</h3>
              <p className="mb-5 text-sm leading-relaxed text-neutral-400">{excerpt || 'Your short description will appear here on the blog grid.'}</p>
              <div className="flex flex-wrap gap-2">
                {tags.length ? tags.map((tag) => <span key={tag} className="border border-neutral-700 bg-neutral-800 px-2 py-1 text-xs font-semibold text-neutral-300">{tag}</span>) : <span className="text-xs text-neutral-600">Add a few tags to finish the card.</span>}
              </div>
            </div>
          </section>

          <section className="border border-neutral-700 bg-neutral-950/70 p-5">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">Article preview</p>
            <h2 className="mb-3 text-xl font-bold leading-tight text-white">{title || 'Your article title'}</h2>
            <p className="mb-5 text-sm leading-relaxed text-neutral-400">{excerpt || 'The introduction will appear here.'}</p>
            <div className="max-h-[420px] overflow-y-auto border-t border-neutral-800 pt-2">
              {content.trim() ? (
                <BlogMarkdown content={content} />
              ) : (
                <p className="py-5 text-sm leading-relaxed text-neutral-600">Your formatted article will appear here as you write.</p>
              )}
            </div>
          </section>

          <section className="border border-neutral-800 bg-black/30 p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">How publishing works</p>
            <ol className="space-y-2 text-sm leading-relaxed text-neutral-500">
              <li><span className="mr-2 text-neutral-300">01</span>Download the generated JSX file.</li>
              <li><span className="mr-2 text-neutral-300">02</span>Put it in the project’s <code className="text-neutral-300">/blogs</code> folder.</li>
              <li><span className="mr-2 text-neutral-300">03</span>Commit and push; the site build adds it to the grid.</li>
            </ol>
            <p className="mt-4 border-t border-neutral-800 pt-4 text-xs leading-relaxed text-neutral-600">
              This static editor downloads a file in your browser. The editor is visible on the site, but downloading a post does not publish it; only a committed file is served.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
