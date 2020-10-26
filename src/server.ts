import express from 'express';
import routes from './routes';

const app = express();

app.use(routes);

app.get('/', (resquest, response) => response.json({ message: 'Alo a todos' }));

app.listen(3333, () => {
  console.log('🚀️🚀️ Back-end started 🚀️🚀️');
});
