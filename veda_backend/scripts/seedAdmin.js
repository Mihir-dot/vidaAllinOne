/**
 * Ensures one admin user exists; password comes from .env (never commit real values).
 * Run: npm run seed:admin
 */
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const User = require("../models/user");

async function main() {
  const uri = process.env.MONGODB_URI;
  const email = (process.env.ADMIN_EMAIL || "admin@veda.local").trim().replace(/\r$/, "");
  const password = (process.env.ADMIN_SEED_PASSWORD || "").trim().replace(/\r$/, "");

  if (!uri) {
    console.error("Missing MONGODB_URI in .env");
    process.exit(1);
  }
  if (!password || password.length < 12) {
    console.error("Set ADMIN_SEED_PASSWORD in .env (at least 12 characters).");
    process.exit(1);
  }

  await mongoose.connect(uri);

  let user = await User.findOne({ email });
  if (user) {
    user.password = password;
    if (!user.firstname) user.firstname = "Admin";
    if (!user.lastname) user.lastname = "VIDA";
    await user.save();
    console.log("Updated admin password for:", email);
  } else {
    user = new User({
      firstname: "Admin",
      lastname: "VIDA",
      email,
      role: "Admin",
      password,
    });
    await user.save();
    console.log("Created admin:", email);
  }

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
