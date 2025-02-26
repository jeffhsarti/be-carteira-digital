import figlet from "figlet";
import accessControl from "./config/accesscontrol.config";
import ServicesFactory from "./core/services/factory";
import ExpressApp from "./frameworks/express";
import {
  ExpressControllersFactory,
  ExpressMiddlewaresFactory,
} from "./frameworks/express/modules";
import { clientRepository, walletRepository } from "./infra/repositories";
import "./util/tracing";

const app = new ExpressApp();

const servicesFactory = new ServicesFactory(
  clientRepository,
  walletRepository,
  accessControl,
);
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

const authorizationMiddleware =
  expressMiddlewaresFactory.createAuthorizationMiddleware();

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
    beforeMiddlewares: [
      authenticationMiddleware.execute,
      authorizationMiddleware.executeForListClient(false, "readAny", "client"),
    ],
    handler: clientAdapters.getAllClients,
    afterMiddlewares: [],
  },
  {
    method: "get",
    path: "clients/:clientId",
    beforeMiddlewares: [
      expressMiddlewaresFactory.createClientIdParamValidationMiddleware()
        .execute,
      authenticationMiddleware.execute,
      authorizationMiddleware.executeForClientIdParam(
        true,
        "readAny",
        "client",
      ),
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
      authenticationMiddleware.execute,
      authorizationMiddleware.executeForListWallet(true, "readOwn", "wallet"),
    ],
    handler: walletAdapters.getWalletsOfClient,
    afterMiddlewares: [],
  },
  {
    method: "get",
    path: "clients/:clientId/list-wallets",
    beforeMiddlewares: [
      expressMiddlewaresFactory.createClientIdParamValidationMiddleware()
        .execute,
      authenticationMiddleware.execute,
      authorizationMiddleware.executeForListWallet(false, "readAny", "wallet"),
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
  {
    method: "get",
    path: "clients/:clientId/wallets/:walletId",
    beforeMiddlewares: [
      expressMiddlewaresFactory.createWalletIdParamValidationMiddleware()
        .execute,
      authenticationMiddleware.execute,
      authorizationMiddleware.executeForWalletIdParam(
        true,
        "readOwn",
        "wallet",
      ),
    ],
    handler: walletAdapters.getWalletById,
    afterMiddlewares: [],
  },
  {
    method: "get",
    path: "clients/:clientId/wallets/:walletId/info",
    beforeMiddlewares: [
      expressMiddlewaresFactory.createWalletIdParamValidationMiddleware()
        .execute,
      authenticationMiddleware.execute,
      authorizationMiddleware.executeForWalletIdParam(
        false,
        "readAny",
        "wallet",
      ),
    ],
    handler: walletAdapters.getWalletInfoById,
    afterMiddlewares: [],
  },
  {
    method: "post",
    path: "clients/:clientId/wallets",
    beforeMiddlewares: [
      expressMiddlewaresFactory.createClientIdParamValidationMiddleware()
        .execute,
      authenticationMiddleware.execute,
      authorizationMiddleware.executeForClientIdParam(
        true,
        "createOwn",
        "wallet",
      ),
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
