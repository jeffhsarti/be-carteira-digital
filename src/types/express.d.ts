import IJWTClientData from "../core/interfaces/jwt.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IJWTClientData;
    }
  }
}
