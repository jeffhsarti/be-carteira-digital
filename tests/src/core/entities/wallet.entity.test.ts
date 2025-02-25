import { describe, it, expect } from "vitest";
import { Wallet } from "../../../../src/core/entities/wallet.entity";
import { IWallet } from "../../../../src/core/interfaces/wallet.interface";
import uuid from "../../../../src/util/uuid";

describe("Wallet entity unit tests", () => {
  it("should create a new wallet", () => {
    const rawWallet: IWallet = {
      clientId: uuid(),
      balance: 100,
      transactionsSent: [],
      transactionsReceived: [],
    };

    const wallet = new Wallet(rawWallet);

    expect(wallet.clientId).toBe(rawWallet.clientId);
    expect(wallet.balance).toBe(rawWallet.balance);
    expect(wallet.transactionsSent.length).toEqual(
      rawWallet.transactionsSent.length,
    );
    expect(wallet.transactionsReceived.length).toEqual(
      rawWallet.transactionsReceived.length,
    );

    expect(wallet.id).not.toBeUndefined();
    expect(typeof wallet.id).toBe("string");

    expect(wallet.createdAt).not.toBeUndefined();
    expect(wallet.createdAt).toBeInstanceOf(Date);

    expect(wallet.updatedAt).not.toBeUndefined();
    expect(wallet.updatedAt).toBeInstanceOf(Date);
  });
  it("should create a new wallet with existing data", () => {
    const rawWallet: IWallet = {
      id: uuid(),
      clientId: uuid(),
      balance: 300,
      transactionsSent: [],
      transactionsReceived: [],
      createdAt: new Date(2000, 1, 1),
      updatedAt: new Date(2000, 1, 1),
    };
    const wallet = new Wallet(rawWallet);
    expect(wallet.id).toBe(rawWallet.id);
    expect(wallet.clientId).toBe(rawWallet.clientId);
    expect(wallet.balance).toBe(rawWallet.balance);
    expect(wallet.transactionsSent.length).toEqual(
      rawWallet.transactionsSent.length,
    );
    expect(wallet.transactionsReceived.length).toEqual(
      rawWallet.transactionsReceived.length,
    );
    expect(wallet.createdAt).toBeInstanceOf(Date);
    expect(wallet.createdAt.getTime()).toBe(rawWallet.createdAt!.getTime());
    expect(wallet.updatedAt).toBeInstanceOf(Date);
    expect(wallet.updatedAt.getTime()).toBe(rawWallet.updatedAt!.getTime());
  });
  it("should allow a negative balance", () => {
    const rawWallet: IWallet = {
      id: uuid(),
      clientId: uuid(),
      balance: -300,
      transactionsSent: [],
      transactionsReceived: [],
    };
    const wallet = new Wallet(rawWallet);
    expect(wallet.balance).toBeLessThan(0);
  });
});
