const {
  queryCategory_Industry,
  queryCategory_Jobfunction,
  queryCatalog_Benefit,
  queryCategory_Nation,
  queryCategory_City,
  queryCategory_District,
  queryCategory_Language,
  queryCategory_Level,
  queryCategory_Scale,
  queryCategory_Tags,
  queryCategory_Education,
} = require("../models/categoryModel.js");

const getCategory_Industry = async (req, res) => {
  try {
    const result = await queryCategory_Industry();
    if (result) {
      return res.status(200).json({ result });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin" });
  }
};

const getCategory_Jobfunction = async (req, res) => {
  try {
    const result = await queryCategory_Jobfunction();
    if (result) {
      return res.status(200).json({ result });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin" });
  }
};

const getCategory_Nation = async (req, res) => {
  try {
    const result = await queryCategory_Nation();
    if (result) {
      return res.status(200).json({ result });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin" });
  }
};

const getCategory_City = async (req, res) => {
  try {
    const nation = req.query.nation;
    // const data = req.body;
    // const nation = data.nation;
    const result = await queryCategory_City(nation);
    if (result) {
      return res.status(200).json({ result });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin" });
  }
};

const getCategory_District = async (req, res) => {
  try {
    const data = req.body;
    const city = data.city;
    const result = await queryCategory_District(city);
    if (result) {
      return res.status(200).json({ result });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin" });
  }
};

const getCategory_Language = async (req, res) => {
  try {
    const result = await queryCategory_Language();
    if (result) {
      return res.status(200).json({ result });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin" });
  }
};

const getCategory_Level = async (req, res) => {
  try {
    const result = await queryCategory_Level();
    if (result) {
      return res.status(200).json({ result });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin" });
  }
};

const getCategory_Scale = async (req, res) => {
  try {
    const result = await queryCategory_Scale();
    if (result) {
      return res.status(200).json({ result });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin" });
  }
};

const getCategory_Tags = async (req, res) => {
  try {
    const result = await queryCategory_Tags();
    if (result) {
      return res.status(200).json({ result });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin" });
  }
};
const getCatalog_Benefit = async (req, res) => {
  try {
    const result = await queryCatalog_Benefit();
    if (result) {
      return res.status(200).json({ result });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin" });
  }
};

const getCategory_Education = async (req, res) => {
  try {
    const result = await queryCategory_Education();
    if (result) {
      return res.status(200).json({ result });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin" });
  }
};

module.exports = {
  getCategory_Industry,
  getCategory_Jobfunction,
  getCatalog_Benefit,
  getCategory_Nation,
  getCategory_City,
  getCategory_District,
  getCategory_Language,
  getCategory_Level,
  getCategory_Scale,
  getCategory_Tags,
  getCategory_Education,
};
