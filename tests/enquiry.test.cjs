const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Exercise the actual TypeScript modules without another test dependency.
function load(relative) {
  const filename = path.join(__dirname, '..', relative);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  const requireSource = name => name.startsWith('@/') ? load('src/' + name.slice(2) + '.ts') : require(name);
  new Function('require', 'module', 'exports', source)(requireSource, module, module.exports);
  return module.exports;
}
const links = load('src/lib/contact-links.ts');
const { validateEnquiry, crmPayload } = load('src/lib/enquiry.ts');
const { POST } = load('src/app/api/enquiry/route.ts');
const valid = { name: 'Preview Test', countryCode: '+91', phone: '9876543210', email: '', intent: 'wedding', date: '2027-02-15', guests: '80', rooms: '40', room: 'Classic Cottage', message: 'Two-day celebration', sourceUrl: 'https://example.test/weddings?_vercel_share=private&utm_source=test' };
const request = body => new Request('https://example.test/api/enquiry', { method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body) });

test('contact links encode one meaningful message and use the right phone team', () => {
  for (const intent of ['stay', 'wedding', 'corporate', 'general']) {
    const url = new URL(links.whatsappLink(intent, '+91 (89589) 88800'));
    assert.equal(url.pathname, '/918958988800');
    assert.equal(url.searchParams.get('text'), links.messages[intent]);
  }
  assert.equal(links.telephoneLink('wedding'), 'tel:+918958988810');
  assert.equal(links.intentForPath('/blogs/corporate-offsite'), 'corporate');
  assert.equal(new URL(links.enquiryLink('stay', 'Plunge Pool Cottages'), 'https://example.test').searchParams.get('room'), 'Plunge Pool Cottages');
});

test('source attribution retains campaign data and removes preview access parameters', () => {
  const clean = new URL(links.cleanSourceUrl(valid.sourceUrl + '&token=secret#details'));
  assert.equal(clean.search, '?utm_source=test');
  assert.equal(clean.hash, '');
  assert.equal(links.cleanSourceUrl('javascript:alert(1)'), '');
});

test('validation accepts formatted phones and preserves event requirements', () => {
  const result = validateEnquiry({ ...valid, phone: '98765 43210', name: ' Preview Test ' });
  assert.equal(result.data.name, 'Preview Test');
  assert.equal(result.data.phone, '9876543210');
  const payload = crmPayload(result.data, links.cleanSourceUrl(result.data.sourceUrl));
  assert.equal(payload.Domain, 'corbettthegrand');
  assert.equal(payload.Contact, '+919876543210');
  assert.match(payload.Description, /Enquiry: wedding\nPreferred date: 2027-02-15\nGuests: 80\nRooms: 40/);
  assert.doesNotMatch(payload.Description, /_vercel_share/);
});

test('validation rejects invalid contact details, dates, counts and honeypot submissions', () => {
  for (const change of [{ name: 'A' }, { phone: '123abc4567' }, { countryCode: '91' }, { email: 'bad@' }, { date: '2027-02-30' }, { departure: '2027-02-14' }, { guests: '-1' }, { rooms: '0' }, { website: 'spam' }]) {
    assert.ok(validateEnquiry({ ...valid, ...change }).error, JSON.stringify(change));
  }
});

test('invalid API requests never reach the CRM', async t => {
  const upstream = t.mock.method(globalThis, 'fetch', async () => { throw new Error('Unexpected upstream call'); });
  assert.equal((await POST(request('{'))).status, 400);
  assert.equal((await POST(request({}))).status, 422);
  assert.equal((await POST(request({ ...valid, website: 'spam' }))).status, 422);
  assert.equal((await POST(request('x'.repeat(12001)))).status, 413);
  assert.equal(upstream.mock.callCount(), 0);
});

test('API returns success only after CRM accepts a sanitized enquiry', async t => {
  let payload;
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://nexon.eazotel.com/eazotel/addcontacts');
    payload = JSON.parse(options.body);
    return Response.json({ Status: true });
  });
  const response = await POST(request(valid));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(payload.source_url, 'https://example.test/weddings?utm_source=test');
});

test('upstream errors and negative acknowledgements do not show false success', async t => {
  const upstream = t.mock.method(globalThis, 'fetch');
  for (const reply of [Response.json({ Status: false }), new Response('Unavailable', { status: 503 })]) {
    upstream.mock.mockImplementation(async () => reply);
    const response = await POST(request(valid));
    assert.equal(response.status, 502);
    assert.ok((await response.json()).error);
  }
  upstream.mock.mockImplementation(async () => { throw new Error('Network unavailable'); });
  assert.equal((await POST(request(valid))).status, 502);
});
