import { Request, Response } from "express";

import IAuthController from "../../../../../application/http/controllers/auth.controller";
import { InvalidCredentialsError } from "../../../../../core/errors/auth.errors";
import { ClientNotFoundException } from "../../../../../core/errors/client.errors";
import logger from "../../../../../util/logger";

export class ExpressAuthenticationControllerAdapter {
  constructor(private authController: IAuthController) {}

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const token = await this.authController.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return handleError(error, res);
    }
  };
}

function handleError(error: any, res: Response) {
  logger.error("ExpressAuthenticationControllerAdapterError:", error.message);
  if (error instanceof ClientNotFoundException) {
    return res.status(404).json({ message: "Invalid credentials" });
  }
  if (error instanceof InvalidCredentialsError) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  console.error("Unexpected error:", error);
  return res.status(500).json({
    message: "Unable to authenticate due to an unknown server error.",
  });
}
