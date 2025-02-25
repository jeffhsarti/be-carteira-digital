import "./util/tracing";
import figlet from "figlet";
import ExpressApp from "./frameworks/express";
import ServicesFactory from "./core/services/factory";
import {
  ExpressControllersFactory,
  ExpressMiddlewaresFactory,
} from "./frameworks/express/modules/client";
import { clientRepository, walletRepository } from "./infra/repositories";

const app = new ExpressApp();

const servicesFactory = new ServicesFactory(clientRepository, walletRepository);
const expressControllersFactory = new ExpressControllersFactory(
  servicesFactory,
);
const expressMiddlewaresFactory = new ExpressMiddlewaresFactory();

const clientAdapters = expressControllersFactory.createClientController();
const walletAdapters = expressControllersFactory.createWalletController();

app.registerControllers([
  // Client Routes
  {
    method: "get",
    path: "clients",
    beforeMiddlewares: [],
    handler: clientAdapters.getAllClients,
    afterMiddlewares: [],
  },
  {
    method: "get",
    path: "clients/:clientId",
    beforeMiddlewares: [
      expressMiddlewaresFactory.createClientIdParamValidationMiddleware()
        .execute,
    ],
    handler: clientAdapters.getClientById,
    afterMiddlewares: [],
  },
  {
    method: "get",
    path: "clients/:clientId/wallets",
    beforeMiddlewares: [
      expressMiddlewaresFactory.createClientIdParamValidationMiddleware()
        .execute,
    ],
    handler: walletAdapters.getWalletsOfClient,
    afterMiddlewares: [],
  },
  {
    method: "get",
    path: "clients/:clientId/wallets/info",
    beforeMiddlewares: [
      expressMiddlewaresFactory.createClientIdParamValidationMiddleware()
        .execute,
    ],
    handler: walletAdapters.getAllWalletsInfoOfClient,
    afterMiddlewares: [],
  },
  {
    method: "post",
    path: "clients",
    beforeMiddlewares: [
      expressMiddlewaresFactory.createClientBodyValidationMiddleware().execute,
    ],
    handler: clientAdapters.createClient,
    afterMiddlewares: [],
  },
  // Wallet Routes
  {
    method: "get",
    path: "wallets/:walletId",
    beforeMiddlewares: [
      expressMiddlewaresFactory.createWalletIdParamValidationMiddleware()
        .execute,
    ],
    handler: walletAdapters.getWalletById,
    afterMiddlewares: [],
  },
  {
    method: "get",
    path: "wallets/:walletId/info",
    beforeMiddlewares: [
      expressMiddlewaresFactory.createWalletIdParamValidationMiddleware()
        .execute,
    ],
    handler: walletAdapters.getWalletInfoById,
    afterMiddlewares: [],
  },
  {
    method: "post",
    path: "wallets",
    beforeMiddlewares: [
      expressMiddlewaresFactory.createWalletBodyValidationMiddleware().execute,
    ],
    handler: walletAdapters.createWallet,
    afterMiddlewares: [],
  },
]);

figlet("Carteira Digital", (err, data) => {
  if (err) {
    console.log("Carteira Digital");
    return;
  }
  console.log(data);
});

app.start();
