import { Wallet } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { Wallet as WalletEntity } from "../../../../core/entities/wallet.entity";
import IWalletModel from "../wallet.model";

export default class WalletModel implements IWalletModel {
  wallets: Wallet[] = [];
  constructor(initialWallets?: Wallet[]) {
    if (initialWallets) {
      this.wallets = initialWallets;
    }
  }

  async findById(id: string): Promise<Wallet | null> {
    const wallet = this.wallets.find((wallet) => wallet.id === id);
    return wallet ? { ...wallet } : null;
  }

  async findAllByClient(clientId: string): Promise<Wallet[]> {
    return this.wallets.filter((wallet) => wallet.clientId === clientId);
  }

  async create(data: WalletEntity): Promise<Wallet> {
    const newWallet: Wallet = {
      id: data.id,
      clientId: data.clientId,
      balance: new Decimal(data.balance),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.wallets.push(newWallet);
    return newWallet;
  }
}
