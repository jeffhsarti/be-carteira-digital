import IJWTClientData from "../interfaces/jwt.interface";

export default interface IAuthService {
  login(email: string, password: string): Promise<string>;
  verifyAuthentication(token: string): IJWTClientData;
}
