import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import {
  createContactHandler,
  createResendTransport,
} from "../server/contact.ts";
import { validateContact, LIMITS } from "../src/contact/schema.ts";
const valid = {
  firstName: "Mária",
  lastName: "O’Neill-Nováková",
  email: "qa@example.com",
  phone: "+421 (0) 900 000 000",
  company: "QA firma",
  role: "",
  interest: "safety",
  message: "Izolovaný test formulára.",
  consent: true,
};
async function fixture(options, run) {
  const server = createServer(createContactHandler(options));
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const post = (body = valid, key = randomUUID(), headers = {}) =>
    fetch(origin + "/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
        "Idempotency-Key": key,
        ...headers,
      },
      body: JSON.stringify(body),
    });
  try {
    await run(post, origin);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
}
test("shared validation: international names, optional phone, whitespace, enum, consent, length", () => {
  assert.deepEqual(validateContact(valid).errors, {});
  const { phone, role, ...requiredOnly } = valid;
  assert.equal(typeof phone, "string");
  assert.equal(typeof role, "string");
  assert.deepEqual(validateContact(requiredOnly).errors, {});
  assert.deepEqual(
    validateContact({ ...valid, phone: "", role: "" }).errors,
    {},
  );
  for (const field of ["firstName", "lastName", "company", "message"])
    assert.ok(validateContact({ ...valid, [field]: "  " }).errors[field]);
  assert.ok(validateContact({ ...valid, email: "not an email" }).errors.email);
  assert.ok(
    validateContact({
      ...valid,
      email: "a@example.com\r\nBcc: bad@example.com",
    }).errors.email,
  );
  assert.ok(validateContact({ ...valid, interest: "forged" }).errors.interest);
  assert.ok(validateContact({ ...valid, consent: "true" }).errors.consent);
  assert.ok(
    validateContact({ ...valid, message: "x".repeat(LIMITS.message + 1) })
      .errors.message,
  );
  assert.deepEqual(
    validateContact({ ...valid, message: "x".repeat(LIMITS.message) }).errors,
    {},
  );
});
test("missing configuration never accepts an enquiry", async () =>
  fixture({}, async (post) => {
    const res = await post();
    assert.equal(res.status, 503);
    assert.equal((await res.json()).accepted, false);
  }));
test("server repeats validation, rejects wrong content type, foreign origin and oversize bodies", async () =>
  fixture(
    {
      send: async () => {
        assert.fail("invalid data must not reach transport");
      },
    },
    async (post) => {
      assert.equal((await post({ ...valid, company: "  " })).status, 422);
      assert.equal(
        (await post(valid, randomUUID(), { "Content-Type": "text/plain" }))
          .status,
        415,
      );
      assert.equal(
        (await post(valid, randomUUID(), { Origin: "https://other.example" }))
          .status,
        403,
      );
      assert.equal(
        (await post({ ...valid, message: "x".repeat(17000) })).status,
        413,
      );
    },
  ));
test("same in-flight request and repeated success deliver only once; changed payload conflicts", async () => {
  let sends = 0;
  let release;
  const gate = new Promise((resolve) => (release = resolve));
  await fixture(
    {
      rateLimit: 20,
      send: async () => {
        sends++;
        await gate;
        return true;
      },
    },
    async (post) => {
      const key = randomUUID();
      const a = post(valid, key);
      const b = post(valid, key);
      await new Promise((resolve) => setTimeout(resolve, 30));
      release();
      assert.equal((await a).status, 200);
      assert.equal((await b).status, 200);
      assert.equal((await post(valid, key)).status, 200);
      assert.equal(sends, 1);
      assert.equal(
        (await post({ ...valid, company: "Changed" }, key)).status,
        409,
      );
    },
  );
});
test("failed transport can retry using the same key without false success", async () => {
  let calls = 0;
  await fixture({ send: async () => ++calls > 1 }, async (post) => {
    const key = randomUUID();
    const first = await post(valid, key);
    assert.equal(first.status, 502);
    assert.equal((await first.json()).accepted, false);
    assert.equal((await post(valid, key)).status, 200);
    assert.equal(calls, 2);
  });
});
test("transport exceptions are contained and rate limit expires", async () => {
  let time = 1;
  await fixture(
    {
      now: () => time,
      rateLimit: 1,
      send: async () => {
        throw Error("private provider detail");
      },
    },
    async (post) => {
      const first = await post();
      assert.equal(first.status, 502);
      assert.deepEqual(await first.json(), { accepted: false });
      const second = await post();
      assert.equal(second.status, 429);
      assert.ok(second.headers.get("retry-after"));
      time += 15 * 60 * 1000;
      assert.equal((await post()).status, 502);
    },
  );
});
test("mail adapter uses verified sender, reply-to, plain text, fixed recipient and idempotency", async () => {
  assert.equal(createResendTransport({}), undefined);
  assert.equal(
    createResendTransport({
      RESEND_API_KEY: "test",
      CONTACT_FROM: "bad\r\nfrom",
    }),
    undefined,
  );
  let request;
  const adapter = createResendTransport(
    {
      RESEND_API_KEY: "test-only-key",
      CONTACT_FROM: "WEDMA <verified@example.com>",
    },
    async (url, options) => {
      request = { url, ...options };
      return new Response(JSON.stringify({ id: "test-provider-id" }), {
        status: 200,
      });
    },
  );
  assert.equal(
    await adapter(
      { ...valid, message: "<script>literal data</script>" },
      "test-request",
    ),
    true,
  );
  const body = JSON.parse(request.body);
  assert.equal(request.url, "https://api.resend.com/emails");
  assert.deepEqual(body.to, ["info@wedma.sk"]);
  assert.equal(body.reply_to, valid.email);
  assert.equal(body.from, "WEDMA <verified@example.com>");
  assert.equal(body.html, undefined);
  assert.ok(body.text.includes("<script>literal data</script>"));
  assert.equal(
    request.headers["Idempotency-Key"],
    "wedma-contact/test-request",
  );
});
test("unconfirmed provider responses are failures", async () => {
  for (const [status, body] of [
    [200, {}],
    [429, { id: "not-accepted" }],
    [500, {}],
  ]) {
    const adapter = createResendTransport(
      { RESEND_API_KEY: "test", CONTACT_FROM: "verified@example.com" },
      async () => new Response(JSON.stringify(body), { status }),
    );
    assert.equal(await adapter(valid, "test"), false);
  }
});
