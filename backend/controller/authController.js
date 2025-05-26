import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ msg: "Email sudah terdaftar" });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Hanya username arapp yang bisa jadi admin
    const role = username === "arapp" ? "admin" : "user";

    await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ msg: "Registrasi berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    const { id, username: uname, role, email } = user;
    const accessToken = jwt.sign(
      { id, username: uname, role, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { id, username: uname, role, email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Simpan refresh token ke DB
    await User.update({ refresh_token: refreshToken }, { where: { id } });

    // Kirim refresh token ke cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false, // set true jika pakai https
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// REFRESH TOKEN
export const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(401);
  const refreshToken = cookies.refreshToken;

  try {
    const user = await User.findOne({ where: { refresh_token: refreshToken } });
    if (!user) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);

        const { id, username, role, email } = user;
        const accessToken = jwt.sign(
          { id, username, role, email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30m" }
        );

        return res.json({ accessToken });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
