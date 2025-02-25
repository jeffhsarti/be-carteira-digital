import uuid from "../../util/uuid";
import { IWallet } from "../interfaces/wallet.interface";

export class Wallet implements IWallet {
  id: string;
  clientId: string;
  balance: number = 0;
  transactionsSent: any[] = [];
  transactionsReceived: any[] = [];
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  constructor(rawWallet: IWallet) {
    const {
      id,
      clientId,
      balance,
      transactionsSent,
      transactionsReceived,
      createdAt,
      updatedAt,
    } = rawWallet;
    this.clientId = clientId;
    this.transactionsSent = transactionsSent;
    this.transactionsReceived = transactionsReceived;

    if (id) {
      this.id = id;
    } else {
      this.id = uuid();
    }

    if (balance) {
      this.balance = balance;
    }

    if (createdAt) {
      this.createdAt = createdAt;
    }

    if (updatedAt) {
      this.updatedAt = updatedAt;
    }
  }
}
