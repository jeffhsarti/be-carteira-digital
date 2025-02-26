import {
  IBaseClient,
  ISanitizedClient,
} from "../../../../core/interfaces/client.interface";
import IClientService from "../../../../core/services/client.service";
import IClientController from "../client.controller";

export default class ClientController implements IClientController {
  constructor(private clientService: IClientService) {}
  async getAllClients(): Promise<ISanitizedClient[]> {
    return this.clientService.getAllClients();
  }

  async getClientById(id: string): Promise<ISanitizedClient> {
    return this.clientService.getClientById(id);
  }

  async createClient(client: IBaseClient): Promise<ISanitizedClient> {
    return this.clientService.createClient(client);
  }
}
