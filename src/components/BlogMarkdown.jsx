import { createElement } from 'react';

const inlinePattern = /(\[[^\]]+\]\([^)]+\)|\*\*.+?\*\*|__.+?__|`.+?`|\*.+?\*|_.+?_)/g;

function safeHref(value) {
  const href = value.trim();
  return /^(https?:\/\/|mailto:|\/|#)/i.test(href) ? href : null;
}

function renderInline(text, keyPrefix) {
  return text.split(inlinePattern).filter(Boolean).map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (link) {
      const href = safeHref(link[2]);
      return href
        ? createElement('a', {
            key,
            href,
            className: 'text-white underline decoration-neutral-500 underline-offset-4 hover:decoration-white',
            ...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {}),
          }, link[1])
        : link[1];
    }

    if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
      return createElement('strong', { key, className: 'font-bold text-white' }, part.slice(2, -2));
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return createElement('code', { key, className: 'border border-neutral-700 bg-neutral-900 px-1.5 py-0.5 font-mono text-[0.9em] text-neutral-200' }, part.slice(1, -1));
    }
    if ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) {
      return createElement('em', { key, className: 'italic text-neutral-200' }, part.slice(1, -1));
    }

    return part;
  });
}

function startsBlock(line) {
  return /^\s*(```|#{1,3}\s|>|[-*]\s|\d+\.\s)/.test(line);
}

export default function BlogMarkdown({ content = '' }) {
  const lines = content.replace(/\r\n?/g, '\n').split('\n');
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith('```')) {
      const codeLines = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(createElement('pre', {
        key: `block-${blocks.length}`,
        className: 'my-7 overflow-x-auto border border-neutral-800 bg-black/50 p-5 font-mono text-sm leading-relaxed text-neutral-200',
      }, createElement('code', null, codeLines.join('\n'))));
      continue;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const tag = `h${level + 1}`;
      const classes = level === 1
        ? 'mb-4 mt-10 text-2xl font-bold text-white md:text-3xl'
        : level === 2
          ? 'mb-3 mt-8 text-xl font-bold text-white md:text-2xl'
          : 'mb-3 mt-7 text-lg font-bold text-white';
      blocks.push(createElement(tag, { key: `block-${blocks.length}`, className: classes }, renderInline(heading[2], `heading-${blocks.length}`)));
      index += 1;
      continue;
    }

    if (trimmed.startsWith('>')) {
      const quoteLines = [];
      while (index < lines.length && lines[index].trim().startsWith('>')) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ''));
        index += 1;
      }
      blocks.push(createElement('blockquote', {
        key: `block-${blocks.length}`,
        className: 'my-7 border-l-2 border-neutral-500 pl-5 text-lg italic leading-relaxed text-neutral-300',
      }, renderInline(quoteLines.join('\n'), `quote-${blocks.length}`)));
      continue;
    }

    const listItem = trimmed.match(/^(?:[-*]|\d+\.)\s+/);
    if (listItem) {
      const ordered = /^\d+\./.test(trimmed);
      const items = [];
      while (index < lines.length) {
        const match = lines[index].trim().match(/^(?:[-*]|\d+\.)\s+(.+)$/);
        if (!match || ordered !== /^\d+\./.test(lines[index].trim())) break;
        items.push(match[1]);
        index += 1;
      }
      const tag = ordered ? 'ol' : 'ul';
      blocks.push(createElement(tag, {
        key: `block-${blocks.length}`,
        className: `${ordered ? 'list-decimal' : 'list-disc'} my-6 space-y-2 pl-6 leading-relaxed text-neutral-300 marker:text-neutral-500`,
      }, items.map((item, itemIndex) => createElement('li', { key: `item-${itemIndex}` }, renderInline(item, `list-${blocks.length}-${itemIndex}`)))));
      continue;
    }

    const paragraph = [trimmed];
    index += 1;
    while (index < lines.length && lines[index].trim() && !startsBlock(lines[index].trim())) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(createElement('p', {
      key: `block-${blocks.length}`,
      className: 'my-5 whitespace-pre-line text-base leading-8 text-neutral-300 md:text-lg',
    }, renderInline(paragraph.join('\n'), `paragraph-${blocks.length}`)));
  }

  return <div>{blocks}</div>;
}
