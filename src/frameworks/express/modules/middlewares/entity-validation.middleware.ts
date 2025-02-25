import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import IValidationMiddleware from "../../../../application/http/middlewares/entity-validation.middleware";
import { InvalidEntityException } from "../../../../util/exception";
import { MiddlewareAdapter } from "../../types";

export class ExpressBodyEntityValidationAdapter implements MiddlewareAdapter {
  constructor(
    private middleware: IValidationMiddleware,
    // Esse hack é um dos meus favoritos de TypeScript. ;)
    // uma explicação mais detalhada em src/frameworks/express/modules/client/index.ts
    private ExceptionType: new (
      details: Joi.ValidationErrorItem[],
    ) => InvalidEntityException,
  ) {}

  execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const { error } = this.middleware.validateRequest(body);
      if (error) {
        throw new this.ExceptionType(error.details);
      }
      return next();
    } catch (error) {
      if (error instanceof this.ExceptionType) {
        return res.status(400).json({
          error: "Dados inválidos.",
          details: error.toJson(),
        });
      }
      return res.status(500).json({ error: "Ocorreu um erro inesperado." });
    }
  }
}

export class ExpressParamsEntityValidationAdapter implements MiddlewareAdapter {
  constructor(
    private middleware: IValidationMiddleware,
    private ExceptionType: new (
      details: Joi.ValidationErrorItem[],
    ) => InvalidEntityException,
  ) {}

  execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { params } = req;
      const { error } = this.middleware.validateRequest(params);
      if (error) {
        throw new this.ExceptionType(error.details);
      }
      return next();
    } catch (error) {
      if (error instanceof this.ExceptionType) {
        return res.status(400).json({
          error: "Parâmetros inválidos.",
          details: error.toJson(),
        });
      }
      return res.status(500).json({ error: "Ocorreu um erro inesperado." });
    }
  }
}
