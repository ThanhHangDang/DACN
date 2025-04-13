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
    const data = await queryGetLatestWork();

    if (data) {
      return res.status(200).json({data});
    }
  } catch (error) {
    console.log("Get Latest Work error:", error);
    res.status(500);
  }
};

const getWorkDetail = async (req, res) => {
  console.log("Get Work Detail:", req.query);
  const postId = req.query.post_id;
  try {
    const data = await queryGetWorkDetail(postId);

    if (data) {
      return res.status(200).json({data});
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
    const totalWorksPages = Math.ceil(total[0].total / limit);

    if (work) {
      return res.status(200).json({data:{work, totalWorksPages}});
    }
    return res.status(404).json({ message: "No works found" });
  } catch (error) {
    console.log("Get All Works error:", error);
    res.status(500);
  }
};

const getWorkByUser = async (req, res) => {
  console.log("Get Work By User:", req.query);
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
  const searchData = req.query;
  const paging_size = Number(searchData?.paging_size)|| 10;
  // console.log("dang Search Job ", paging);
  try {
    const data = await queryGetWorkBySearch(searchData);
    if (data) {
      const total_count = data.length > 0 ? data[0].total_count : 0;
      console.log("total_count ", total_count); 
      const totalWorksPages = Math.ceil(total_count / paging_size);
      console.log("totalPages ", totalWorksPages);
      return res.status(200).json({work:data,totalWorksPages });
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
