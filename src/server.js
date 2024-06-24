require('dotenv/config');
import app from './app';

export const port_server = 8080;

app.listen(port_server, () => {
  console.log(`Iniciando Backend Port ${port_server}`);
});
