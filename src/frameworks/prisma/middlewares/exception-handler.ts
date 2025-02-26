import { Prisma } from "@prisma/client";
import {
  ForeignKeyError,
  ObjectNotFoundError,
  UniqueConstraintError,
} from "../../../util/exception";

export function handleException(error: Prisma.PrismaClientKnownRequestError) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    error.message = `Erro Prisma: ${error.message}`;
    switch (error.code) {
      case "P2002":
        throw new UniqueConstraintError(error.message);
      case "P2003":
        throw new ForeignKeyError(error.message);
      case "P2025":
        throw new ObjectNotFoundError(error.message);
      default:
        throw error;
    }
  }
  throw error; // Lança outros erros normalmente
}
