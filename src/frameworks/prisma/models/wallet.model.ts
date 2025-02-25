import { Wallet } from "@prisma/client";
import { Wallet as WalletEntity } from "../../../core/entities/wallet.entity";

export default interface IWalletModel {
  findById(id: string): Promise<Wallet | null>;
  findAllByClient(clientId: string): Promise<Wallet[]>;
  create(data: WalletEntity): Promise<Wallet>;
}
