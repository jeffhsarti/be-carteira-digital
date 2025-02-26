import { Request, Response } from "express";
import {
  InvalidWalletOwnerException,
  WalletAlreadyExistsException,
  WalletNotFoundException,
} from "../../../../../core/errors/wallet.errors";

import IWalletController from "../../../../../application/http/controllers/wallet.controller";
import logger from "../../../../../util/logger";

const DEFAULT_ERROR_MESSAGE =
  "An unexpected error occurred. Please try again later.";

export class ExpressWalletControllerAdapter {
  constructor(private walletController: IWalletController) {}

  createWallet = async (req: Request, res: Response) => {
    try {
      const { clientId } = req.params;
      const wallet = await this.walletController.createWallet({ clientId });
      return res.status(201).json(wallet);
    } catch (error) {
      return handleError(error, res);
    }
  };

  getWalletById = async (req: Request, res: Response) => {
    try {
      const { walletId } = req.params;
      const wallet = await this.walletController.getWalletById(walletId);
      return res.json(wallet);
    } catch (error) {
      return handleError(error, res);
    }
  };
  getWalletInfoById = async (req: Request, res: Response) => {
    try {
      const { walletId } = req.params;
      const walletInfo =
        await this.walletController.getWalletInfoById(walletId);
      return res.json(walletInfo);
    } catch (error) {
      return handleError(error, res);
    }
  };
  getWalletsOfClient = async (req: Request, res: Response) => {
    try {
      const { clientId } = req.params;
      const wallets = await this.walletController.getWalletsOfClient(clientId);
      return res.json(wallets);
    } catch (error) {
      handleError(error, res);
    }
  };
  getAllWalletsInfoOfClient = async (req: Request, res: Response) => {
    try {
      const { clientId } = req.params;
      const walletsInfo =
        await this.walletController.getAllWalletsInfoOfClient(clientId);
      return res.json(walletsInfo);
    } catch (error) {
      handleError(error, res);
    }
  };
}

function handleError(error: any, res: Response) {
  logger.error("ExpressWalletControllerAdapter:", error.message);
  if (error instanceof WalletNotFoundException) {
    return res.status(404).json({ message: error.message });
  } else if (
    error instanceof InvalidWalletOwnerException ||
    error instanceof WalletAlreadyExistsException
  ) {
    return res.status(400).json({ message: error.message });
  } else {
    console.error("Unexpected error:", error);
    return res.status(500).json({ message: DEFAULT_ERROR_MESSAGE });
  }
}
