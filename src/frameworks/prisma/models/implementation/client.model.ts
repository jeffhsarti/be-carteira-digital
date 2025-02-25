import { Client, PrismaClient } from "@prisma/client";
import { IClient } from "../../../../core/interfaces/client.interface";
import IClientModel from "../client.model";

export default class ClientModel implements IClientModel {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Client | null> {
    return this.prisma.client.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }

  async create(data: IClient): Promise<Client> {
    return this.prisma.client.create({
      data: {
        id: data.id,
        email: data.email,
        name: data.name,
        password: data.password,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        wallets: { create: data.wallets },
      },
    });
  }
}
