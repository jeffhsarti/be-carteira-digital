import { describe, it, expect } from "vitest";
import uuid from "../../../src/util/uuid";

describe("uuid utils module unit tests", () => {
  it("should generate a unique id", () => {
    const id1 = uuid();
    const id2 = uuid();

    expect(id1).not.toBe(id2);
  });

  it("should generate a string-type uuid", () => {
    const id = uuid();
    expect(typeof id).toBe("string");
  });
});
