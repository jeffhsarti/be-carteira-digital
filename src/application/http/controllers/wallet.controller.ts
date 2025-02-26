import { Wallet } from "../../../core/entities/wallet.entity";
import {
  IBaseWallet,
  ISanitizedWallet,
} from "../../../core/interfaces/wallet.interface";

export default interface IWalletController {
  getWalletById(id: string): Promise<Wallet>;
  getWalletInfoById(id: string): Promise<ISanitizedWallet>;
  getWalletsOfClient(clientId: string): Promise<Wallet[]>;
  getAllWalletsInfoOfClient(clientId: string): Promise<ISanitizedWallet[]>;
  createWallet(Wallet: IBaseWallet): Promise<ISanitizedWallet>;
}
