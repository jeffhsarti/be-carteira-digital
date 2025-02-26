import { JwtPayload } from "jsonwebtoken";

export default interface IJWTClientData extends JwtPayload {
  id: string;
  email: string;
  name: string;
}
