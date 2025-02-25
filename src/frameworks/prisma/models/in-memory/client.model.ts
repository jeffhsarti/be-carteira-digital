import { Client } from "@prisma/client";
import { IClient } from "../../../../core/interfaces/client.interface";
import IClientModel from "../client.model";

export default class InMemoryClientModel implements IClientModel {
  // Vetor interno para simular a tabela de clients
  private clients: Client[] = [];

  // Permite inicializar com dados pré-existentes, se desejado
  constructor(initialClients?: Client[]) {
    if (initialClients) {
      this.clients = initialClients;
    }
  }

  async findById(id: string): Promise<Client | null> {
    const client = this.clients.find((client) => client.id === id);
    // Retorna uma cópia para simular o comportamento de uma query
    return client ? { ...client } : null;
  }

  async findAll(): Promise<Client[]> {
    // Retorna uma cópia do array
    return [...this.clients];
  }

  async create(data: IClient): Promise<Client> {
    // Cria um novo objeto Client baseado nos dados fornecidos
    const newClient: Client = {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      wallets: data.wallets,
    } as Client;

    // Adiciona o novo cliente no array interno
    this.clients.push(newClient);
    return newClient;
  }
}
