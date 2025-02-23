# be-carteira-digital
> Desafio técnico para desenvolvedores full stack proposto pelo Grupo Adiano Cobuccio.
Este projeto consiste na implementação de uma carteira digital que permite aos usuários realizar transações financeiras, incluindo transferências e depósitos, com garantia de segurança e reversibilidade das operações. Além disso, a aplicação possui monitoramento completo com métricas, logs centralizados e rastreamento distribuído.

## 🛠 Tecnologias Utilizadas

- **Node.js** + **Express** (Backend)
- **PostgreSQL** (Banco de dados relacional)
- **Docker** + **Docker Compose** (Orquestração de containers)
- **Prometheus** (Coleta de métricas)
- **Grafana** (Painéis de visualização)
- **Loki** (Centralização de logs)
- **Jaeger** (Tracing distribuído para monitoramento de requisições)

---

## Como Executar o Projeto

### 🔹 1. Setup

- **Docker**: [Instalar Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Instalar Docker Compose](https://docs.docker.com/compose/install/)

### 🔹 2. Startup

Para iniciar todos os serviços necessários, execute o seguinte comando na raiz do projeto:

```sh
docker-compose up -d
```

Isso iniciará os containers de:
- **Backend da carteira digital** (`app`)
- **Banco de Dados PostgreSQL** (`db`)
- **Prometheus** para métricas (`prometheus`)
- **Grafana** para visualização de métricas (`grafana`)
- **Loki** para logs (`loki`)
- **Jaeger** para tracing distribuído (`jaeger`)

Caso queira visualizar os logs dos serviços em tempo real:

```sh
docker-compose logs -f
```

Para derrubar os containers e limpar os volumes criados:

```sh
docker-compose down -v
```

---

## Observabilidade

Abaixo estão as funcionalidades de cada serviço de monitoramento:

### **Prometheus** (Métricas)

- Prometheus coleta métricas do backend e outros serviços configurados.
- As métricas podem ser consultadas via `http://localhost:9090`.
- O arquivo de configuração `monitoring/prometheus.yaml` define as fontes de métricas.

### **Grafana** (Painéis de Visualização)

- Utiliza as métricas do **Prometheus** e logs do **Loki** para exibição.
- Interface acessível em `http://localhost:3001`.
- Pode ser configurado com painéis customizados.

### **Loki** (Centralização de Logs)

- Armazena e processa logs estruturados da aplicação.
- Integra-se com **Grafana** para consulta via **LogQL**.
- A API do Loki está disponível em `http://localhost:3100`.

### **Jaeger** (Tracing Distribuído)

- Permite rastrear chamadas e tempos de resposta das requisições.
- Interface para visualização dos traces disponível em `http://localhost:16686`.

---

## 🔌 Variáveis de Ambiente

As variáveis de ambiente são configuradas diretamente no `docker-compose.yml`. Algumas importantes:

```yaml
environment:
  - NODE_ENV=production
  - PORT=3000
  - DB_HOST=db
  - DB_PORT=5432
  - DB_USER=postgres
  - DB_PASSWORD=postgres
  - DB_NAME=carteira
  - JAEGER_AGENT_HOST=jaeger
  - JAEGER_AGENT_PORT=6831
```

Caso precise alterar alguma variável, edite o `docker-compose.yml` antes de iniciar os containers.

---

## Endpoints e Monitoramento

| Serviço       | URL de Acesso |
|--------------|----------------|
| **Backend (API)** | `http://localhost:3000` |
| **PostgreSQL** | `localhost:5432` |
| **Prometheus** | `http://localhost:9090` |
| **Grafana** | `http://localhost:3001` |
| **Loki API** | `http://localhost:3100` |
| **Jaeger UI** | `http://localhost:16686` |
