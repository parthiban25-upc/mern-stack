const express = require("express");
const crypto = require("crypto");
const User = require("../models/User");

const router = express.Router();

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24;

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function signJwt(payload) {
  const secret = process.env.JWT_SECRET || "dev-secret-key";
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${header}.${body}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${header}.${body}.${signature}`;
}

async function hashPassword(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(derivedKey.toString("hex"));
    });
  });
}

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const passwordHash = await hashPassword(password, salt);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      passwordSalt: salt,
    });

    const token = signJwt({
      sub: user._id.toString(),
      email: user.email,
      exp: Date.now() + TOKEN_TTL_MS,
    });

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register failed:", error.message);
    return res.status(500).json({ message: "Unable to register user." });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("Login request body:", req.body);
    console.log("Request headers:", req.headers);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Missing credentials - email:", email, "password:", password);
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const passwordHash = await hashPassword(password, user.passwordSalt);
    if (passwordHash !== user.passwordHash) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = signJwt({
      sub: user._id.toString(),
      email: user.email,
      exp: Date.now() + TOKEN_TTL_MS,
    });

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login failed:", error.message);
    return res.status(500).json({ message: "Unable to log in." });
  }
});

module.exports = router;
