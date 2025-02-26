import IAuthorizationMiddleware from "../authorization.middleware";

import IAuthorizationService, {
  Action,
} from "../../../../core/services/authorization.service";
import { UnauthorizedError } from "../../../../core/errors/authorization.errors";

export default class AuthorizationMiddleware
  implements IAuthorizationMiddleware
{
  constructor(private authorizationService: IAuthorizationService) {}

  async authorizeForClientConsultContext(
    sensible: boolean,
    userId: string,
    action: Action,
    resource: string,
  ): Promise<boolean> {
    const authorized = await this.authorizationService.canUserListClients(
      sensible,
      userId,
      action,
      resource,
    );
    if (!authorized) {
      this.rejectUnauthorized(userId, action, resource, `client: ${userId}`);
    }
    return true;
  }

  async authorizeForWalletConsultContext(
    sensible: boolean,
    userId: string,
    clientId: string,
    action: Action,
    resource: string,
  ): Promise<boolean> {
    if (sensible && clientId !== userId) {
      this.rejectUnauthorized(userId, action, resource, `client: ${clientId}`);
    }
    const authorized = await this.authorizationService.canUserListWallets(
      sensible,
      clientId,
      action,
      resource,
    );
    if (!authorized) {
      this.rejectUnauthorized(userId, action, resource, `client: ${userId}`);
    }
    return true;
  }

  async authorizeForClientContext(
    sensible: boolean,
    clientId: string,
    userId: string,
    action: Action,
    resource: string,
  ): Promise<boolean> {
    if (sensible && clientId !== userId) {
      this.rejectUnauthorized(userId, action, resource, `client: ${clientId}`);
    }
    const authorized = await this.authorizationService.canUserPerformOnClient(
      clientId,
      userId,
      action,
      resource,
    );
    if (!authorized) {
      this.rejectUnauthorized(userId, action, resource, `client: ${clientId}`);
    }
    return true;
  }

  async authorizeForWalletContext(
    sensible: boolean,
    clientId: string,
    walletId: string,
    userId: string,
    action: Action,
    resource: string,
  ): Promise<boolean> {
    if (sensible && clientId !== userId) {
      this.rejectUnauthorized(
        userId,
        action,
        resource,
        `client: ${clientId} wallet ${walletId}`,
      );
    }
    const authorized = await this.authorizationService.canUserPerformOnWallet(
      clientId,
      walletId,
      action,
      resource,
    );
    if (!authorized) {
      this.rejectUnauthorized(
        userId,
        action,
        resource,
        `client: ${clientId} wallet ${walletId}`,
      );
    }
    return true;
  }

  private rejectUnauthorized(
    userId: string,
    action: Action,
    resource: string,
    asset: any,
  ): void {
    throw new UnauthorizedError(
      `User ${userId} is not authorized to perform ${action} on ${resource} for asset ${asset}`,
    );
  }
}
