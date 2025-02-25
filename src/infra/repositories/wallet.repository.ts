import { Wallet } from "../../core/entities/wallet.entity";
import {
  ISanitizedWallet,
  IWallet,
} from "../../core/interfaces/wallet.interface";

export interface IWalletRepository {
  getWalletById(id: string): Promise<Wallet | null>;
  getWalletsOfClient(clientId: string): Promise<Wallet[]>;
  getWalletInfoById(id: string): Promise<ISanitizedWallet | null>;
  getAllWalletsInfoOfClient(clientId: string): Promise<ISanitizedWallet[]>;
  createWallet(rawWallet: IWallet): Promise<ISanitizedWallet>;
}
