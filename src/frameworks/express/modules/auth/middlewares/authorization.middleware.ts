import { NextFunction, Request, RequestHandler, Response } from "express";
import { Action } from "../../../../../core/services/authorization.service";
import IAuthorizationMiddleware from "../../../../../application/http/middlewares/authorization.middleware";
import logger from "../../../../../util/logger";
import { AuthorizationMiddlewareAdapter } from "../../../types";
import { UnauthorizedError } from "../../../../../core/errors/authorization.errors";

/*
  O que queremos aqui é garantir que o usuário autenticado seja
  autorizado a realizar ações de leitura de dados sensíveis
  e escrita apenas em seus próprios recursos.
  Para isso, precisamos garantir que o user autenticado esteja 
  consumindo um recurso próprio, via param :clientId por exemplo.
  Nesses casos, verificamos se o user autenticado tem permissão
  via ac ao recurso solicitado.

  Caso não seja um recurso próprio, verificamos se o contexto
  da requisição expõe dados sensíveis ou não. Caso não exponha,
  podemos verificar via ac se o usuário tem acesso ao recurso e
  deixamos que os services lidem com o restante das validações.

  Caso contrário, retornamos um status 403 (Forbidden).
  */
export class ExpressAuthorizationMiddleware
  implements AuthorizationMiddlewareAdapter
{
  constructor(private middleware: IAuthorizationMiddleware) {}

  executeForListClient = (
    sensibleRoute: boolean,
    action: Action,
    resource: string,
  ): RequestHandler => {
    const middleware = this.middleware;
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { user } = req;
        const authorized = await middleware.authorizeForClientConsultContext(
          sensibleRoute,
          user!.id,
          action,
          resource,
        );
        if (authorized) {
          return next();
        }
      } catch (error) {
        if (error instanceof Error) {
          logger.error("ExpressAuthorizationMiddlewareError: " + error.message);
        }
        if (error instanceof UnauthorizedError) {
          return res.status(403).json({ message: error.message });
        }
        return res.status(500).json({
          message: "Unable to authorize the usage of this resource.",
        });
      }
    };
  };

  executeForListWallet = (
    sensibleRoute: boolean,
    action: Action,
    resource: string,
  ): RequestHandler => {
    const middleware = this.middleware;
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { user } = req;
        const { clientId } = req.params;
        const authorized = await middleware.authorizeForWalletConsultContext(
          sensibleRoute,
          user!.id,
          clientId,
          action,
          resource,
        );
        if (authorized) {
          return next();
        }
      } catch (error) {
        if (error instanceof Error) {
          logger.error("ExpressAuthorizationMiddlewareError: " + error.message);
        }
        if (error instanceof UnauthorizedError) {
          return res.status(403).json({ message: error.message });
        }
        return res.status(500).json({
          message: "Unable to authorize the usage of this resource.",
        });
      }
    };
  };

  executeForClientIdParam = (
    sensibleRoute: boolean,
    action: Action,
    resource: string,
  ): RequestHandler => {
    const middleware = this.middleware;
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { user } = req;
        const { clientId } = req.params;
        const authorized = await middleware.authorizeForClientContext(
          sensibleRoute,
          clientId,
          user!.id,
          action,
          resource,
        );
        if (authorized) {
          return next();
        }
      } catch (error) {
        if (error instanceof Error) {
          logger.error("ExpressAuthorizationMiddlewareError: " + error.message);
        }
        if (error instanceof UnauthorizedError) {
          return res.status(403).json({ message: error.message });
        }
        return res.status(500).json({
          message: "Unable to authorize the usage of this resource.",
        });
      }
    };
  };

  executeForWalletIdParam = (
    sensibleRoute: boolean,
    action: Action,
    resource: string,
  ): RequestHandler => {
    const middleware = this.middleware;
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { user } = req;
        const { clientId, walletId } = req.params;
        const authorized = await middleware.authorizeForWalletContext(
          sensibleRoute,
          clientId,
          walletId,
          user!.id,
          action,
          resource,
        );
        if (authorized) {
          return next();
        }
      } catch (error) {
        if (error instanceof Error) {
          logger.error("ExpressAuthorizationMiddlewareError: " + error.message);
        }
        if (error instanceof UnauthorizedError) {
          return res.status(403).json({ message: error.message });
        }
        return res.status(500).json({
          message: "Unable to authorize the usage of this resource.",
        });
      }
    };
  };
}
