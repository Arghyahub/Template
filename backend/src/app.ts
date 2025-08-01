import express from "express";
import cors from "cors";
import helmet from "helmet";
import apiRouter from "./routes";
import Env from "./config/env";
import cookieParser from "cookie-parser";

const app = express();
const PORT = Env.PORT;

app.use(
  cors({
    origin: Env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello from Server!");
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
