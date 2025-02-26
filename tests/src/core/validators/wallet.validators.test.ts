import { describe, it, expect } from "vitest";
import {
  createWalletSchema,
  getWalletByWalletIdSchema,
} from "../../../../src/core/validators/wallet.validators";
import uuid from "../../../../src/util/uuid";

describe("Wallet validators unit tests", () => {
  it("should validate create wallet schema", () => {
    const result = createWalletSchema.validate({
      clientId: uuid(),
    });

    expect(result.error).toBeUndefined();
  });
  it("should fail validation for missing required fields", () => {
    const result = createWalletSchema.validate({});
    expect(result.error).not.toBe(null);
  });
  it("should fail validation for invalid fields", () => {
    const invalidName = createWalletSchema.validate({
      clientId: "invalid-uuid",
    });
    expect(invalidName.error).not.toBe(null);
  });

  it("should validate get wallet by id schema", () => {
    const result = getWalletByWalletIdSchema.validate({
      walletId: uuid(),
      clientId: uuid(),
    });
    expect(result.error).toBeUndefined();
    expect(typeof result.value.walletId).toBe("string");
  });
  it("should fail validation for invalid uuid", () => {
    const result1 = getWalletByWalletIdSchema.validate({
      walletId: "invalid-uuid",
      clientId: uuid(),
    });
    const result2 = getWalletByWalletIdSchema.validate({
      walletId: uuid(),
      clientId: "invalid-uuid",
    });
    expect(result1.error).not.toBe(null);
    expect(result2.error).not.toBe(null);
  });
  it("should fail validation for missing data", () => {
    const result1 = getWalletByWalletIdSchema.validate({
      walletId: "invalid-uuid",
    });
    const result2 = getWalletByWalletIdSchema.validate({
      clientId: "invalid-uuid",
    });
    expect(result1.error).not.toBe(null);
    expect(result2.error).not.toBe(null);
  });
});
