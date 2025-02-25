import Joi from "joi";

export const createClientSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .max(16)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required(),
});

export const getClientByIdSchema = Joi.object({
  clientId: Joi.string().uuid({ version: "uuidv4" }).required(),
});
