import assert from "node:assert/strict";
import { howProgress } from "../src/hooks/howScene.ts";

// The anchors belong to the reading level, regardless of text height or language.
for (const anchors of [
  [600, 1140, 1680],
  [831, 1434, 2037],
  [50, 900, 1500],
]) {
  assert.equal(howProgress(-10000, anchors), 0);
  assert.equal(howProgress(10000, anchors), 2);
  anchors.forEach((anchor, index) =>
    assert.equal(howProgress(anchor, anchors), index),
  );
  for (let segment = 0; segment < 2; segment++) {
    const start = anchors[segment],
      length = anchors[segment + 1] - start;
    assert.equal(
      howProgress(start + length * 0.6, anchors),
      segment,
      "Hold the current state while its text is being read",
    );
    assert.ok(
      howProgress(start + length * 0.9, anchors) > segment,
      "Reorganise before the next reading anchor",
    );
  }
  const positions = Array.from(
    { length: 201 },
    (_, i) => anchors[0] + (i * (anchors[2] - anchors[0])) / 200,
  );
  const down = positions.map((p) => howProgress(p, anchors));
  const up = [...positions]
    .reverse()
    .map((p) => howProgress(p, anchors))
    .reverse();
  assert.deepEqual(
    up,
    down,
    "Scroll reversal uses the same deterministic states",
  );
  down.forEach((p, i) => {
    if (i) {
      assert.ok(p >= down[i - 1]);
      assert.ok(p - down[i - 1] < 0.1, "No jump between adjacent positions");
    }
  });
}
console.log(
  "PASS: reading anchors, stable holds, continuous transitions, reverse scroll and skipped-section endpoints.",
);
