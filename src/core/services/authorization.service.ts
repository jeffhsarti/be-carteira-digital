export type Action =
  | "createAny"
  | "createOwn"
  | "readAny"
  | "readOwn"
  | "updateAny"
  | "updateOwn"
  | "deleteAny"
  | "deleteOwn";

export default interface IAuthorizationService {
  canUserListClients(
    sensible: boolean,
    userId: string,
    action: Action,
    resource: string,
  ): Promise<boolean>;
  canUserListWallets(
    sensible: boolean,
    clientId: string,
    action: Action,
    resource: string,
  ): Promise<boolean>;
  canUserPerformOnClient(
    userId: string,
    clientId: string,
    action: Action,
    resource: string,
  ): Promise<boolean>;
  canUserPerformOnWallet(
    clientId: string,
    walletId: string,
    action: Action,
    resource: string,
  ): Promise<boolean>;
}
