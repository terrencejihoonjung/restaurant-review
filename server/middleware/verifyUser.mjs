const verifyUser = async (req, res) => {
  if (!req.session.user) {
    return res.json({ isLoggedIn: false, message: "User Unauthorized" });
  }

  next();
};

export default verifyUser;
