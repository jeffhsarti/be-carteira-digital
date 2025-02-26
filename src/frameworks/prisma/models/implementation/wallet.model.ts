import { PrismaClient, Wallet } from "@prisma/client";
import { Wallet as WalletEntity } from "../../../../core/entities/wallet.entity";
import IWalletModel from "../wallet.model";

export default class WalletModel implements IWalletModel {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Wallet | null> {
    return this.prisma.wallet.findUnique({
      where: { id },
    });
  }

  async findAllByClient(clientId: string): Promise<Wallet[]> {
    return this.prisma.wallet.findMany({
      where: { clientId },
    });
  }

  async create(data: WalletEntity): Promise<Wallet> {
    return this.prisma.wallet.create({
      data: {
        id: data.id,
        clientId: data.clientId,
        balance: 0,
      },
    });
  }
}
