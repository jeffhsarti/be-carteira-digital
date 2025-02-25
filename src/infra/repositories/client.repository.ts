import { Client } from "../../core/entities/client.entity";

export interface IClientRepository {
  getById(id: string): Promise<Client | null>;
  getAll(): Promise<Client[]>;
  create(client: Client): Promise<Client>;
}
