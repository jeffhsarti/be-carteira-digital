import IClientModel from "./client.model";
import IWalletModel from "./wallet.model";

export default interface IPrismaModels {
  client: IClientModel;
  wallet: IWalletModel;
}
