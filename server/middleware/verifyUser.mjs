const verifyUser = async (req, res) => {
  if (!req.session.user) {
    return res.json({ loggedIn: false, message: "User Unauthorized" });
  }

  res.json({
    loggedIn: true,
    message: "User Authorized",
    user: req.session.user,
  });
};

export default verifyUser;
