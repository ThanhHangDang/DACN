const db = require("../config/databaseConfig.js");

// Tìm người dùng bằng tên đăng nhập
const findUserByUsername = async (username) => {
  const [rows] = await db.query("SELECT * FROM user_ WHERE username = ?", [
    username,
  ]);
  return rows[0]; // Trả về người dùng đầu tiên nếu tìm thấy
};

//Đăng nhập - login
const loginExecute = async (username, password) => {
  const [rows] = await db.query(
    "SELECT * FROM user_ WHERE username = ? and password_ = ?",
    [username, password]
  );
  return rows[0];
};

module.exports = { findUserByUsername, loginExecute };
