import { ValidationMiddleware } from "../../../application/http/middlewares/implementation/entity-validation.middleware";
import { ExpressClientControllerAdapter } from "./client/controllers/client.controller";
import { ExpressWalletControllerAdapter } from "./wallet/controllers/wallet.controller";

import {
  ExpressBodyEntityValidationAdapter,
  ExpressParamsEntityValidationAdapter,
} from "./middlewares/entity-validation.middleware";

import ClientController from "../../../application/http/controllers/implementation/client.controller";
import WalletController from "../../../application/http/controllers/implementation/wallet.controller";
import {
  createClientSchema,
  getClientByIdSchema,
} from "../../../core/validators/client.validators";
import {
  createWalletSchema,
  getWalletByWalletIdSchema,
} from "../../../core/validators/wallet.validators";

import AuthController from "../../../application/http/controllers/implementation/auth.controller";
import { AuthenticationMiddleware } from "../../../application/http/middlewares/implementation/authentication.middleware";
import ServiceFactory from "../../../core/services/factory";
import { ValidationException } from "../../../util/exception";
import { ExpressAuthenticationControllerAdapter } from "./auth/controllers/authentication.controllers";
import { ExpressAuthenticationMiddleware } from "./auth/middlewares/authentication.middleware";

export class ExpressControllersFactory {
  constructor(private serviceFactory: ServiceFactory) {}

  createClientController() {
    const clientService = this.serviceFactory.createClientService();
    const clientController = new ClientController(clientService);
    return new ExpressClientControllerAdapter(clientController);
  }

  createWalletController() {
    const walletService = this.serviceFactory.createWalletService();
    const walletController = new WalletController(walletService);
    return new ExpressWalletControllerAdapter(walletController);
  }

  createAuthController() {
    const authService = this.serviceFactory.createAuthService();
    const authController = new AuthController(authService);
    return new ExpressAuthenticationControllerAdapter(authController);
  }
}

export class ExpressMiddlewaresFactory {
  constructor(private serviceFactory: ServiceFactory) {}

  /*
    Vide o hack em middlewares/entity-validation.middleware.ts
    Esse hack permite que eu passe qualquer objeto que implemente a 
    classe abstrata InvalidEntityException e que possua em seu construtor
    um array de ValidationErrorItem. Isso me permite implementar quantas
    classes concretas à partir de InvalidEntityException e ao mesmo tempo
    utilizar a sua assinatura para garantir a inversão e injeção de dependências.

    O uso prático dessa estratégia é nichado, mas é perfeito para casos em que
    você deseja criar uma classe abstrata para representar um tipo, visto que o
    typescript não permite a injeção de dependências com classes abstratas sendo 
    utilizados como tipo/interface (até porque elas não são instanciáveis).
  */
  createClientBodyValidationMiddleware() {
    return new ExpressBodyEntityValidationAdapter(
      new ValidationMiddleware(createClientSchema),
      ValidationException,
    );
  }

  createClientIdParamValidationMiddleware() {
    return new ExpressParamsEntityValidationAdapter(
      new ValidationMiddleware(getClientByIdSchema),
      ValidationException,
    );
  }

  createWalletBodyValidationMiddleware() {
    return new ExpressBodyEntityValidationAdapter(
      new ValidationMiddleware(createWalletSchema),
      ValidationException,
    );
  }

  createWalletIdParamValidationMiddleware() {
    return new ExpressParamsEntityValidationAdapter(
      new ValidationMiddleware(getWalletByWalletIdSchema),
      ValidationException,
    );
  }

  createAuthenticationMiddleware() {
    return new ExpressAuthenticationMiddleware(
      new AuthenticationMiddleware(this.serviceFactory.createAuthService()),
    );
  }
}
