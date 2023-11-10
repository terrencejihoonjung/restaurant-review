const verifyUser = (req, res, next) => {
  if (!req.session.user) {
    return res.status(400).json({ isLoggedIn: false });
  }
  req.session.touch();
  next();
};

export default verifyUser;
