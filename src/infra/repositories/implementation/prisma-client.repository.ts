import { Client } from "../../../core/entities/client.entity";
import { IPartialClient } from "../../../core/interfaces/client.interface";
import ClientMapper from "../../../frameworks/prisma/mappers/client.mapper";
import IClientModel from "../../../frameworks/prisma/models/client.model";
import { IClientRepository } from "../client.repository";

export default class PrismaClientRepository implements IClientRepository {
  constructor(private clientModel: IClientModel) {}
  async getById(id: string): Promise<Client | null> {
    const data = await this.clientModel.findById(id);
    if (!data) return null;
    return ClientMapper.mapToClientEntity(data);
  }

  async getByEmail(email: string): Promise<IPartialClient | null> {
    const data = await this.clientModel.findByEmail(email);
    if (!data) return null;
    return ClientMapper.mapToPartialClient(data);
  }

  async getAll(): Promise<Client[]> {
    const data = await this.clientModel.findAll();
    return data.map((client) => ClientMapper.mapToClientEntity(client));
  }

  async create(client: Client): Promise<Client> {
    const data = await this.clientModel.create(client);
    return ClientMapper.mapToClientEntity(data);
  }
}
