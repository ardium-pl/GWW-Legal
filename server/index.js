import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {nsaRouter} from "./api/router.js";
import {clientRouter} from "./client.js";
import chalk from "chalk";

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

// Middleware do logowania zapytań
app.use((req, res, next) => {
    console.log(chalk.blue(`[${new Date().toISOString()}] ${req.method} ${req.url}`));
    next();
});

app.use(nsaRouter);
app.use(clientRouter);

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

app.listen(port, () => {
    console.log(
        `[Server] Server is running on port ${chalk.green.underline(port)}.`,
    );
});

// Obsługa nieobsłużonych odrzuceń Promise
process.on('unhandledRejection', (reason, promise) => {
    console.error(chalk.red('Unhandled Rejection at:'), promise, chalk.red('reason:'), reason);
    // W środowisku produkcyjnym możemy rozważyć zamknięcie serwera
    // server.close(() => process.exit(1));
});

// Obsługa nieobsłużonych wyjątków
process.on('uncaughtException', (error) => {
    console.error(chalk.red('Uncaught Exception:'), error);
    // W środowisku produkcyjnym -> zamknąć serwer
    // server.close(() => process.exit(1));
});

export default app;
