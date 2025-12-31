import express from "express";
import config from "./config/env.js";
import { connectDB } from "./config/db.js";
import router from "./routes/note.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();
const PORT = config.PORT;

app.use(express.json());

connectDB(config.MONGODB_URI).then(() =>
  console.log("Database connected.")
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", message: "Server is running", timestamp: new Date().toISOString() });
});

app.use("/api", router);

// Global Error Handler
app.use(errorMiddleware);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
