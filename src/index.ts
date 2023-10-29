import express from 'express';
import bodyParser from 'body-parser';
import LinkController from './controllers/link.controller';
import 'dotenv/config';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (!process.env.DATABASE_URL) {
  console.error('One or more environment variables are missing. Check your .env file.');
  process.exit(1);
}
const PORT = process.env.PORT || 3000;

app.use('/links', LinkController.getRouter());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
