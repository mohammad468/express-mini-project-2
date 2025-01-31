const checkAuthentication = (req, res, next) => {
  const isAuthenticated = req.isAuthenticated();
  if (isAuthenticated) return next();
  return res.redirect("/login");
};

const redirectIfIsAuth = (req, res, next) => {
  const isAuthenticated = req.isAuthenticated();
  if (isAuthenticated) return res.redirect("/profile");
  return next();
};

module.exports = { checkAuthentication, redirectIfIsAuth };
