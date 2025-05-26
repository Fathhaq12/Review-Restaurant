export const isUser = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    return next();
  }
  return res.status(403).json({ message: "User only" });
};
