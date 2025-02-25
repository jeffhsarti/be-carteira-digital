import Joi from "joi";

export default interface IValidationMiddleware {
  validateRequest(data: any): Joi.ValidationResult;
}
