import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "../../../src/util/crypto";

describe("crypto utils module unit tests", () => {
  it("should generate a hashed password", async () => {
    const password = "password123";
    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).not.toBe(password);
  });

  it("should correctly evaluate if a password matches it's hash", async () => {
    const password = "password123";
    const hashedPassword = await hashPassword(password);
    const verification = await verifyPassword(password, hashedPassword);
    expect(verification).toBe(true);
  });

  it("should correctly evaluate if a password doesn't match a hash", async () => {
    const password = "password123";
    const incorrectPassword = "wrong-password";
    const hashedPassword = await hashPassword(password);
    const verification = await verifyPassword(
      incorrectPassword,
      hashedPassword,
    );
    expect(verification).toBe(false);
  });
});
