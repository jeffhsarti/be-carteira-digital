import { describe, it, expect } from "vitest";
import { Client } from "../../../../src/core/entities/client.entity";
import { IClient } from "../../../../src/core/interfaces/client.interface";
import uuid from "../../../../src/util/uuid";

describe("Client entity unit tests", () => {
  it("should create a new client", () => {
    const rawClient: IClient = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      wallets: [],
    };

    const client = new Client(rawClient);

    expect(client.name).toBe("John Doe");
    expect(client.email).toBe("john.doe@example.com");
    expect(client.password).toBe("password123");
    expect(client.wallets.length).toEqual(0);

    expect(client.id).not.toBeUndefined();
    expect(typeof client.id).toBe("string");

    expect(client.createdAt).not.toBeUndefined();
    expect(client.createdAt).toBeInstanceOf(Date);

    expect(client.updatedAt).not.toBeUndefined();
    expect(client.updatedAt).toBeInstanceOf(Date);
  });

  it("should create a new client with existing data", () => {
    const rawClient: IClient = {
      id: uuid(),
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      wallets: [],
      createdAt: new Date(2000, 1, 1),
      updatedAt: new Date(2000, 1, 1),
    };

    const client = new Client(rawClient);

    expect(client.id).toBe(rawClient.id);
    expect(client.name).toBe(rawClient.name);
    expect(client.email).toBe(rawClient.email);
    expect(client.password).toBe(rawClient.password);
    expect(client.wallets.length).toEqual(rawClient.wallets.length);

    expect(client.createdAt).toBeInstanceOf(Date);
    expect(client.createdAt.getTime()).toBe(rawClient.createdAt!.getTime());
    expect(client.updatedAt).toBeInstanceOf(Date);
    expect(client.updatedAt.getTime()).toBe(rawClient.updatedAt!.getTime());
  });
});
