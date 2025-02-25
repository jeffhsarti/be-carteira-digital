import { Request, Response } from "express";
import {
  ClientNotFoundException,
  ClientAlreadyExistsException,
} from "../../../../../core/errors/client.errors";

import IClientController from "../../../../../application/http/controllers/client.controller";
import logger from "../../../../../util/logger";

const DEFAULT_ERROR_MESSAGE =
  "An unexpected error occurred. Please try again later.";

export class ExpressClientControllerAdapter {
  constructor(private clientController: IClientController) {}

  createClient = async (req: Request, res: Response) => {
    try {
      const clientData = req.body;
      const client = await this.clientController.createClient(clientData);
      return res.status(201).json(client);
    } catch (error) {
      return handleError(error, res);
    }
  };

  getClientById = async (req: Request, res: Response) => {
    try {
      const clientId = req.params.clientId;
      const client = await this.clientController.getClientById(clientId);
      return res.json(client);
    } catch (error) {
      return handleError(error, res);
    }
  };

  getAllClients = async (req: Request, res: Response) => {
    try {
      const clients = await this.clientController.getAllClients();
      return res.json(clients);
    } catch (error) {
      return handleError(error, res);
    }
  };
}

function handleError(error: any, res: Response) {
  logger.error("Error:", error.message);
  if (error instanceof ClientNotFoundException) {
    return res.status(404).json({ message: error.message });
  } else if (error instanceof ClientAlreadyExistsException) {
    return res.status(400).json({ message: error.message });
  } else {
    console.error("Unexpected error:", error);
    return res.status(500).json({ message: DEFAULT_ERROR_MESSAGE });
  }
}
