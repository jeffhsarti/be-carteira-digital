import { Wallet } from "../../../core/entities/wallet.entity";
import {
  ISanitizedWallet,
  IBaseWallet,
} from "../../../core/interfaces/wallet.interface";
import { IWalletRepository } from "../../../infra/repositories/wallet.repository";
import IWalletService from "../wallet.service";
import {
  InvalidWalletOwnerException,
  WalletAlreadyExistsException,
  WalletNotFoundException,
} from "../../../core/errors/wallet.errors";
import {
  UniqueConstraintError,
  ForeignKeyError,
} from "../../../util/exception";
import logger from "../../../util/logger";

export default class WalletService implements IWalletService {
  constructor(private walletRepository: IWalletRepository) {}
  async getWalletById(id: string): Promise<Wallet> {
    const wallet = await this.walletRepository.getWalletById(id);
    if (!wallet) throw new WalletNotFoundException(id);
    return wallet;
  }

  async getWalletsOfClient(clientId: string): Promise<Wallet[]> {
    const wallets = await this.walletRepository.getWalletsOfClient(clientId);
    return wallets;
  }

  async getWalletInfoById(id: string): Promise<ISanitizedWallet> {
    const wallet = await this.walletRepository.getWalletInfoById(id);
    if (!wallet) throw new WalletNotFoundException(id);
    return wallet;
  }

  async getAllWalletsInfoOfClient(
    clientId: string,
  ): Promise<ISanitizedWallet[]> {
    const wallets =
      await this.walletRepository.getAllWalletsInfoOfClient(clientId);
    return wallets;
  }

  async createWallet(rawWallet: IBaseWallet): Promise<ISanitizedWallet> {
    try {
      const wallet = new Wallet({
        ...rawWallet,
        balance: 0,
        transactionsSent: [],
        transactionsReceived: [],
      });
      const createdWallet = await this.walletRepository.createWallet(wallet);
      return createdWallet;
    } catch (error) {
      logger.error(error);
      if (error instanceof UniqueConstraintError) {
        // praticamente impossível de ocorrer, mas...
        throw new WalletAlreadyExistsException(rawWallet.id!);
      }
      if (error instanceof ForeignKeyError) {
        throw new InvalidWalletOwnerException({
          ...rawWallet,
          balance: 0,
          transactionsSent: [],
          transactionsReceived: [],
        });
      }
      throw new Error("Failed to create wallet");
    }
  }
}
