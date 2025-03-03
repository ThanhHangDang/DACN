const {
  queryGetUserInformation,
  queryGetExperienceByID,
  queryGetEducationByID,
  queryGetProjectByID,
  queryGetSkillByID,
  queryGetLanguageByID,
  queryGetCertificateByID,
  queryGetJobAppliedByID,
  queryGetJobSavedByID,
  queryGetFollowedCompanyByID,
  queryGetCompanyInformation,
  queryUpdateExpectedJob,
  queryUpdateCareerTarget,
  queryAddExperience,
  queryAddEducation,
  queryAddProject,
} = require("../models/userModels.js");

const getUserInformation = async (req, res) => {
  const id = req.query.id;
  try {
    const userInfor = await queryGetUserInformation(id);
    if (userInfor) {
      return res.status(200).json({ userInfor });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin user:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin user." });
  }
};

const getExperienceByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const experience = await queryGetExperienceByID(id);
    if (experience) {
      console.log(experience);
      return res.status(200).json({ experience });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin kinh nghiệm:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin kinh nghiệm." });
  }
};

const getEducationByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const education = await queryGetEducationByID(id);
    if (education) {
      console.log(education);
      return res.status(200).json({ education });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin học vấn:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin học vấn." });
  }
};

const getProjectByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const project = await queryGetProjectByID(id);
    if (project) {
      console.log(project);
      return res.status(200).json({ project });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin dự án:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin dự án." });
  }
};

const getSkillByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const skill = await queryGetSkillByID(id);
    if (skill) {
      console.log(skill);
      return res.status(200).json({ skill });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin kỹ năng:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin kỹ năng." });
  }
};

const getLanguageByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const language = await queryGetLanguageByID(id);
    if (language) {
      console.log(language);
      return res.status(200).json({ language });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin ngôn ngữ:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin ngôn ngữ." });
  }
};

const getCertificateByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const certificate = await queryGetCertificateByID(id);
    if (certificate) {
      console.log(certificate);
      return res.status(200).json({ certificate });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin chứng chỉ:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin chứng chỉ." });
  }
};

const getJobAppliedByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const jobApplied = await queryGetJobAppliedByID(id);
    if (jobApplied) {
      console.log(jobApplied);
      return res.status(200).json({ jobApplied });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin công việc đã ứng tuyển:", err);
    res
      .status(500)
      .json({ message: "Có lỗi khi lấy thông tin công việc đã ứng tuyển." });
  }
};

const getJobSavedByID = async (req, res) => {
  const id = req.query.id;
  try {
    const jobSaved = await queryGetJobSavedByID(id);
    if (jobSaved) {
      console.log(jobSaved);
      return res.status(200).json({ jobSaved });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin công việc đã lưu:", err);
    res
      .status(500)
      .json({ message: "Có lỗi khi lấy thông tin công việc đã lưu." });
  }
};

const getFollowedCompanyByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const company_id_Saved = await queryGetFollowedCompanyByID(id);

    if (company_id_Saved) {
      // Create an array of promises
      const companyPromises = company_id_Saved.map(async (element) => {
        return await queryGetCompanyInformation(element.employer_id);
      });

      // Wait for all promises to resolve
      const array_company = await Promise.all(companyPromises);
      console.log(array_company); // This will now log the populated array
      return res.status(200).json({ companySaved: array_company });
    } else {
      // Handle case where there are no saved companies
      return res.status(200).json({ companySaved: [] });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin công ty đã theo dõi:", err);
    res
      .status(500)
      .json({ message: "Có lỗi khi lấy thông tin công ty đã theo dõi." });
  }
};


const getCompanyInformation = async (req, res) => {
  try {
    const id = req.query.id;
    const companyInfor = await queryGetCompanyInformation(id);
    if (companyInfor) {
      console.log(companyInfor);
      return res.status(200).json({ companyInfor });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin công ty:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin công ty." });
  }
};

const updateExpectedJob = async (req, res) => {
  try {
    const { id, expectedJob } = req.body;
    console.log(id, expectedJob);
    const affectedRows = await queryUpdateExpectedJob(id, expectedJob);
    if (affectedRows) {
      const userInfor = await queryGetUserInformation(id);
      return res.status(200).json({
        userInfor,
        message: "Cập nhật công việc mong muốn thành công.",
      });
    }
  } catch (err) {
    console.error("Có lỗi khi thêm công việc mong muốn:", err);
    res.status(500).json({ message: "Có lỗi khi thêm công việc mong muốn." });
  }
};

const updateCareerTarget = async (req, res) => {
  try {
    const { id, careerTarget } = req.body;
    const affectedRows = await queryUpdateCareerTarget(id, careerTarget);
    if (affectedRows) {
      const userInfor = await queryGetUserInformation(id);
      return res.status(200).json({
        userInfor,
        message: "Cập nhật mục tiêu công việc thành công.",
      });
    }
  } catch (err) {
    console.error("Có lỗi khi cập nhật mục tiêu công việc:", err);
    res
      .status(500)
      .json({ message: "Có lỗi khi cập nhật mục tiêu công việc." });
  }
};

const addExperience = async (req, res) => {
  try {
    const { id, experience } = req.body;
    console.log(req.body);
    const affectedRows = await queryAddExperience(id, experience);
    if (affectedRows) {
      const experience = await queryGetExperienceByID(id);
      return res
        .status(200)
        .json({ experience, message: "Thêm kinh nghiệm thành công." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Thêm kinh nghiệm thất bại." });
  }
};

const addEducation = async (req, res) => {
  try {
    const { id, education } = req.body;
    const affectedRows = await queryAddEducation(id, education);
    if (affectedRows) {
      const education = await queryGetEducationByID(id);
      return res
        .status(200)
        .json({ education, message: "Thêm học vấn thành công." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Thêm học vấn thất bại." });
  }
};

const addProject = async (req, res) => {
  try {
    const { id, project } = req.body;
    const affectedRows = await queryAddProject(id, project);
    if (affectedRows) {
      const project = await queryGetProjectByID(id);
      return res
        .status(200)
        .json({ project, message: "Thêm dự án thành công." });
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteExperience = (req, res) => {
  try {
    const { id, id_delete } = req.query;
    console.log("dasdasdsadasdsadsad", req.query);
  } catch (error) {}
};

module.exports = {
  getUserInformation,
  getExperienceByID,
  getEducationByID,
  getProjectByID,
  getSkillByID,
  getLanguageByID,
  getCertificateByID,
  getJobAppliedByID,
  getJobSavedByID,
  getFollowedCompanyByID,
  getCompanyInformation,

  updateExpectedJob,
  updateCareerTarget,
  addExperience,
  addEducation,
  addProject,

  deleteExperience,
};
