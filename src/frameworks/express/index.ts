import cors from "cors";
import express, { json, RequestHandler } from "express";
import helmet from "helmet";

import promClient from "prom-client";

import logger from "../../util/logger";
import { expressMetricsClient } from "./modules/middlewares/metrics.middleware";
import { ControllerAdapter } from "./types";

export default class ExpressApp {
  app: express.Application;
  private controllers: ControllerAdapter[] = [];

  constructor() {
    this.app = express();
    this.config();
  }

  private config() {
    this.app.use(json());
    this.app.use(
      cors({
        origin: "*",
      }),
    );
    this.app.use(helmet());
  }

  public registerControllers(controllers: ControllerAdapter[]): void {
    this.controllers = controllers;
  }

  public registerGlobalMiddleware(middleware: RequestHandler): void {
    this.app.use(middleware);
  }

  private logRoutes(): void {
    const routes = this.app._router.stack
      .filter((layer: any) => layer.route)
      .map((layer: any) => ({
        method: Object.keys(layer.route.methods)[0].toUpperCase(),
        path: layer.route.path,
      }));

    const formattedRoutes = routes
      .map((route: any) => `${route.method} ${route.path}`)
      .join("\n");
    logger.info(`Routes registered:`, formattedRoutes);
    console.log(formattedRoutes);
  }

  private registerRoutes = () => {
    /* 
      um pequeno hack para garantir que o typescript permita eu utilizar o express-prom-bundle
      com a minha versão do @types/express. O prom-bundle utiliza o @5.0.0, mas estou utilizando
      uma versão anterior. Não houve uma mudança tão grande além da assinatura dos métodos entre
      as versões, então é seguro fazer isso.
      O hack consiste em fazer o interpretador entender o objeto expressMetricsClient como tipo  
      unknown e em seguida tipá-lo como RequestHandler do express 4.x.x. Como o typescript é uma  
      linguagem de desenvolvimento, quando esse código for compilado para JS, esses asserts serão 
      ignorados.
    */
    this.app.use(expressMetricsClient as unknown as RequestHandler);
    this.app.get("/metrics", async (req, res) => {
      res.set("Content-Type", promClient.register.contentType); // Definir o tipo de conteúdo
      const content = await promClient.register.metrics();
      res.end(content); // Expor as métricas coletadas
    });
    this.controllers.forEach(
      ({ method, path, beforeMiddlewares, afterMiddlewares, handler }) => {
        this.app[method](
          `/api/v1/${path}`,
          ...beforeMiddlewares,
          handler,
          ...afterMiddlewares,
        );
      },
    );
  };

  public start(): void {
    this.registerRoutes();
    this.logRoutes();
    this.app.listen(3000, () => {
      logger.info(`Server running on port 3000...`);
    });
  }
}
