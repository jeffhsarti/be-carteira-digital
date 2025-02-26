import { AccessControl } from "accesscontrol";
import IAuthorizationService, { Action } from "../authorization.service";
import IClientService from "../client.service";
import IWalletService from "../wallet.service";

export default class AuthorizationService implements IAuthorizationService {
  constructor(
    private accessControl: AccessControl,
    private clientService: IClientService,
    private walletService: IWalletService,
  ) {}

  async canUserListClients(
    sensible: boolean,
    userId: string,
    action: Action,
    resource: string,
  ): Promise<boolean> {
    // outras validações podem ser realizadas aqui, como verificar se o client está ativo, etc.
    await this.clientService.getClientById(userId);
    const { granted, attributes } = this.accessControl
      .can("user")
      [action](resource);
    if (sensible && attributes.includes("non-sensitive-fields")) {
      return false;
    }
    return granted;
  }

  async canUserListWallets(
    sensible: boolean,
    clientId: string,
    action: Action,
    resource: string,
  ): Promise<boolean> {
    // outras validações podem ser realizadas aqui, como verificar se o client está ativo, etc.
    await this.clientService.getClientById(clientId);
    const { granted, attributes } = this.accessControl
      .can("user")
      [action](resource);
    if (sensible && attributes.includes("non-sensitive-fields")) {
      return false;
    }
    return granted;
  }

  async canUserPerformOnClient(
    userId: string,
    clientId: string,
    action: Action,
    resource: string,
  ): Promise<boolean> {
    // outras validações podem ser realizadas aqui, como verificar se o client está ativo, etc.
    const client = await this.clientService.getClientById(userId);
    if (client.id === clientId) {
      // futuramente, com a possibilidade de adição de roles de usuários,
      // podemos resgatar a role do usuário do banco e utilizar o accessControl
      return this.accessControl.can("user")[action](resource).granted;
    }
    return false;
  }

  async canUserPerformOnWallet(
    clientId: string,
    walletId: string,
    action: Action,
    resource: string,
  ): Promise<boolean> {
    // outras validações podem ser realizadas aqui, como verificar se o wallet está ativo, etc.

    // garante que o client existe
    const client = await this.clientService.getClientById(clientId);
    // garante que o wallet existe e pertence ao client
    const wallets = await this.walletService.getAllWalletsInfoOfClient(
      client.id,
    );
    if (wallets.some((wallet) => wallet.id === walletId)) {
      // futuramente, com a possibilidade de adição de roles de usuários,
      // podemos resgatar a role do usuário do banco e utilizar o accessControl
      return this.accessControl.can("user")[action](resource).granted;
    }
    return false;
  }
}
