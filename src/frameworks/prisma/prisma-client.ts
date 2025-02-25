import { PrismaClient } from "@prisma/client";
import configureMiddlewares from "./middlewares";

class PrismaClientSingleton {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaClientSingleton.instance) {
      PrismaClientSingleton.instance = new PrismaClient();
      /*
        Único motivo que sustenta a necessidade da implementação 
        de uma classe com Singleton Pattern é para garantir que
        os middlewares sejam configurados apenas uma vez e não
        precisarmos recriálos para cada nova instância do PrismaClient.

        Se não fosse por esse motivo, você poderia simplesmente
        instanciar o PrismaClient diretamente e exportá-lo no arquivo index.ts.
      */
      configureMiddlewares(PrismaClientSingleton.instance);
    }
    return PrismaClientSingleton.instance;
  }
}

export const prisma = PrismaClientSingleton.getInstance();
