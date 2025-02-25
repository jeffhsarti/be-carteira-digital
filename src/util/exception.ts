import { ValidationErrorItem } from "joi";

export class UniqueConstraintError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UniqueConstraintError";
  }
}

export class ForeignKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ForeignKeyError";
  }
}

export class ObjectNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ObjectNotFoundError";
  }
}

export abstract class InvalidEntityException extends Error {
  constructor(protected details: ValidationErrorItem[]) {
    super("Invalid entity data");
    this.name = "InvalidEntityException";
  }

  abstract toJson(): Record<string, any>;
}

export class ValidationException extends InvalidEntityException {
  constructor(details: ValidationErrorItem[]) {
    super(details);
    this.name = "ValidationException";
  }

  toJson() {
    return {
      message: this.message,
      details: this.details.map((d) => ({
        type: d.type,
        field: d.path.join("."),
        message: d.message,
      })),
    };
  }
}
