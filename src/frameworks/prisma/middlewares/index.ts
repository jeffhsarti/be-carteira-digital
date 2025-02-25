import { Prisma, PrismaClient } from "@prisma/client";
import { handleException } from "./exception-handler";

/* 
  O prisma lança exceções complexas e que causam acoplamentos desnecessários
  se não forem abstraídas de maneira adequada.

  A melhor forma que encontrei e que costumo utilizar nos meus projetos é criando
  um middleware que captura exceções em tempo de execução e lança exceções personalizadas
  para que possam ser tratados de maneira mais controlada e evitando acoplamentos com a ORM.

  Outras ORMs também oferecem suporte para extensões de middleware, portanto o acoplamento fica
  centralizado e mais fácil de manter caso haja necessidade de alterar a ORM, visto que as exceções
  personalizadas são utilitários da aplicação.
*/
export default function configureMiddlewares(prismaInstance: PrismaClient) {
  prismaInstance.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query }) {
          try {
            return await query(args);
          } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
              handleException(error);
            }
            throw error; // Lança outros erros normalmente
          }
        },
      },
    },
  });
}
