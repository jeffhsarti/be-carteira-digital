import { JwtPayload } from "jsonwebtoken";
import { InvalidTokenError } from "../errors/jwt.errors";
import IJWTClientData from "../interfaces/jwt.interface";

export default class JWTMapper {
  static mapJwtToClientData(raw: string | JwtPayload): IJWTClientData {
    try {
      if (typeof raw === "string") {
        const payload = JSON.parse(raw);
        return {
          id: payload.id,
          email: payload.email,
          name: payload.name,
        } as IJWTClientData;
      } else {
        return raw as IJWTClientData;
      }
    } catch (error) {
      throw new InvalidTokenError(
        "Invalid token format or invalid jwt.verify output.",
      );
    }
  }
}
