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
  try {
    const [rows] = await db.query(
      `SELECT    *    
      FROM user_ WHERE username = ? and password_ = ?`,
      [username, password]    
    );
    if (rows.length === 0) {
      return null; // Không tìm thấy người dùng với tên đăng nhập và mật khẩu này
    }
    if(Number(rows[0].role_id)===2)
    {
      const [avatar] = await db.query(
        `SELECT  logo    
        FROM company WHERE company_id = ?`,
        [rows[0].user_id]    
      );
      return {...rows[0], logo: avatar[0]?.logo}; // Trả về người dùng đầu tiên nếu tìm thấy

    }
    else if(Number(rows[0].role_id)===3)
    {
      const [avatar] = await db.query(
        `SELECT  avatar  as logo  
        FROM user_jobseeker WHERE jobseeker_id = ?`,
        [rows[0].user_id]    
      );
      return {...rows[0], logo: avatar[0]?.logo}; // Trả về người dùng đầu tiên nếu tìm thấy
    }
  }
  catch (error) {
    console.error("Lỗi khi thực hiện truy vấn:", error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};

module.exports = { findUserByUsername, loginExecute };
