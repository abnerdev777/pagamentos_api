import { Router } from 'express';

import Teste from './teste';

const routes = new Router();

routes.post('/payments5841687', Teste.store);

export default routes;
