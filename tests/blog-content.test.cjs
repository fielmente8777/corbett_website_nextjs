const test = require('node:test');
const assert = require('node:assert/strict');
const blogs = require('../src/data/blogs.json');
const slugs = new Set(blogs.map(blog => blog.slug));
const textOf = blog => blog.blocks.map(block => block.kind === 'table' ? [...block.columns, ...block.rows.flat()].join(' ') : block.kind === 'list' ? block.items.join(' ') : block.text).join(' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

test('the collection contains at least 50 distinct articles with unique search metadata', () => {
  assert.ok(blogs.length >= 50);
  assert.equal(slugs.size, blogs.length);
  for (const field of ['title', 'seoTitle', 'description']) {
    assert.equal(new Set(blogs.map(blog => blog[field].trim().toLowerCase())).size, blogs.length, field);
  }
  for (const blog of blogs) assert.match(blog.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
});

test('articles contain full readable content with well-formed comparisons', () => {
  for (const blog of blogs) {
    assert.ok(textOf(blog).split(/\s+/).length >= 350, blog.slug + ' is incomplete');
    assert.ok(blog.blocks.filter(block => block.kind === 'heading').length >= 3, blog.slug);
    assert.ok(blog.blocks.filter(block => block.kind === 'paragraph').length >= 5, blog.slug);
    for (const block of blog.blocks) {
      if (block.kind === 'table') {
        assert.ok(block.caption && block.columns.length > 1 && block.rows.length);
        assert.ok(block.rows.every(row => row.length === block.columns.length), blog.slug);
      } else if (block.kind === 'list') assert.ok(block.items.length > 1, blog.slug);
      else assert.ok(block.text.trim(), blog.slug);
    }
  }
});

test('contextual article links resolve and every article is connected to the collection', () => {
  const incoming = Object.fromEntries(blogs.map(blog => [blog.slug, 0]));
  for (const blog of blogs) {
    const references = [...JSON.stringify(blog.blocks).matchAll(/\]\(\/blogs\/([a-z0-9-]+)\)/g)].map(match => match[1]);
    assert.equal(new Set(blog.relatedSlugs).size, 3, blog.slug);
    for (const slug of [...references, ...blog.relatedSlugs]) {
      assert.ok(slugs.has(slug), blog.slug + ' links to missing article ' + slug);
      assert.notEqual(slug, blog.slug);
      incoming[slug] += 1;
    }
  }
  for (const [slug, count] of Object.entries(incoming)) assert.ok(count >= 2, slug + ' needs incoming links');
});

test('official visitor references use complete secure URLs with review dates', () => {
  for (const blog of blogs.filter(blog => blog.sources?.length)) {
    assert.match(blog.sourceChecked, /^\d{4}-\d{2}-\d{2}$/);
    for (const source of blog.sources) {
      assert.equal(new URL(source.url).protocol, 'https:');
      assert.ok(source.label.trim());
    }
  }
});
