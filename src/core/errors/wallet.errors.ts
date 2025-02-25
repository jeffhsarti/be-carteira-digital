import { IWallet } from "../../core/interfaces/wallet.interface";

export class WalletNotFoundException extends Error {
  constructor(id: string) {
    super(`Wallet with ID ${id} not found.`);
    this.name = "WalletNotFoundException";
  }
}

export class WalletAlreadyExistsException extends Error {
  constructor(walletId: string) {
    super(`Wallet with id ${walletId} already exists.`);
    this.name = "WalletAlreadyExistsException";
  }
}

export class InvalidWalletOwnerException extends Error {
  constructor(wallet: IWallet) {
    super(
      `Wallet could not be created because client ${wallet.clientId} is invalid.`,
    );
    this.name = "InvalidWalletException";
  }
}
