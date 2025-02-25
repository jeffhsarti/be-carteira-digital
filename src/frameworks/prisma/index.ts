import { config } from "dotenv";
import IClientModel from "./models/client.model";
import IPrismaModels from "./models/models";

import concreteModels from "./models/implementation";
import inMemoryModels from "./models/in-memory";
import IWalletModel from "./models/wallet.model";

config();

class PrismaModels {
  private strategy: IPrismaModels;
  constructor() {
    if (process.env.NODE_ENV !== "test") {
      this.strategy = concreteModels;
    } else {
      this.strategy = inMemoryModels;
    }
  }

  getClientModel(): IClientModel {
    return this.strategy.client;
  }

  getWalletModel(): IWalletModel {
    return this.strategy.wallet;
  }
}

/* 
  O strategy pattern é interessante aqui pois podemos controlar os modelos de acordo com a necessidade.
  Nesse caso em particular, a escolha dos modelos depende do ambiente de execução, pois não queremos
  que o banco de dados real seja utilizado durante a execução dos testes.

  Isso também abre a possibilidade de substituir o strategy de maneira dinâmica (eu omiti o método 
  setStrategy e tornei o strategy private para garantir que isso não possa ocorrer durante o 
  desenvolvimento, mas a implementação fiel ao pattern deveria permitir), o que pode ser útil e ao 
  mesmo tempo problemático. No nosso contexto, as vantagens são maiores do que os problemas pois não 
  temos funcionalidades que dependam do ambiente, portanto não corremos o risco de a variável de ambiente 
  sofrer alterações durante os testes e causar inconsistências ou alterações em um banco real.
*/

const models = new PrismaModels();

export default models;
