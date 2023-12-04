import User from "../models/userModel.mjs";

export const register = async (req, res) => {
  try {
    // Parse user input
    const { username, email, password } = req.body;

    // Validate and insert user into Database
    const user = await User.registerUser(username, email, password);

    // Store user data in session
    req.session.user = newUser;

    // Send response
    res.json({ user });
  } catch (error) {
    console.error(error);
  }
};

export const login = async (req, res) => {
  try {
    // Parse user input
    const { email, password } = req.body;

    // Validate and get user from database
    const user = await User.loginUser(email, password);

    // Store user data in session
    req.session.user = user;

    // Send response
    res.json({ user });
  } catch (error) {
    console.error(error);
  }
};

export const logout = async (req, res) => {
  try {
    // Delete session entirely
    req.session.destroy();

    // Send response
    res.json({ message: "User Logged Out" });
  } catch (err) {
    console.error(err);
  }
};

export const isAuthenticated = async (req, res, next) => {
  try {
    if (req.session && req.session.user) {
      console.log("authorized");
      next(); // User is authenticated
    }
    console.log(req.session);
    res.status(401).json({ message: "Unauthorized" });
  } catch (err) {
    console.error(err);
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;

    const userReviews = await pool.query(
      "SELECT * FROM reviews WHERE user_id = $1",
      [userId]
    );

    res.json({ userReviews: userReviews.rows });
  } catch (err) {
    console.error(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.session.user;
    res.json({ user });
  } catch (err) {
    console.error(err);
  }
};

export const sendRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const { id } = req.session.user;

    // Check if request already exists
    const existingRequest = await pool.query(
      "SELECT * FROM friends WHERE requester_id = $1 AND receiver_id = $2",
      [id, userId]
    );

    if (existingRequest.rows.length > 0) {
      return res.status(400).json({ message: "Friend Request already sent" });
    }

    // Insert new friend request
    await pool.query(
      "INSERT INTO friends (requester_id, receiver_id, status) VALUES ($1, $2, $3)",
      [id, userId, "pending"]
    );
    res.json({ message: "Friend Request Sent" });
  } catch (err) {
    console.error(err);
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const { id } = req.session.user;

    // Check if a request did exist
    const existingRequest = await pool.query(
      "SELECT * FROM friends WHERE requester_id = $1 AND receiver_id = $2",
      [userId, id]
    );

    if (existingRequest.rows.length == 0) {
      return res.status(400).json("There is no friend request to accept");
    }

    // Change Status of request row to accepted
    await pool.query(
      "UPDATE friends SET status = $1, created_at = $2 WHERE requester_id = $3 AND receiver_id = $4",
      ["accepted", new Date(), userId, id]
    );

    // Insert row into friends to complete friendship
    await pool.query(
      "INSERT INTO friends (requester_id, receiver_id, status) VALUES ($1, $2, $3)",
      [id, userId, "accepted"]
    );

    res.json({ message: "Friend Request Accepted" });
  } catch (err) {
    console.error(err);
  }
};

export const removeFriend = async (req, res) => {
  try {
    const { userId } = req.params;
    const { id } = req.session.user;

    await pool.query(
      "DELETE FROM friends WHERE requester_id = $1 AND receiver_id = $2 OR requester_id = $2 AND receiver_id = $1",
      [userId, id]
    );

    res.json({ message: "You are no longer friends" });
  } catch (err) {
    console.error(err);
  }
};

export const checkFriendStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { id } = req.session.user;

    // Grab rows from friends
    const friendship = await pool.query(
      "SELECT * FROM friends WHERE requester_id = $1 AND receiver_id = $2 OR requester_id = $2 AND receiver_id = $1",
      [userId, id]
    );

    if (friendship.rows.length == 2) {
      return res.json({ status: "Friends" });
    } else if (friendship.rows.length == 0) {
      return res.json({ status: "Add Friend" });
    }

    res.json({
      status: "Pending Request",
      requester: friendship.rows[0].requester_id,
    });
  } catch (err) {
    console.error(err);
  }
};
