import express from "express";
import cors from "cors";
import helmet from "helmet";
import apiRouter from "./routes";
import env from "./config/env";

const app = express();
const PORT = env.PORT;

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello from Arghya!");
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
