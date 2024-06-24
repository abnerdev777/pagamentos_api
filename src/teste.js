import axios from 'axios';
import Users from './app/models/Users';

require('dotenv/config');

class Pagamento {
  async store(req, res) {
    // Captura dos parâmetros da URL (query parameters)
    const { chave_pix2: chavePixUrl, tipopix: tipoPixUrl } = req.query;

    // Captura dos parâmetros do corpo da requisição (body)
    const { chave_pix2: chavePixBody, tipopix: tipoPixBody } = req.body;

    // Captura dos parâmetros dos headers da requisição (headers)
    const chavePixHeader = req.headers['chave_pix2'];
    const tipoPixHeader = req.headers['tipopix'];

    // Priorização dos parâmetros
    const chavePix = chavePixHeader || chavePixBody || chavePixUrl;
    const tipoPix = tipoPixHeader || tipoPixBody || tipoPixUrl;

    try {
      // Verificar se a chave PIX já está registrada
      const verification = await Users.findOne({
        where: {
          usr_pix: chavePix,
        },
      });

      if (verification) {
        return res.status(400).json({ error: 'PIX já enviado' });
      }

      // Fazer a requisição para a API
      const response = await axios.post(
        'https://ws.suitpay.app/api/v1/gateway/pix-payment',
        {
          value: 0.1,
          key: chavePix,
          typeKey: tipoPix,
        },
        {
          headers: {
            ci: 'megapaulo8_1701168797636',
            cs: '106eedeb056d152149ef7450cabde7e2b05024c3a0f40c6fbd66fc490c3ade4ee1a5c65d765d4d028166fac7f356b3e0',
            'Content-Type': 'application/json',
          },
        }
      );

      // Criar registro no banco de dados
      const createdata = {
        usr_pix: chavePix,
      };
      await Users.create(createdata);
      console.log('PIX enviado com sucesso');

      // Enviar a resposta ao cliente
      res.status(200).json(response.data || response);
    } catch (error) {
      const novoErro = error.response ? error.response.data : error.message;
      console.error('Erro:', novoErro);

      // Enviar uma resposta adequada ao cliente
      res.status(400).json({ error: novoErro });
    }
  }
}

export default new Pagamento();
