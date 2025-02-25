import models from "../../../frameworks/prisma";
import PrismaClientRepository from "./prisma-client.repository";
import PrismaWalletRepository from "./prisma-wallet.repository";

// Os repositórios aqui atuam mais como adapters do que repositories de fato.

export const clientRepository = new PrismaClientRepository(
  models.getClientModel(),
);

export const walletRepository = new PrismaWalletRepository(
  models.getWalletModel(),
);
