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
    });
    expect(result.error).toBeUndefined();
    expect(typeof result.value.walletId).toBe("string");
  });
  it("should fail validation for invalid uuid", () => {
    const result = getWalletByWalletIdSchema.validate({
      walletId: "invalid-uuid",
    });
    expect(result.error).not.toBe(null);
  });
});
