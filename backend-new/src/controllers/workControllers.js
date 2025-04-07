const {
  queryGetLatestWork,
  queryGetWorkDetail,
  queryGetAllWorks,
  queryGetCountTotalWorks,
  queryGetWorkByUser,
  queryGetWorkBySearch,

  queryDeleteWorkByUser,
} = require("../models/workModel.js");

const getLatestWork = async (req, res) => {
  try {
    const work = await queryGetLatestWork();

    if (work) {
      return res.status(200).json({ work });
    }
  } catch (error) {
    console.log("Get Latest Work error:", error);
    res.status(500);
  }
};

const getWorkDetail = async (req, res) => {
  const postId = req.query.postId;
  try {
    const work = await queryGetWorkDetail(postId);

    if (work) {
      return res.status(200).json({ work });
    }
  } catch (error) {
    console.log("Get Work Detail error:", error);
    res.status(500);
  }
};

const getAllWorks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const work = await queryGetAllWorks(limit, offset);
    const total = await queryGetCountTotalWorks();
    const totalPages = Math.ceil(total[0].total / limit);

    if (work) {
      return res.status(200).json({ work, totalPages });
    }
    return res.status(404).json({ message: "No works found" });
  } catch (error) {
    console.log("Get All Works error:", error);
    res.status(500);
  }
};

const getWorkByUser = async (req, res) => {
  const userId = req.query.userId;
  try {
    const work = await queryGetWorkByUser(userId);

    if (work) {
      return res.status(200).json({ work });
    }
  } catch (error) {
    console.log("Get Work By User error:", error);
    res.status(500);
  }
};

const getWorkBySearch = async (req, res) => {
  const data = req.query;
  try {
    const work = await queryGetWorkBySearch(data);

    if (work) {
      return res.status(200).json({ work });
    }
  } catch (error) {
    console.log("Get Work By Search error:", error);
    res.status(500);
  }
};

const deleteWorkByUser = async (req, res) => {
  const { postID, id } = req.query;
  try {
    const work = await queryDeleteWorkByUser(id, postID);
    if (work) {
      const work = await queryGetWorkByUser(id);
      return res.status(200).json({
        message: "Xóa bài đăng thành công.",
        work,
      });
    }
  } catch (error) {
    console.log("Delete Work By User error:", error);
    res.status(500);
  }
};

module.exports = {
  getLatestWork,
  getWorkDetail,
  getAllWorks,
  getWorkByUser,
  getWorkBySearch,

  deleteWorkByUser,
};
