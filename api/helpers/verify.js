function checkAuth(req, res, next) {
  const auth = req.isAuthenticated();
  if (!auth) {
    return res.json({ success: false, msg: 'User is not logged in' });
  }
  next();
}

module.exports = checkAuth;
