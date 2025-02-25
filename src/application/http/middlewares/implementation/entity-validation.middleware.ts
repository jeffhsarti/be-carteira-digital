import Joi from "joi";
import IValidationMiddleware from "../entity-validation.middleware";

export class ValidationMiddleware implements IValidationMiddleware {
  constructor(private schema: Joi.Schema) {}

  validateRequest(data: any) {
    return this.schema.validate(data);
  }
}
