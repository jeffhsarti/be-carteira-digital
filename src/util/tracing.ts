import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { Resource } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

// Criar provedor de tracing
const provider = new NodeTracerProvider({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: "carteira-digital",
  }),
  spanProcessors: [
    new BatchSpanProcessor(
      new OTLPTraceExporter({
        url: "http://jaeger:4318/v1/traces", // Endpoint correto para Jaeger no modo OTLP
      }),
    ),
  ],
});

// Registrar o provedor de tracing
provider.register();

registerInstrumentations({
  instrumentations: [getNodeAutoInstrumentations()],
});

console.log("Tracer inicializado com sucesso!");
