import { describe, it, expect, afterEach, vi, beforeAll } from "vitest";
import ClientService from "../../../../../src/core/services/implementation/client.service";
import PrismaClientRepository from "../../../../../src/infra/repositories/implementation/prisma-client.repository";
import InMemoryClientModel from "../../../../../src/frameworks/prisma/models/in-memory/client.model";
import WalletService from "../../../../../src/core/services/implementation/wallet.service";
import AuthenticationService from "../../../../../src/core/services/implementation/authentication.service";
import WalletModel from "../../../../../src/frameworks/prisma/models/in-memory/wallet.model";
import PrismaWalletRepository from "../../../../../src/infra/repositories/implementation/prisma-wallet.repository";
import { IBaseClient } from "../../../../../src/core/interfaces/client.interface";
import jwt from "jsonwebtoken";
import { InvalidCredentialsError } from "../../../../../src/core/errors/auth.errors";
import {
  ExpiredTokenError,
  InvalidTokenError,
} from "../../../../../src/core/errors/jwt.errors";

describe("Auth service unit tests", () => {
  let clientRepository = new PrismaClientRepository(new InMemoryClientModel());
  let walletRepository = new PrismaWalletRepository(new WalletModel());
  let clientService = new ClientService(
    clientRepository,
    new WalletService(walletRepository),
  );
  let authService = new AuthenticationService(clientService);

  beforeAll(() => {
    vi.stubEnv("JWT_SECRET", "test");
  });
  afterEach(() => {
    clientRepository = new PrismaClientRepository(new InMemoryClientModel());
    walletRepository = new PrismaWalletRepository(new WalletModel());
    clientService = new ClientService(
      clientRepository,
      new WalletService(walletRepository),
    );
    vi.clearAllMocks();
  });

  it("should be able to create a new client and log in with the correct credentials", async () => {
    const rawClient: IBaseClient = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      wallets: [],
    };
    const createdClient = await clientService.createClient(rawClient);
    const loginResult = await authService.login(
      createdClient.email,
      "password123",
    );
    const decodedToken = authService.verifyAuthentication(loginResult);
    expect(loginResult).toBeTruthy();
    expect(typeof loginResult).toBe("string");
    expect(decodedToken.id).toBe(createdClient.id);
    expect(decodedToken.email).toBe(createdClient.email);
    expect(decodedToken.name).toBe(createdClient.name);
    expect(decodedToken.iss).toBe("be-carteira-digital");
    expect(decodedToken.aud).toBe("fe-carteira-digital");
    expect(decodedToken.sub).toBe(`client-${createdClient.id}`);
  });

  it("should throw InvalidCredentialsError when you try to log in with the incorrect credentials", async () => {
    vi.stubEnv("JWT_EXPIRES_IN", "1");
    const rawClient: IBaseClient = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      wallets: [],
    };
    const createdClient = await clientService.createClient(rawClient);
    await expect(
      authService.login(createdClient.email, "password132"),
    ).rejects.toThrow(InvalidCredentialsError);
  });
  it("should throw ExpiredTokenError when you try to authenticate with an expired token", async () => {
    vi.useFakeTimers();
    const rawClient: IBaseClient = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      wallets: [],
    };
    const createdClient = await clientService.createClient(rawClient);
    const token = await authService.login(createdClient.email, "password123");
    vi.advanceTimersByTime(1100);
    expect(() => authService.verifyAuthentication(token)).toThrowError(
      ExpiredTokenError,
    );
  });
  it("should throw InvalidTokenError when you try to authenticate with an invalid token", async () => {
    expect(() => authService.verifyAuthentication("InvalidToken")).toThrowError(
      InvalidTokenError,
    );
  });
  it("should throw InvalidTokenError when you try to authenticate with an invalid token", async () => {
    vi.spyOn(jwt, "verify").mockImplementationOnce(() => {
      throw new Error("Strange Error");
    });
    expect(() => authService.verifyAuthentication("InvalidToken")).toThrowError(
      "Something went wrong while authenticating the user",
    );
  });
});
