import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER USER
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

// LOGIN USER
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
      secure: false,
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// LOGOUT USER
export const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(204);
  const refreshToken = cookies.refreshToken;
  try {
    const user = await User.findOne({ where: { refresh_token: refreshToken } });
    if (!user) {
      res.clearCookie("refreshToken");
      return res.sendStatus(204);
    }
    await User.update({ refresh_token: null }, { where: { id: user.id } });
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// GET ALL USERS (admin only)
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password", "refresh_token"] },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// GET USER BY ID (admin only)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password", "refresh_token"] },
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// CREATE USER (admin only)
export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ msg: "Email sudah terdaftar" });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({ msg: "User berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// UPDATE USER (admin only)
export const updateUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    let hashedPassword = user.password;
    if (password) {
      const salt = await bcrypt.genSalt();
      hashedPassword = await bcrypt.hash(password, salt);
    }

    await user.update({
      username: username || user.username,
      email: email || user.email,
      password: hashedPassword,
      role: role || user.role,
    });

    res.json({ msg: "User berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// DELETE USER (admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    await user.destroy();
    res.json({ msg: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    // Use req.userId from verifyToken middleware
    const user = await User.findByPk(req.userId, {
      attributes: ["id", "username", "email", "role"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
