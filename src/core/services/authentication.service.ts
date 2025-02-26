import IJWTClientData from "../interfaces/jwt.interface";

export default interface IAuthenticationService {
  login(email: string, password: string): Promise<string>;
  verifyAuthentication(token: string): IJWTClientData;
}
