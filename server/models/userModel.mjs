import pool from "../db/index.mjs";
import bcrypt from "bcrypt";

class User {
  async registerUser(username, email, password) {
    const client = await pool.connect(); // Opening pool connection since we have multiple queries
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
    } finally {
      client.release();
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

  async getUserReviews(id) {
    try {
      const reviews = await pool.query(
        "SELECT * FROM reviews WHERE user_id = $1",
        [id]
      );
      return reviews.rows;
    } catch (err) {
      throw err;
    }
  }

  async sendFriendRequest(id, receiverId) {
    const client = await pool.connect(); // Opening pool connection since we have multiple queries
    try {
      // Check if request already exists
      const existingRequest = await pool.query(
        "SELECT * FROM friends WHERE requester_id = $1 AND receiver_id = $2",
        [id, receiverId]
      );

      if (existingRequest.rows.length > 0) {
        return res.status(400).json({ message: "Friend Request already sent" });
      }

      // Insert new friend request
      await pool.query(
        "INSERT INTO friends (requester_id, receiver_id, status) VALUES ($1, $2, $3)",
        [id, receiverId, "pending"]
      );
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

  async acceptFriendRequest(id, requesterId) {
    const client = await pool.connect(); // Opening pool connection since we have multiple queries
    try {
      // Check if a request did exist
      const existingRequest = await pool.query(
        "SELECT * FROM friends WHERE requester_id = $1 AND receiver_id = $2",
        [requesterId, id]
      );

      if (existingRequest.rows.length == 0) {
        return res.status(400).json("There is no friend request to accept");
      }

      // Change Status of request row to accepted
      await pool.query(
        "UPDATE friends SET status = $1, created_at = $2 WHERE requester_id = $3 AND receiver_id = $4",
        ["accepted", new Date(), requesterId, id]
      );

      // Insert row into friends to complete friendship
      await pool.query(
        "INSERT INTO friends (requester_id, receiver_id, status) VALUES ($1, $2, $3)",
        [id, requesterId, "accepted"]
      );
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

  async removeFriend(id, friendId) {
    try {
      // Delete friendship from database
      await pool.query(
        "DELETE FROM friends WHERE requester_id = $1 AND receiver_id = $2 OR requester_id = $2 AND receiver_id = $1",
        [friendId, id]
      );
    } catch (err) {
      throw err;
    }
  }

  async friendStatus(id, friendId) {
    try {
      // Grab rows from friends
      const friendship = await pool.query(
        "SELECT * FROM friends WHERE requester_id = $1 AND receiver_id = $2 OR requester_id = $2 AND receiver_id = $1",
        [friendId, id]
      );

      return friendship.rows;
    } catch (err) {
      throw err;
    }
  }
}

export default User;
