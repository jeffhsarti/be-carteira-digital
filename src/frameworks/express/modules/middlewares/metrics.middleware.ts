import promBundle from "express-prom-bundle";

export const expressMetricsClient = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  promClient: {
    collectDefaultMetrics: {}, // Coletar métricas padrão do Prometheus, como memória e CPU
  },
});
