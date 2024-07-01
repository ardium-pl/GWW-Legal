import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { nsaRouter } from "./api/router.js";
import { clientRouter } from './client.js';
import chalk from 'chalk';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors())

app.use(nsaRouter);
app.use(clientRouter);

console.log('[Server] Starting up...');

app.listen(port, () => {
  console.log(`[Server] Server is running on port ${chalk.green.underline(port)}.`);
});

export default app;