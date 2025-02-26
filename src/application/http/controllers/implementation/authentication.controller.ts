import IAuthenticationService from "../../../../core/services/authentication.service";
import IAuthController from "../authentication.controller";

export default class AuthController implements IAuthController {
  constructor(private authService: IAuthenticationService) {}
  async login(email: string, password: string): Promise<string> {
    return this.authService.login(email, password);
  }
}
