import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/productRoutes.js";
import { connectDB } from "./config/connectDB.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
// add middleware for api product
app.use("/api", router);
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
};
startServer();
