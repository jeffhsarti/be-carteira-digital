import { AccessControl } from "accesscontrol";
import IAuthenticationService from "../authentication.service";
import IAuthorizationService from "../authorization.service";
import IClientService from "../client.service";
import AuthenticationService from "../implementation/authentication.service";
import AuthorizationService from "../implementation/authorization.service";
import ClientService from "../implementation/client.service";
import WalletService from "../implementation/wallet.service";
import IWalletService from "../wallet.service";

import { IClientRepository } from "../../../infra/repositories/client.repository";
import { IWalletRepository } from "../../../infra/repositories/wallet.repository";

export default class ServiceFactory {
  constructor(
    private clientRepository: IClientRepository,
    private walletRepository: IWalletRepository,
    private accessControl: AccessControl,
  ) {}

  createClientService(): IClientService {
    return new ClientService(this.clientRepository, this.createWalletService());
  }

  createWalletService(): IWalletService {
    return new WalletService(this.walletRepository);
  }

  createAuthenticationService(): IAuthenticationService {
    return new AuthenticationService(this.createClientService());
  }

  createAuthorizationService(): IAuthorizationService {
    return new AuthorizationService(
      this.accessControl,
      this.createClientService(),
      this.createWalletService(),
    );
  }
}
