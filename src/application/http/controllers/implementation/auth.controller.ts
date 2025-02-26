import IAuthService from "../../../../core/services/auth.service";
import IAuthController from "../auth.controller";

export default class AuthController implements IAuthController {
  constructor(private authService: IAuthService) {}
  async login(email: string, password: string): Promise<string> {
    return this.authService.login(email, password);
  }
}
