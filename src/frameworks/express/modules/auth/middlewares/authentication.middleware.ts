import { NextFunction, Request, Response } from "express";
import IAuthenticationMiddleware from "../../../../../application/http/middlewares/authentication.middleware";
import {
  ExpiredTokenError,
  InvalidTokenError,
} from "../../../../../core/errors/jwt.errors";
import logger from "../../../../../util/logger";
import { MiddlewareAdapter } from "../../../types";

export class ExpressAuthenticationMiddleware implements MiddlewareAdapter {
  constructor(private middleware: IAuthenticationMiddleware) {}

  execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { headers } = req;
      const token = headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ message: "Token is required" });
      }

      const client = this.middleware.authenticate(token);
      req.user = client;
      return next();
    } catch (error) {
      if (error instanceof Error) {
        logger.error("ExpressAuthenticationMiddlewareError: " + error.message);
      }
      if (error instanceof ExpiredTokenError) {
        return res.status(401).json({ message: "Expired token" });
      }
      if (error instanceof InvalidTokenError) {
        return res.status(400).json({ message: "Invalid token" });
      }
      return res.status(500).json({
        message: "Unable to validate and/or retrieve your token data",
      });
    }
  }
}
