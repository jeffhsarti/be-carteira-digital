import { Wallet } from "../../core/entities/wallet.entity";
import { ISanitizedWallet } from "../../core/interfaces/wallet.interface";

export default class WalletSanitizer {
  static sanitize(wallet: Wallet): ISanitizedWallet {
    return {
      id: wallet.id,
      clientId: wallet.clientId,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
    };
  }
}
