import { describe, it, expect, beforeEach, vi } from "vitest";
import ClientService from "src/core/services/implementation/client.service";
import { IBaseClient } from "src/core/interfaces/client.interface";
import uuid from "src/util/uuid";
import {
  ClientAlreadyExistsException,
  ClientNotFoundException,
} from "src/core/errors/client.errors";
import WalletService from "src/core/services/implementation/wallet.service";
import PrismaClientRepository from "src/infra/repositories/implementation/prisma-client.repository";
import InMemoryClientModel from "src/frameworks/prisma/models/in-memory/client.model";
import PrismaWalletRepository from "src/infra/repositories/implementation/prisma-wallet.repository";
import WalletModel from "src/frameworks/prisma/models/in-memory/wallet.model";
import { UniqueConstraintError } from "src/util/exception";

describe("Client service unit tests", () => {
  let clientRepository = new PrismaClientRepository(new InMemoryClientModel());
  let walletRepository = new PrismaWalletRepository(new WalletModel());
  let clientService = new ClientService(
    clientRepository,
    new WalletService(walletRepository),
  );

  beforeEach(() => {
    clientRepository = new PrismaClientRepository(new InMemoryClientModel());
    walletRepository = new PrismaWalletRepository(new WalletModel());
    clientService = new ClientService(
      clientRepository,
      new WalletService(walletRepository),
    );
    vi.clearAllMocks();
  });

  it("should create a new client and then be able to fetch it by its id", async () => {
    const rawClient: IBaseClient = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      wallets: [],
    };
    const createdClient = await clientService.createClient(rawClient);
    expect(createdClient).toBeTruthy();
    expect("password" in createdClient).toBeFalsy();
    expect(createdClient.email).toBe(rawClient.email);

    const client = await clientService.getClientById(createdClient.id);
    expect(client).toBeTruthy();
  });

  it("should get all clients", async () => {
    const rawClient: IBaseClient = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      wallets: [],
    };
    await clientService.createClient(rawClient);
    const clients = await clientService.getAllClients();
    expect(clients.length).toBe(1);
  });

  it("should throw ClientNotFoundException when trying to fetch a client by an inexistent id", async () => {
    await expect(clientService.getClientById(uuid())).rejects.toThrow(
      ClientNotFoundException,
    );
  });

  it("should throw UniqueConstraintError when trying to create a client with a duplicated email", async () => {
    vi.spyOn(clientRepository, "create").mockRejectedValueOnce(
      new UniqueConstraintError("A wallet with the same id already exists."),
    );
    await expect(
      clientService.createClient({
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        wallets: [],
      }),
    ).rejects.toThrow(ClientAlreadyExistsException);
  });

  it("should throw a generic error when the repository throws an unmapped error", async () => {
    vi.spyOn(clientRepository, "create").mockRejectedValueOnce(
      new Error("Generic error"),
    );
    await expect(
      clientService.createClient({
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        wallets: [],
      }),
    ).rejects.toThrow("Failed to create client");
  });
});
