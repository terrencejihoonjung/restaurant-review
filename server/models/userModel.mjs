import pool from "../db/index.mjs";
import bcrypt from "bcrypt";

class User {
  async registerUser(username, email, password) {
    try {
      // Check if the user already exists
      const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (existingUser.rows.length > 0)
        return res.status(400).json({ message: "Email is already in use." });

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into database
      const newUser = await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
        [username, email, hashedPassword]
      );

      return newUser.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async loginUser(email, password) {
    try {
      // Find User in Database
      const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (existingUser.rows.length === 0) {
        return res.status(401).json({ message: "User does not exist." });
      }

      // Verify Password Input with Hashed Password
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.rows[0].password
      );

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password." });
      }

      return existingUser.rows[0];
    } catch (err) {
      throw err;
    }
  }
}

export default User;
