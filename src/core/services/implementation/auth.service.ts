import IJWTClientData from "../../../core/interfaces/jwt.interface";
import IAuthService from "../auth.service";

import {
  JsonWebTokenError,
  sign,
  TokenExpiredError,
  verify,
} from "jsonwebtoken";
import { InvalidCredentialsError } from "../../../core/errors/auth.errors";
import {
  ExpiredTokenError,
  InvalidTokenError,
} from "../../../core/errors/jwt.errors";
import JWTMapper from "../../../core/mappers/jwt-mapper";
import { verifyPassword } from "../../../util/crypto";
import IClientService from "../client.service";

export default class AuthService implements IAuthService {
  constructor(private clientService: IClientService) {}

  async login(email: string, password: string): Promise<string> {
    const client = await this.clientService.getClientByEmail(email);
    const samePassword = await verifyPassword(password, client.password);
    if (!samePassword) {
      throw new InvalidCredentialsError("Invalid credentials.");
    }
    const token = sign(
      {
        id: client.id,
        email: client.email,
        name: client.name,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: Number(process.env.JWT_EXPIRES_IN) || "1h",
        audience: "fe-carteira-digital",
        issuer: "be-carteira-digital",
        subject: `client-${client.id}`,
      },
    );
    return token;
  }

  verifyAuthentication(token: string): IJWTClientData {
    try {
      // Verifica o token e decodifica as informações
      const decoded = verify(token, process.env.JWT_SECRET as string, {
        issuer: "be-carteira-digital",
        audience: "fe-carteira-digital",
      });
      return JWTMapper.mapJwtToClientData(decoded);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ExpiredTokenError("Expired Token");
      }
      if (error instanceof JsonWebTokenError) {
        throw new InvalidTokenError("Invalid Token");
      }
      throw new Error("Something went wrong while authenticating the user");
    }
  }
}
