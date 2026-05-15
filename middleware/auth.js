const crypto = require("crypto");
const User = require("../models/User");

function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(`${normalized}${padding}`, "base64").toString("utf8");
}

function verifyJwt(token) {
  const secret = process.env.JWT_SECRET || "dev-secret-key";
  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("Malformed token");
  }

  const [header, payload, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${header}.${payload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  if (signature !== expectedSignature) {
    throw new Error("Invalid signature");
  }

  const decodedPayload = JSON.parse(decodeBase64Url(payload));
  if (decodedPayload.exp && Date.now() > decodedPayload.exp) {
    throw new Error("Token expired");
  }

  return decodedPayload;
}

module.exports = async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Authorization token is required." });
    }

    const payload = verifyJwt(token);
    const user = await User.findById(payload.sub).select("_id name email");

    if (!user) {
      return res.status(401).json({ message: "User account no longer exists." });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
