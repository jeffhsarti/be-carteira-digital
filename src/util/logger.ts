import winston from "winston";
import LokiTransport from "winston-loki";

const logger = winston.createLogger({
  transports: [
    new LokiTransport({
      host: "http://loki:3100",
      json: true,
      labels: { app: "carteira-digital" },
      timeout: 2000,
    }),
  ],
});

export default logger;
