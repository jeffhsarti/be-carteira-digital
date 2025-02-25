import { prisma } from "../../../../frameworks/prisma/prisma-client";
import ClientModel from "./client.model";
import WalletModel from "./wallet.model";
import IPrismaModels from "../models";

const models: IPrismaModels = {
  client: new ClientModel(prisma),
  wallet: new WalletModel(prisma),
};

export default models;
