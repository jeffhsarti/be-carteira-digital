import {
  IBaseClient,
  ISanitizedClient,
} from "../../core/interfaces/client.interface";

export default interface IClientService {
  getClientById(id: string): Promise<ISanitizedClient>;
  getAllClients(): Promise<ISanitizedClient[]>;
  createClient(client: IBaseClient): Promise<ISanitizedClient>;
}
