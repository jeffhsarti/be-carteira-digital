export interface IBaseWallet {
  id?: string;
  clientId: string;
}

export interface IWallet extends IBaseWallet {
  id?: string;
  clientId: string;
  balance: number;
  transactionsSent: any[];
  transactionsReceived: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISanitizedWallet {
  id: string;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
}
