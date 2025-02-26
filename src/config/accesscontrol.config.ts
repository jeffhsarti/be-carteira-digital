import { AccessControl } from "accesscontrol";

const grantsObject = {
  user: {
    // Regras para o recurso "client"
    client: {
      // Usuário pode ler todos os dados do próprio client
      "read:own": ["*"],
      // Para outros clients, retorna apenas os campos não sensíveis
      // Em vez de usar campos específicos, aqui estou usando um valor
      // genérico que represente as ações/controllers que permitem a leitura
      // de dados de outros clients/wallets/etc - embora não vá utilizar
      // essa funcionalidade.
      "read:any": ["non-sensitive-fields"],
    },
    // Regras para o recurso "wallet"
    wallet: {
      // Usuário pode ler todas as informações das suas próprias wallets
      "read:own": ["*"],
      // Para wallets de outros usuários, não expõe dados sensíveis (como balance)
      "read:any": ["non-sensitive-fields"],
      // Pode criar wallets para si mesmo
      "create:own": ["*"],
    },
    // Regras para o recurso "transaction"
    transaction: {
      // Pode ler apenas as transações que lhe pertencem
      "read:own": ["*"],
      // Pode criar transações se estiver utilizando uma de suas wallets
      "create:own": ["*"],
    },
    // Regras para o recurso "reversal"
    reversal: {
      // Pode criar uma reversão (reverter uma transação própria)
      "create:own": ["*"],
      // Pode ler reversões de suas próprias transações
      "read:own": ["*"],
    },
  },
};

const accessControl = new AccessControl(grantsObject);
accessControl.lock();

export default accessControl;
