import { Wallet } from "../../core/entities/wallet.entity";
import {
  IBaseWallet,
  ISanitizedWallet,
} from "../../core/interfaces/wallet.interface";

export default interface IWalletService {
  getWalletById(id: string): Promise<Wallet>;
  getWalletsOfClient(clientId: string): Promise<Wallet[]>;
  getWalletInfoById(id: string): Promise<ISanitizedWallet>;
  getAllWalletsInfoOfClient(clientId: string): Promise<ISanitizedWallet[]>;
  createWallet(wallet: IBaseWallet): Promise<ISanitizedWallet>;
}
