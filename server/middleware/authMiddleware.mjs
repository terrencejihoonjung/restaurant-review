const verifyUser = (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export default verifyUser;
