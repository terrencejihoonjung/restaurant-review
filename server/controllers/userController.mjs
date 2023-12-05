import User from "../models/userModel.mjs";

// LOGIN/REGISTER
export const getUser = async (req, res) => {
  try {
    const { user } = req.session;
    res.json({ user });
  } catch (err) {
    console.error(err);
  }
};

export const getProfileUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Don't need to fetch data if profile is current user's
    if (userId === req.session.user.id) {
      return res.json({ user: req.session.user });
    }

    const user = await User.getProfileUser(userId);

    res.json({ user });
  } catch (err) {
    console.error(err);
  }
};

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

    // Clear Cookie
    res.clearCookie("current_user");

    // Send response
    res.json({ message: "User Logged Out" });
  } catch (err) {
    console.error(err);
  }
};

// REVIEWS
export const getUserReviews = async (req, res) => {
  try {
    // Parse user id from session data
    const { id } = req.session.user;

    // Get user's reviews from database
    const reviews = await User.getUserReviews(id);

    // Send response
    res.json({ reviews });
  } catch (err) {
    console.error(err);
  }
};

// FRIENDS
export const sendRequest = async (req, res) => {
  try {
    // Parse user's id and receiver's id
    const { id } = req.session.user;
    const { userId } = req.params;

    // Insert friendship into database as "pending"
    await User.sendFriendRequest(id, userId);

    // Return response
    res.json({ message: "Friend Request Sent" });
  } catch (err) {
    console.error(err);
  }
};

export const acceptRequest = async (req, res) => {
  try {
    // Parse user's id and receiver's id
    const { id } = req.session.user;
    const { userId } = req.params;

    // Update pending friend request and add the complement friendship to database
    await User.acceptFriendRequest(id, userId);

    // Send response
    res.json({ message: "Friend Request Accepted" });
  } catch (err) {
    console.error(err);
  }
};

export const removeFriend = async (req, res) => {
  try {
    // Parse user's id and friend's id
    const { id } = req.session.user;
    const { userId } = req.params;

    // Delete friendshow rows from database
    await User.removeFriend(id, userId);

    // Send response
    res.json({ message: "You are no longer friends" });
  } catch (err) {
    console.error(err);
  }
};

export const checkFriendStatus = async (req, res) => {
  try {
    // Parse user's id and friend's id
    const { id } = req.session.user;
    const { userId } = req.params;

    // Grab friendship rows from database
    const friendship = await User.friendStatus(id, userId);

    // Return the status between current user and friend
    if (friendship.length == 2) {
      return res.json({ status: "Friends" });
    } else if (friendship.length == 0) {
      return res.json({ status: "Add Friend" });
    }

    res.json({
      status: "Pending Request",
      requester: friendship[0].requester_id,
    });
  } catch (err) {
    console.error(err);
  }
};
