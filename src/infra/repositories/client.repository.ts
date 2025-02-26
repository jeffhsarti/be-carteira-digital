import { IPartialClient } from "../../core/interfaces/client.interface";
import { Client } from "../../core/entities/client.entity";

export interface IClientRepository {
  getById(id: string): Promise<Client | null>;
  getByEmail(email: string): Promise<IPartialClient | null>;
  getAll(): Promise<Client[]>;
  create(client: Client): Promise<Client>;
}
