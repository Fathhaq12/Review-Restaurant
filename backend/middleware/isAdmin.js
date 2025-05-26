export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin" && req.user.username === "arapp") {
    return next();
  }
  return res.status(403).json({ message: "Admin only" });
};
