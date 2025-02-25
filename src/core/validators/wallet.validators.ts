import Joi from "joi";

export const createWalletSchema = Joi.object({
  clientId: Joi.string().uuid({ version: "uuidv4" }).required(),
});

export const getWalletByWalletIdSchema = Joi.object({
  walletId: Joi.string().uuid({ version: "uuidv4" }).required(),
});
