import {
  IBaseClient,
  ISanitizedClient,
} from "../../../core/interfaces/client.interface";

export default interface IClientController {
  getAllClients(): Promise<ISanitizedClient[]>;
  getClientById(id: string): Promise<ISanitizedClient | null>;
  createClient(client: IBaseClient): Promise<ISanitizedClient>;
}
