import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

type Config = {
  env: string;
  port: number;
  mongodbUrl: string;
  clientUrl: string;
  MessageUrl: string;
  companyUrl: string;
  userUrl: string;
};

// Function to load and validate environment variables
function loadConfig(): Config {
  // Determine the environment and set the appropriate .env file
  const env = process.env.NODE_ENV || "development";
  const envPath = path.resolve(__dirname, `./configs/.env.${env}`);
  dotenv.config({ path: envPath });

  // Define a schema for the environment variables
  const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required(),
    CLIENT_URL: Joi.string().required(),
    API_SENDMESSAGE_ENDPOINT: Joi.string().required(),
    API_COMPANY_ENDPOINT: Joi.string().required(),
    API_USERS_ENDPOINT: Joi.string().required(),
  })
    .unknown()
    .required();

  // Validate the environment variables
  const { value: envVars, error } = envVarsSchema.validate(process.env);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongodbUrl: envVars.MONGODB_URL,
    clientUrl: envVars.CLIENT_URL,
    MessageUrl: envVars.API_SENDMESSAGE_ENDPOINT,
    companyUrl: envVars.API_COMPANY_ENDPOINT,
    userUrl: envVars.API_SENDMESSAGE_ENDPOINT,
  };
}

// Export the loaded configuration
const configs = loadConfig();
export default configs;
