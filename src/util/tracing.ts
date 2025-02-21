import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { Resource } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";

// Criar provedor de tracing
const provider = new NodeTracerProvider({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: "carteira-digital",
  }),
});

// Configurar exportador OTLP para enviar os traces ao Jaeger
const exporter = new OTLPTraceExporter({
  url: "http://jaeger:4318/v1/traces", // Endpoint correto para Jaeger no modo OTLP
});

// Adicionar o processador de spans
provider.addSpanProcessor(new BatchSpanProcessor(exporter));

// Registrar o provedor de tracing
provider.register();

console.log("Tracer inicializado com sucesso!");
