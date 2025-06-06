export const isUser = (req, res, next) => {
  // Allow both users and admins to create reviews
  if (req.user && (req.user.role === "user" || req.user.role === "admin")) {
    return next();
  }
  return res.status(403).json({ message: "User access required" });
};
