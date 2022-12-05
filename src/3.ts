import assert from "assert"
import { input, sum } from "./util.js"

function parseSplitRucksack(string: string): [Set<string>, Set<string>] {
  const pivot = string.length / 2
  return [new Set(string.slice(0, pivot)), new Set(string.slice(pivot))]
}

function rucksackIntersection(rucksacks: Set<string>[]) {
  return [
    ...rucksacks
      .reduce(
        (intersection, rucksack) =>
          new Set([...intersection].filter((char) => rucksack.has(char))),
      )
      .values(),
  ][0]
}

const testLines = [
  "vJrwpWtwJgWrhcsFMMfFFhFp",
  "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
  "PmmdzqPrVvPwwTWBwg",
  "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
  "ttgJtRGJQctTZtZT",
  "CrZsJsPPZsGzwwsLwLmpwMDw",
]
assert.strictEqual(rucksackIntersection(parseSplitRucksack(testLines[0])), "p")
assert.strictEqual(rucksackIntersection(parseSplitRucksack(testLines[1])), "L")
assert.strictEqual(rucksackIntersection(parseSplitRucksack(testLines[2])), "P")
assert.strictEqual(rucksackIntersection(parseSplitRucksack(testLines[3])), "v")
assert.strictEqual(rucksackIntersection(parseSplitRucksack(testLines[4])), "t")
assert.strictEqual(rucksackIntersection(parseSplitRucksack(testLines[5])), "s")

function priority(string: string) {
  return (
    string.charCodeAt(0) +
    (string === string.toUpperCase()
      ? 27 - "A".charCodeAt(0)
      : 1 - "a".charCodeAt(0))
  )
}

assert.strictEqual(priority("p"), 16)
assert.strictEqual(priority("L"), 38)
assert.strictEqual(priority("P"), 42)
assert.strictEqual(priority("v"), 22)
assert.strictEqual(priority("t"), 20)
assert.strictEqual(priority("s"), 19)
assert.strictEqual(
  sum(
    testLines.map((line) =>
      priority(rucksackIntersection(parseSplitRucksack(line))),
    ),
  ),
  157,
)

const lines = (await input(3)).split("\n")

console.log(
  sum(
    lines.map((line) =>
      priority(rucksackIntersection(parseSplitRucksack(line))),
    ),
  ),
)

assert.strictEqual(
  rucksackIntersection(testLines.slice(0, 3).map((line) => new Set(line))),
  "r",
)
assert.strictEqual(
  rucksackIntersection(testLines.slice(3).map((line) => new Set(line))),
  "Z",
)

function partition<T>(array: T[], n: number): T[][] {
  return array.length
    ? [array.slice(0, n), ...partition(array.slice(n), n)]
    : []
}

assert.strictEqual(
  sum(
    partition(
      testLines.map((line) => new Set(line)),
      3,
    ).map((rucksacks) => priority(rucksackIntersection(rucksacks))),
  ),
  70,
)

console.log(
  sum(
    partition(
      lines.map((line) => new Set(line)),
      3,
    ).map((rucksacks) => priority(rucksackIntersection(rucksacks))),
  ),
)