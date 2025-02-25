import { describe, it, expect } from "vitest";
import {
  createClientSchema,
  getClientByIdSchema,
} from "../../../../src/core/validators/client.validators";
import uuid from "../../../../src/util/uuid";

describe("Client validators unit tests", () => {
  it("should validate create client schema", () => {
    const result = createClientSchema.validate({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "Password123",
    });

    expect(result.error).toBeUndefined();
  });
  it("should fail validation for missing required fields", () => {
    const result = createClientSchema.validate({
      name: "John Doe",
      email: "john.doe@example.com",
    });
    expect(result.error).not.toBe(null);
  });
  it("should fail validation for invalid fields", () => {
    const invalidName = createClientSchema.validate({
      name: 1,
      email: "john.doe@example.com",
      password: "Password123",
    });
    expect(invalidName.error).not.toBe(null);

    const invalidEmail = createClientSchema.validate({
      name: "John Doe",
      email: "john.doeexample.com",
      password: "Password123",
    });
    expect(invalidEmail.error).not.toBe(null);

    const invalidPassword = createClientSchema.validate({
      name: "John Doe",
      email: "john.doeexample.com",
      password: "password123",
    });
    expect(invalidPassword.error).not.toBe(null);
  });

  it("should validate get client by id schema", () => {
    const result = getClientByIdSchema.validate({
      clientId: uuid(),
    });
    expect(result.error).toBeUndefined();
    expect(typeof result.value.clientId).toBe("string");
  });
  it("should fail validation for invalid uuid", () => {
    const result = getClientByIdSchema.validate({
      clientId: "invalid-uuid",
    });
    expect(result.error).not.toBe(null);
  });
  it("should fail validation for missing field", () => {
    const result = getClientByIdSchema.validate({});
    expect(result.error).not.toBe(null);
  });
});
