import dotenv from "dotenv";
import Util from "../util/utils";
dotenv.config();

const env = {
  DATABASE_URL: getEnv("DATABASE_URL"),
  PORT: getEnv("PORT"),
};

function getEnv(key: string) {
  const val = process.env?.[key];
  if (!Util.isNotNull(val))
    throw new Error(`Key (${key}) was not found in env file\n`);
  return val;
}

export default env;
