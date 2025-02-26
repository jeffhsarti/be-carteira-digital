import { Wallet } from "@prisma/client";
import { Wallet as WalletEntity } from "../../../core/entities/wallet.entity";
import {
  ISanitizedWallet,
  IWallet,
} from "../../../core/interfaces/wallet.interface";
import WalletSanitizer from "../../../core/mappers/wallet-sanitizer";

export default class WalletMapper {
  static mapToSanitizedWallet(wallet: Wallet): ISanitizedWallet {
    return WalletSanitizer.sanitize(WalletMapper.mapToWalletEntity(wallet));
  }

  static mapToWalletEntity(wallet: Wallet): WalletEntity {
    return new WalletEntity({
      id: wallet.id,
      clientId: wallet.clientId,
      balance: wallet.balance.toNumber(),
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
    } as IWallet);
  }
}
