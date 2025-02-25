import {
  ISanitizedWallet,
  IBaseWallet,
} from "../../core/interfaces/wallet.interface";
import { Wallet } from "../../core/entities/wallet.entity";

export default interface IWalletService {
  getWalletById(id: string): Promise<Wallet>;
  getWalletsOfClient(clientId: string): Promise<Wallet[]>;
  getWalletInfoById(id: string): Promise<ISanitizedWallet>;
  getAllWalletsInfoOfClient(clientId: string): Promise<ISanitizedWallet[]>;
  createWallet(wallet: IBaseWallet): Promise<ISanitizedWallet>;
}
