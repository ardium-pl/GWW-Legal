import bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import 'dotenv/config';
import express from "express";
import { nsaRouter } from "./api/router.js";
import { clientRouter } from "./client.js";
import { createTCPConnection } from './sql/sqlConnect.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
app.use(cors());

// Middleware do logowania zapytań
app.use((req, res, next) => {
    console.log(chalk.blue(`[${new Date().toISOString()}] ${req.method} ${req.url}`));
    next();
});

app.use(nsaRouter);
app.use(clientRouter);

app.get('/favicon.ico', (req, res) => res.status(204).end());

// Obsługa błędów 404
app.use((req, res, next) => {
    res.status(404).send({
        error: "Not Found",
        message: "The requested resource could not be found."
    });
});

// Globalny middleware do obsługi błędów
app.use((err, req, res, next) => {
    console.error(chalk.red('[Error]'), err);
    res.status(err.status || 500).send({
        error: "Internal Server Error",
        message: err.message || "An unexpected error occurred",
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    });
});

console.log("[Server] Starting up...");

app.listen(port, async () => {
    console.log(
        `[Server] Server is running on port ${chalk.green.underline(port)}.`,
  );
  
  try {
    const conn = await createTCPConnection();
    console.log('[Server] Connected to database!');
    conn.end();
  } catch (error) {
    throw error;
  }
});

// Obsługa nieobsłużonych odrzuceń Promise
process.on('unhandledRejection', (reason, promise) => {
    console.error(chalk.red('Unhandled Rejection at:'), promise, chalk.red('reason:'), reason);
});

// Obsługa nieobsłużonych wyjątków
process.on('uncaughtException', (error) => {
    console.error(chalk.red('Uncaught Exception:'), error);
});

export default app;
