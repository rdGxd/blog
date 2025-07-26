import { hashPassword } from '@/lib/login/manage-login';

(async () => {
  const minhaSenha = ''; // NÃO ESQUECER DE APAGAR A SENHA ANTES DE COMMITAR
  const hashDaSuaSenhaEmBase65 = await hashPassword(minhaSenha);
  console.log({ hashDaSuaSenhaEmBase65 });
})();
