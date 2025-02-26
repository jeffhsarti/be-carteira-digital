import IJWTClientData from "../../../../core/interfaces/jwt.interface";
import IAuthenticationService from "../../../../core/services/authentication.service";
import IAuthenticationMiddleware from "../authentication.middleware";

export class AuthenticationMiddleware implements IAuthenticationMiddleware {
  constructor(private authService: IAuthenticationService) {}
  authenticate(token: string): IJWTClientData {
    return this.authService.verifyAuthentication(token);
  }
}
