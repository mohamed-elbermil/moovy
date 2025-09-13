import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

// ← ceci doit être **avant** d'importer ou d'utiliser auth.js
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
