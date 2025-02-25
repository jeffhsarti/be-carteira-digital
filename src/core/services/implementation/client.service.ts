import { Client } from "../../../core/entities/client.entity";
import {
  IBaseClient,
  IClient,
  ISanitizedClient,
} from "../../../core/interfaces/client.interface";
import ClientSanitizer from "../../../core/mappers/client-sanitizer";
import { IClientRepository } from "../../../infra/repositories/client.repository";
import IClientService from "../client.service";
import IWalletService from "../wallet.service";

import {
  ClientAlreadyExistsException,
  ClientNotFoundException,
} from "../../../core/errors/client.errors";
import { UniqueConstraintError } from "../../../util/exception";
import { hashPassword } from "../../../util/crypto";

export default class ClientService implements IClientService {
  constructor(
    private clientRepository: IClientRepository,
    private walletService: IWalletService,
  ) {}

  async getClientById(id: string): Promise<ISanitizedClient> {
    const data = await this.clientRepository.getById(id);
    if (!data) throw new ClientNotFoundException(id);
    return ClientSanitizer.sanitize(data);
  }

  async getAllClients(): Promise<ISanitizedClient[]> {
    const data = await this.clientRepository.getAll();
    return data.map((item) => ClientSanitizer.sanitize(item));
  }

  async createClient(rawClient: IBaseClient): Promise<ISanitizedClient> {
    try {
      const client = new Client(rawClient as IClient);
      const hashedPassword = await hashPassword(rawClient.password);
      client.password = hashedPassword;
      const data = await this.clientRepository.create(client);
      await this.walletService.createWallet({
        clientId: data.id,
      });
      return ClientSanitizer.sanitize(data);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new ClientAlreadyExistsException(rawClient.email);
      }
      console.log(error);
      throw new Error("Failed to create client");
    }
  }
}
