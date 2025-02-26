import IAuthService from "../auth.service";
import IClientService from "../client.service";
import AuthService from "../implementation/auth.service";
import ClientService from "../implementation/client.service";
import WalletService from "../implementation/wallet.service";
import IWalletService from "../wallet.service";

import { IClientRepository } from "../../../infra/repositories/client.repository";
import { IWalletRepository } from "../../../infra/repositories/wallet.repository";

export default class ServiceFactory {
  constructor(
    private clientRepository: IClientRepository,
    private walletRepository: IWalletRepository,
  ) {}

  createClientService(): IClientService {
    return new ClientService(this.clientRepository, this.createWalletService());
  }

  createWalletService(): IWalletService {
    return new WalletService(this.walletRepository);
  }

  createAuthService(): IAuthService {
    return new AuthService(this.createClientService());
  }
}
