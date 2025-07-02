import Util from "@/utils/util";

const env = {
  BASE_URL: getEnv("NEXT_PUBLIC_BASE_URL"),
};

function getEnv(key: string) {
  const val = process.env?.[key];
  if (!Util.isNotNull(val))
    throw new Error(`Key (${key}) was not found in env file\n`);
  return val;
}

export default env;
