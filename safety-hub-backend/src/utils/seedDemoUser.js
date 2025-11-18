import bcrypt from "bcrypt";
import User from "../models/User.js";

export const ensureDemoUser = async () => {
  try {
    const email = process.env.DEMO_EMAIL || "demo@example.com";
    const password = process.env.DEMO_PASSWORD || "demo123";
    const name = process.env.DEMO_NAME || "Demo User";
    const role = process.env.DEMO_ROLE || "admin";

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    console.log(`Seeded demo account (${email} / ${password})`);
  } catch (error) {
    console.error("Failed to seed demo user:", error.message);
  }
};

