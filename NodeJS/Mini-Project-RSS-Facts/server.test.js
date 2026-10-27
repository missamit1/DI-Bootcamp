const test = require("node:test");
const assert = require("node:assert/strict");
const { createApp } = require("./server");

const feed = { items: [
  { title: "Ocean facts", link: "https://thefactfile.org/ocean/", creator: "Editor", pubDate: "Today", categories: ["Nature"], contentSnippet: "Blue water." },
  { title: "Space facts", link: "javascript:alert(1)", categories: ["Science"], contentSnippet: "<script>alert(1)</script>" },
] };

test("home, initial search, filtering, validation and feed errors", async () => {
  let fail = false;
  const server = createApp(async () => { if (fail) throw new Error("Offline"); return feed; }).listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (route, data) => fetch(base + route, { method: "POST", body: new URLSearchParams(data) });
  try {
    let response = await fetch(base + "/");
    assert.equal(response.status, 200);
    let html = await response.text();
    assert.match(html, /Ocean facts/);
    assert.match(html, /Space facts/);
    assert.match(html, /Editor/);
    assert.match(html, /Blue water/);
    assert.ok(!html.includes("javascript:alert"));
    assert.ok(!html.includes("<script>alert"));
    html = await (await fetch(base + "/search")).text();
    assert.ok(!html.includes('<article class="post">'));
    assert.match(html, /Nature/);
    html = await (await post("/search/title", { title: "OCEAN" })).text();
    assert.match(html, /Ocean facts/);
    assert.ok(!html.includes("Space facts"));
    html = await (await post("/search/category", { category: "Science" })).text();
    assert.match(html, /Space facts/);
    assert.ok(!html.includes("Ocean facts"));
    html = await (await post("/search/title", { title: "missing" })).text();
    assert.match(html, /No posts found/);
    assert.equal((await post("/search/title", { title: " " })).status, 400);
    assert.equal((await post("/search/category", {})).status, 400);
    fail = true;
    response = await fetch(base + "/");
    assert.equal(response.status, 502);
    assert.match(await response.text(), /temporarily unavailable/);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
