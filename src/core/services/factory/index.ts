import IClientService from "../client.service";
import ClientService from "../implementation/client.service";
import IWalletService from "../wallet.service";
import WalletService from "../implementation/wallet.service";

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
}
