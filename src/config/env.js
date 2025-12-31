import dotenv from "dotenv";

dotenv.config();

const config = {
    PORT: process.env.PORT || 8000,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV || "development",
};

if (!config.MONGODB_URI && config.NODE_ENV !== "test") {
    console.error("WARNING: MONGODB_URI is not defined in environment variables.");
}

export default config;
