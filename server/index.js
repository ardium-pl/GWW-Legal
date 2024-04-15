import express from "express";
import bodyParser from "body-parser";
import { nsaRouter } from "./api/router.js";
import { clientRouter } from './client.js';
import chalk from 'chalk';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(nsaRouter);
app.use(clientRouter);

console.log('[Server] Starting up...');

app.listen(port, () => {
  console.log(`[Server] Server is running on port ${chalk.green.underline(port)}.`);
});

export default app;