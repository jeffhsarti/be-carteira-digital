import { Wallet } from "../../../../core/entities/wallet.entity";
import {
  ISanitizedWallet,
  IBaseWallet,
} from "../../../../core/interfaces/wallet.interface";
import IWalletController from "../wallet.controller";
import IWalletService from "../../../../core/services/wallet.service";

export default class WalletController implements IWalletController {
  constructor(private walletService: IWalletService) {}
  async getWalletById(id: string): Promise<Wallet> {
    return this.walletService.getWalletById(id);
  }
  async getWalletInfoById(id: string): Promise<ISanitizedWallet> {
    return this.walletService.getWalletInfoById(id);
  }
  async getWalletsOfClient(clientId: string): Promise<Wallet[]> {
    return this.walletService.getWalletsOfClient(clientId);
  }
  async getAllWalletsInfoOfClient(
    clientId: string,
  ): Promise<ISanitizedWallet[]> {
    return this.walletService.getAllWalletsInfoOfClient(clientId);
  }
  async createWallet(wallet: IBaseWallet): Promise<ISanitizedWallet> {
    return this.walletService.createWallet(wallet);
  }
}
