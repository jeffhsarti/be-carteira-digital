import uuid from "../../util/uuid";
import { IClient } from "../interfaces/client.interface";
import { Wallet } from "./wallet.entity";

export class Client implements IClient {
  id: string = uuid();
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  name: string;
  email: string;
  password: string;
  wallets: Wallet[] = [];

  constructor(rawClient: IClient) {
    const { id, name, email, password, createdAt, updatedAt, wallets } =
      rawClient;
    this.name = name;
    this.email = email;
    this.password = password;
    this.wallets = wallets.map((wallet) => new Wallet(wallet));

    if (id) {
      this.id = id;
    }

    if (createdAt) {
      this.createdAt = createdAt;
    }

    if (updatedAt) {
      this.updatedAt = updatedAt;
    }
  }
}
