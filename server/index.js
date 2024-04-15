import express from "express";
import bodyParser from "body-parser";
import nsaRouter from "./api/router.js";
import clientRouter from './client.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(nsaRouter);
app.use(clientRouter);

console.log('Server is starting up...');

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;