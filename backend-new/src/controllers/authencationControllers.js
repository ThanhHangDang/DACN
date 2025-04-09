const bcrypt = require("bcrypt");
const {
  findUserByUsername,
  loginExecute,
} = require("../models/authencationModels.js");

const login = async (req, res) => {
  const { username, password } = req.body.params;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Tài khoản hoặc mật khẩu không đúng." });
  }

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await findUserByUsername(username);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Tài khoản hoặc mật khẩu không đúng." });
    }

    const userLogin = await loginExecute(username, password);

    if (!userLogin) {
      return res
        .status(401)
        .json({ message: "Tài khoản hoặc mật khẩu không đúng." });
    }
    console.log("dang chay login");
    const token = "token";
    req.session.userLogin = {
      id: userLogin.user_id,
      username: userLogin.username,
      role: userLogin.role_id,
      create_date: userLogin.create_at,
    };
     // Tạo token ở đây nếu cần thiết
    return res
      .status(200)
      .json({ message: "Đăng nhập thành công.", user: req.session.userLogin, token:token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Có lỗi khi đăng nhập." });
  }
};

const isLogin = (req, res) => {
  console.log("isLogin", req.session.userLogin);
  if (req.session.userLogin) {
    return res
      .status(200)
      .json({ loggedIn: true, user: req.session.userLogin });
  }
  res.status(401).json({ loggedIn: false, message: "Chưa đăng nhập" });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Đăng xuất thất bại" });
    }

    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Đăng xuất thành công" });
  });
};

const register = async (req, res) => {
  const { dataRegister } = req.body.params;
  console.log(dataRegister);
};

module.exports = {
  isLogin,
  login,
  logout,
  register,
};
