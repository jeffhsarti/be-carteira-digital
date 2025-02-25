import { Client } from "../../../core/entities/client.entity";
import { IClient } from "../../../core/interfaces/client.interface";
import IClientModel from "../../../frameworks/prisma/models/client.model";
import { IClientRepository } from "../client.repository";

export default class PrismaClientRepository implements IClientRepository {
  constructor(private clientModel: IClientModel) {}
  async getById(id: string): Promise<Client | null> {
    const data = await this.clientModel.findById(id);
    if (!data) return null;
    return new Client(data as IClient);
  }

  async getAll(): Promise<Client[]> {
    const data = await this.clientModel.findAll();
    return data.map((item) => new Client(item as IClient));
  }

  async create(client: Client): Promise<Client> {
    const data = await this.clientModel.create(client);
    return new Client(data as IClient);
  }
}
