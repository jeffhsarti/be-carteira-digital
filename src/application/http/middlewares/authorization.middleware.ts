import { Action } from "../../../core/services/authorization.service";

export default interface IAuthorizationMiddleware {
  authorizeForClientConsultContext(
    sensible: boolean,
    userId: string,
    action: Action,
    resource: string,
  ): Promise<boolean>;
  authorizeForWalletConsultContext(
    sensible: boolean,
    userId: string,
    clientId: string,
    action: Action,
    resource: string,
  ): Promise<boolean>;
  authorizeForClientContext(
    sensible: boolean,
    clientId: string,
    userId: string,
    action: Action,
    resource: string,
  ): Promise<boolean>;
  authorizeForWalletContext(
    sensible: boolean,
    clientId: string,
    walletId: string,
    userId: string,
    action: Action,
    resource: string,
  ): Promise<boolean>;
}
