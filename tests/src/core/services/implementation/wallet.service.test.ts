import { describe, it, expect, beforeEach, vi } from "vitest";
import WalletService from "../../../../../src/core/services/implementation/wallet.service";
import WalletModel from "../../../../../src/frameworks/prisma/models/in-memory/wallet.model";
import uuid from "../../../../../src/util/uuid";
import PrismaWalletRepository from "../../../../../src/infra/repositories/implementation/prisma-wallet.repository";
import {
  ForeignKeyError,
  UniqueConstraintError,
} from "../../../../../src/util/exception";
import {
  InvalidWalletOwnerException,
  WalletAlreadyExistsException,
  WalletNotFoundException,
} from "../../../../../src/core/errors/wallet.errors";

describe("Wallet service unit tests", () => {
  let walletRepository = new PrismaWalletRepository(new WalletModel());
  let walletService = new WalletService(walletRepository);
  beforeEach(() => {
    walletRepository = new PrismaWalletRepository(new WalletModel());
    walletService = new WalletService(walletRepository);
    vi.clearAllMocks();
  });
  const clientId = uuid();
  it("should create a new wallet and then be able to fetch it by its id", async () => {
    const createdWallet = await walletService.createWallet({
      clientId,
    });
    expect(createdWallet).toBeTruthy();
    expect("balance" in createdWallet).toBeFalsy();
    expect(createdWallet.clientId).toBe(clientId);

    const wallet1 = await walletService.getWalletById(createdWallet.id);
    expect(wallet1).toBeTruthy();
    expect(wallet1.id).toBe(createdWallet.id);
    expect(wallet1.clientId).toBe(clientId);
    expect("balance" in wallet1).toBeTruthy();

    const wallet2 = await walletService.getWalletInfoById(createdWallet.id);
    expect(wallet2).toBeTruthy();
    expect(wallet2.id).toBe(createdWallet.id);
    expect("balance" in wallet2).toBeFalsy();
  });

  it("should return all wallets of a given client by its client id", async () => {
    await walletService.createWallet({
      clientId,
    });
    await walletService.createWallet({
      clientId,
    });

    const wallets1 = await walletService.getWalletsOfClient(clientId);
    expect(wallets1).toHaveLength(2); // possui a wallet criada no teste anterior
    expect(wallets1.every((wallet) => "balance" in wallet)).toBeTruthy();

    const wallets2 = await walletService.getAllWalletsInfoOfClient(clientId);
    expect(wallets2).toHaveLength(2);
    expect(wallets2.every((wallet) => "balance" in wallet)).toBeFalsy();
  });

  it("should throw ForeignKeyError when trying to create a wallet with a non-existent client id", async () => {
    vi.spyOn(walletRepository, "createWallet").mockRejectedValueOnce(
      new ForeignKeyError("The client does not exist."),
    );
    await expect(
      walletService.createWallet({
        clientId,
      }),
    ).rejects.toThrow(InvalidWalletOwnerException);
  });

  it("should throw WalletNotFoundException when trying to fetch a wallet by an inexistent id", async () => {
    const id = uuid();
    await expect(walletService.getWalletById(id)).rejects.toThrow(
      WalletNotFoundException,
    );
    await expect(walletService.getWalletInfoById(id)).rejects.toThrow(
      WalletNotFoundException,
    );
  });

  it("should throw UniqueConstraintError when trying to create a wallet with a duplicated id", async () => {
    vi.spyOn(walletRepository, "createWallet").mockRejectedValueOnce(
      new UniqueConstraintError("A wallet with the same id already exists."),
    );
    await expect(
      walletService.createWallet({
        clientId,
      }),
    ).rejects.toThrow(WalletAlreadyExistsException);
  });

  it("should throw a generic error when the repository throws an unmapped error", async () => {
    vi.spyOn(walletRepository, "createWallet").mockRejectedValueOnce(
      new Error("Generic error"),
    );
    await expect(
      walletService.createWallet({
        clientId,
      }),
    ).rejects.toThrow("Failed to create wallet");
  });
});
