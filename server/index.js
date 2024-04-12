import express from "express";
import bodyParser from "body-parser";
import nsaRouter from "./api/router.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(nsaRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
