import { Wallet } from "../../../core/entities/wallet.entity";
import { ISanitizedWallet } from "../../../core/interfaces/wallet.interface";
import WalletMapper from "../../../frameworks/prisma/mappers/wallet.mapper";
import IWalletModel from "../../../frameworks/prisma/models/wallet.model";
import { IWalletRepository } from "../wallet.repository";

/*
  Nota: estou usando um mapper nesse repositório para demonstrar que a conversão
  de dados é feita com base na necessidade do framework e do modelo de dados que 
  você está utilizando e não necessita ser feita apenas na camada de domínio.
  O ideal é que a camada de domínio não dependa de frameworks, apenas de transações
  com as próprias entidades.
  Ainda assim, em certos casos, é perfeitamente possível deixar que os services
  chamem mappers para conversão de dados.
*/

export default class PrismaWalletRepository implements IWalletRepository {
  constructor(private walletModel: IWalletModel) {}
  async getWalletById(id: string): Promise<Wallet | null> {
    const data = await this.walletModel.findById(id);
    if (!data) return null;
    return WalletMapper.mapToWalletEntity(data);
  }
  async getWalletsOfClient(clientId: string): Promise<Wallet[]> {
    const data = await this.walletModel.findAllByClient(clientId);
    return data.map((wallet) => WalletMapper.mapToWalletEntity(wallet));
  }
  async getWalletInfoById(id: string): Promise<ISanitizedWallet | null> {
    const data = await this.walletModel.findById(id);
    if (!data) return null;
    return WalletMapper.mapToSanitizedWallet(data);
  }
  async getAllWalletsInfoOfClient(
    clientId: string,
  ): Promise<ISanitizedWallet[]> {
    const data = await this.walletModel.findAllByClient(clientId);
    return data.map((wallet) => WalletMapper.mapToSanitizedWallet(wallet));
  }
  async createWallet(wallet: Wallet): Promise<ISanitizedWallet> {
    const data = await this.walletModel.create(wallet);
    return WalletMapper.mapToSanitizedWallet(data);
  }
}
