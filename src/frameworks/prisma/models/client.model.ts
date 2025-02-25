import { Client } from "@prisma/client";
import { IClient } from "../../../core/interfaces/client.interface";

export default interface IClientModel {
  findById(id: string): Promise<Client | null>;
  findAll(): Promise<Client[]>;
  create(data: IClient): Promise<Client>;
}
