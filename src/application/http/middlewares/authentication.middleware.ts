import IJWTClientData from "../../../core/interfaces/jwt.interface";

export default interface IAuthenticationMiddleware {
  authenticate(token: string): IJWTClientData;
}
