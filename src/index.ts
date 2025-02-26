import figlet from "figlet";
import ServicesFactory from "./core/services/factory";
import ExpressApp from "./frameworks/express";
import {
  ExpressControllersFactory,
  ExpressMiddlewaresFactory,
} from "./frameworks/express/modules";
import { clientRepository, walletRepository } from "./infra/repositories";
import "./util/tracing";

const app = new ExpressApp();

const servicesFactory = new ServicesFactory(clientRepository, walletRepository);
const expressControllersFactory = new ExpressControllersFactory(
  servicesFactory,
);
const expressMiddlewaresFactory = new ExpressMiddlewaresFactory(
  servicesFactory,
);

const clientAdapters = expressControllersFactory.createClientController();
const walletAdapters = expressControllersFactory.createWalletController();
const authAdapters = expressControllersFactory.createAuthController();

const authenticationMiddleware =
  expressMiddlewaresFactory.createAuthenticationMiddleware();

app.registerControllers([
  // Auth Routes
  {
    method: "post",
    path: "auth/login",
    beforeMiddlewares: [],
    handler: authAdapters.login,
    afterMiddlewares: [],
  },
  // Client Routes
  {
    method: "get",
    path: "clients",
    beforeMiddlewares: [authenticationMiddleware.execute],
    handler: clientAdapters.getAllClients,
    afterMiddlewares: [],
  },
  {
    method: "get",
    path: "clients/:clientId",
    beforeMiddlewares: [
      authenticationMiddleware.execute,
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
      authenticationMiddleware.execute,
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
      authenticationMiddleware.execute,
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
      authenticationMiddleware.execute,
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
      authenticationMiddleware.execute,
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
      authenticationMiddleware.execute,
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
