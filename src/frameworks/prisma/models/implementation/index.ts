import { prisma } from "../../../../frameworks/prisma/prisma-client";
import IPrismaModels from "../models";
import ClientModel from "./client.model";
import WalletModel from "./wallet.model";

const models: IPrismaModels = {
  client: new ClientModel(prisma),
  wallet: new WalletModel(prisma),
};

export default models;
