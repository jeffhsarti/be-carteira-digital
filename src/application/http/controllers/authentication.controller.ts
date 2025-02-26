export default interface IAuthController {
  login(email: string, password: string): Promise<string>;
}
