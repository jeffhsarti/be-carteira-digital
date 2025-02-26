import IJWTClientData from "../../../../core/interfaces/jwt.interface";
import IAuthService from "../../../../core/services/auth.service";
import IAuthenticationMiddleware from "../authentication.middleware";

export class AuthenticationMiddleware implements IAuthenticationMiddleware {
  constructor(private authService: IAuthService) {}
  authenticate(token: string): IJWTClientData {
    return this.authService.verifyAuthentication(token);
  }
}
