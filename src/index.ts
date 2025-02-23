import logger from "./util/logger";
import "./util/tracing";
import express from "express";
import cors from "cors";
import figlet from "figlet";
import promBundle from "express-prom-bundle";
import promClient from "prom-client";

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  promClient: {
    collectDefaultMetrics: {}, // Coletar métricas padrão do Prometheus, como memória e CPU
  },
});

const app = express();
app.use(cors());
app.use(express.json());

app.use(metricsMiddleware);

app.get("/", (req, res) => {
  res.json({ message: "API Carteira Digital" });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", promClient.register.contentType); // Definir o tipo de conteúdo
  const content = await promClient.register.metrics();
  res.end(content); // Expor as métricas coletadas
});

app.listen(3000, () => {
  logger.info("API iniciada na porta 3000!");

  figlet("Carteira Digital", (err, data) => {
    if (err) {
      console.log("Carteira Digital");
      return;
    }
    console.log(data);
  });
});
