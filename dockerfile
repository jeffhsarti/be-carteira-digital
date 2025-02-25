# Etapa de Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copia os arquivos de dependência da raiz do projeto (package.json e package-lock.json, se existir)
COPY package*.json ./

# Copia o arquivo tsconfig.json
COPY tsconfig.json ./

# Instala as dependências, incluindo devDependencies (necessárias para build e testes)
RUN npm install

# Copia a pasta do Prisma (schema e demais arquivos necessários)
COPY prisma ./prisma

# Gera o Prisma Client com base no schema
RUN npx prisma generate

# Copia o código fonte da pasta "src"
COPY src ./src

# Executa o build do projeto (assumindo que o script "build" compila os arquivos de "src" para "dist")
RUN npm run build

# Etapa de Produção
FROM node:18-alpine AS production
WORKDIR /app

# Copia a pasta de dependências e o build gerado na etapa anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Define a variável de ambiente para produção
ENV NODE_ENV=production

# Exponha a porta que a aplicação utilizará (ajuste conforme necessário)
EXPOSE 3000

# Inicia a aplicação (certifique-se que o entry point corresponde ao gerado pelo build)
CMD ["node", "dist/index.js"]
