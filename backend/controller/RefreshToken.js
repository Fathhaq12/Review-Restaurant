import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.sendStatus(401); // Unauthorized

    const user = await User.findOne({ where: { refresh_token: refreshToken } });
    if (!user) return res.sendStatus(403); // Forbidden

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);

      const { id, username, role } = user;
      const accessToken = jwt.sign({ id, username, role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30m',
      });

      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
