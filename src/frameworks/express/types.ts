import { RequestHandler } from "express";
import { Action } from "../../core/services/authorization.service";

export type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

export interface ControllerAdapter {
  path: string;
  method: HttpMethod;
  beforeMiddlewares: RequestHandler[];
  handler: RequestHandler;
  afterMiddlewares: RequestHandler[];
}

export interface MiddlewareAdapter {
  execute: RequestHandler;
}

export interface AuthorizationMiddlewareAdapter {
  executeForListClient: (
    sensibleRoute: boolean,
    action: Action,
    resource: string,
  ) => RequestHandler;
  executeForListWallet: (
    sensibleRoute: boolean,
    action: Action,
    resource: string,
  ) => RequestHandler;
  executeForClientIdParam: (
    sensibleRoute: boolean,
    action: Action,
    resource: string,
  ) => RequestHandler;
  executeForWalletIdParam: (
    sensibleRoute: boolean,
    action: Action,
    resource: string,
  ) => RequestHandler;
}
