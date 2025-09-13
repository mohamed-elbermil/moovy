// backend/routes/auth.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";


const router = express.Router();

// MongoDB variables
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.MONGODB_DB || "moovy";

if (!mongoUri) {
  throw new Error("MONGO_URI n'est pas défini dans le fichier .env !");
}

// =====================
// Route REGISTER
// =====================
router.post("/register", async (req, res) => {
  try {
    // Vérifie que le JSON est bien reçu
    console.log("Données reçues :", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Le mot de passe doit contenir au moins 6 caractères" });
    }

    // Connexion à MongoDB
    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection("users");

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      await client.close();
      return res.status(400).json({ error: "Un utilisateur avec cet email existe déjà" });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      watchedMovies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await users.insertOne(newUser);
    await client.close();

    res.status(201).json({ message: "Utilisateur créé avec succès", userId: result.insertedId });
  } catch (err) {
    console.error("Erreur register:", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
});

// =====================
// Route LOGIN
// =====================
router.post("/login", async (req, res) => {
  try {
    console.log("Données login reçues :", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis" });
    }

    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection("users");

    const user = await users.findOne({ email });
    if (!user) {
      await client.close();
      return res.status(400).json({ error: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await client.close();
      return res.status(400).json({ error: "Mot de passe incorrect" });
    }

    // Génère le JWT **après avoir défini user**
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

    await client.close();

    // Ici tu peux générer un JWT si tu veux
    res.json({ message: "Connexion réussie", user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Erreur login:", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
});

export default router;
