require('dotenv/config');

const mode_envia_banco = process.env.ENVIRONMENT_GLOBAL_BANCODEDADOS;

let host = null;
let username = null;
let password = null;
let database = null;
let port = null;

if (mode_envia_banco === 'prod') {
  console.log(`Banco de dados ${mode_envia_banco} - Ativado`);
  host = process.env.DB_PROD_HOST;
  username = process.env.DB_PROD_USER;
  password = process.env.DB_PROD_PASS;
  database = process.env.DB_PROD_NAME;
  port = process.env.DB_PROD_PORT;
}

if (mode_envia_banco === 'sandbox') {
  console.log(`Banco de dados ${mode_envia_banco} - Ativado`);
  host = process.env.DB_SANDBOX_HOST;
  username = process.env.DB_SANDBOX_USER;
  password = process.env.DB_SANDBOX_PASS;
  database = process.env.DB_SANDBOX_NAME;
  port = process.env.DB_SANDBOX_PORT;
}

//fim

module.exports = {
  dialect: 'mysql',
  host: host,
  username: username,
  password: password,
  database: database,
  port: port,
  dialectOptions: {
    timezone: '-03:00',
  },
  timezone: '-03:00',
  define: {
    underscored: true,
    underscoredAll: true,
    freezeTableName: true,
  },
};
