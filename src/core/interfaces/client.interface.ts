import { ISanitizedWallet, IWallet } from "./wallet.interface";

export interface IBaseClient {
  name: string;
  email: string;
  password: string;
  wallets?: IWallet[];
}

export interface IClient extends IBaseClient {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  wallets: IWallet[];
}

export interface ISanitizedClient {
  id: string;
  name: string;
  email: string;
  wallets: ISanitizedWallet[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPartialClient {
  id: string;
  name: string;
  email: string;
  password: string;
}
