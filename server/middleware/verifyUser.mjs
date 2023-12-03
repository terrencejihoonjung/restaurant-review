const verifyUser = (req, res, next) => {
  if (req.session && req.session.user) {
    // maxAge is automatically updated with regenerate
    req.session.regenerate((err) => {
      if (err) {
        console.error("Error regenerating session:", err);
      }
    });
  }
  next();
};

export default verifyUser;
