import { Client } from "../../core/entities/client.entity";
import { ISanitizedClient } from "../../core/interfaces/client.interface";
import WalletSanitizer from "./wallet-sanitizer";

export default class ClientSanitizer {
  static sanitize(client: Client): ISanitizedClient {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      wallets: client.wallets.map((wallet) => WalletSanitizer.sanitize(wallet)),
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
