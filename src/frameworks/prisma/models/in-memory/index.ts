import IPrismaModels from "../models";
import ClientModel from "./client.model";
import WalletModel from "./wallet.model";

const models: IPrismaModels = {
  client: new ClientModel(),
  wallet: new WalletModel(),
};

export default models;
