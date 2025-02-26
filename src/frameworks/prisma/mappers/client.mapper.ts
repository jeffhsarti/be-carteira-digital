import { Client } from "@prisma/client";
import { Client as ClientEntity } from "../../../core/entities/client.entity";
import {
  IClient,
  IPartialClient,
  ISanitizedClient,
} from "../../../core/interfaces/client.interface";
import ClientSanitizer from "../../../core/mappers/client-sanitizer";

export default class ClientMapper {
  static mapToSanitizedClient(client: Client): ISanitizedClient {
    return ClientSanitizer.sanitize(ClientMapper.mapToClientEntity(client));
  }

  static mapToClientEntity(client: Client): ClientEntity {
    return new ClientEntity({
      ...client,
    } as IClient);
  }

  static mapToPartialClient(client: Client): IPartialClient {
    const clientEntity = ClientMapper.mapToClientEntity(client);
    return {
      id: clientEntity.id,
      name: clientEntity.name,
      email: clientEntity.email,
      password: clientEntity.password,
    };
  }
}
