const verifyUser = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "User Unauthorized" });
  }

  res.json({ message: "User Authorized", user: req.session.user });
};

export default verifyUser;
