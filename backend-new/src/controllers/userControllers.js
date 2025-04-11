const { uploadToS3 } = require("../middleware/imageUpload.js");
const {
  queryGetListEmployee,
  queryGetEmployeeDetail,

  // queryGetUserInformation,
  // queryGetExperienceByID,
  // queryGetEducationByID,
  // queryGetProjectByID,
  // queryGetSkillByID,
  // queryGetLanguageByID,
  // queryGetCertificateByID,
  // queryGetJobAppliedByID,
  // queryGetJobSavedByID,
  // queryGetFollowedCompanyByID,
  queryGetCompanyInformation,
  queryUpdateJobseekerProfileImage,
  // queryUpdateJobseekerProfile,
  // queryUpdateExpectedJob,
  // queryUpdateCareerTarget,
  // queryAddExperience,
  // queryAddEducation,
  // queryAddProject,
  // queryAddSkill,
  // queryAddLanguage,
  // queryAddCertification,

  // queryDeleteExperience,
  // queryDeleteEducation,
  // queryDeleteProject,
  // queryDeleteSkill,
  // queryDeleteLanguage,
  // queryDeleteCertification,'
  queryItemProfile,
  queryAddItemProfile,  
  queryDeleteItemProfile,
  queryUpdateItemProfile,


  queryGetNotificationByID,
} = require("../models/userModels.js");

const { queryGetWorkDetail } = require("../models/workModel.js");

const getListEmployee = async (req, res) => {
  try {
    const listEmployee = await queryGetListEmployee();
    if (listEmployee) {
      return res.status(200).json({ listEmployee });
    } else {
      return res.status(200).json({ listEmployee: [] });
    }
  } catch (err) {
    console.log("Có lỗi khi lấy danh sách nhân viên:", err);
    res.status(500).json({ message: "Có lỗi khi lấy danh sách nhân viên." });
  }
};

const getEmployeeDetail = async (req, res) => {
  const id = req.query.id;
  try {
    const employeeDetail = await queryGetEmployeeDetail(id);
    if (employeeDetail) {
      return res.status(200).json({ employeeDetail });
    }
  } catch (err) {
    console.log("Có lỗi khi lấy thông tin nhân viên:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin nhân viên." });
  }
};

// const getUserInformation = async (req, res) => {
//   const id = req.query.id;
//   try {
//     const userInfor = await queryGetUserInformation(id);
//     if (userInfor) {
//       return res.status(200).json({ userInfor });
//     }
//   } catch (err) {
//     console.log("Có lỗi khi lấy thông tin user:", err);
//     res.status(500).json({ message: "Có lỗi khi lấy thông tin user." });
//   }
// };

// const getExperienceByID = async (req, res) => {
//   const id = req.query.id;
//   try {
//     const experience = await queryGetExperienceByID(id);
//     if (experience) {
//       return res.status(200).json({ experience });
//     }
//   } catch (err) {
//     console.log("Có lỗi khi lấy thông tin kinh nghiệm:", err);
//     res.status(500).json({ message: "Có lỗi khi lấy thông tin kinh nghiệm." });
//   }
// };

// const getEducationByID = async (req, res) => {
//   const id = req.query.id;
//   try {
//     const education = await queryGetEducationByID(id);
//     if (education) {
//       return res.status(200).json({ education });
//     }
//   } catch (err) {
//     console.log("Có lỗi khi lấy thông tin học vấn:", err);
//     res.status(500).json({ message: "Có lỗi khi lấy thông tin học vấn." });
//   }
// };

// const getProjectByID = async (req, res) => {
//   const id = req.query.id;
//   try {
//     const project = await queryGetProjectByID(id);
//     if (project) {
//       return res.status(200).json({ project });
//     }
//   } catch (err) {
//     console.log("Có lỗi khi lấy thông tin dự án:", err);
//     res.status(500).json({ message: "Có lỗi khi lấy thông tin dự án." });
//   }
// };

// const getSkillByID = async (req, res) => {
//   const id = req.query.id;
//   try {
//     const skill = await queryGetSkillByID(id);
//     if (skill) {
//       return res.status(200).json({ skill });
//     }
//   } catch (err) {
//     console.log("Có lỗi khi lấy thông tin kỹ năng:", err);
//     res.status(500).json({ message: "Có lỗi khi lấy thông tin kỹ năng." });
//   }
// };

// const getLanguageByID = async (req, res) => {
//   const id = req.query.id;
//   try {
//     const language = await queryGetLanguageByID(id);
//     if (language) {
//       return res.status(200).json({ language });
//     }
//   } catch (err) {
//     console.log("Có lỗi khi lấy thông tin ngôn ngữ:", err);
//     res.status(500).json({ message: "Có lỗi khi lấy thông tin ngôn ngữ." });
//   }
// };

// const getCertificateByID = async (req, res) => {
//   const id = req.query.id;
//   try {
//     const certificate = await queryGetCertificateByID(id);
//     if (certificate) {
//       return res.status(200).json({ certificate });
//     }
//   } catch (err) {
//     console.log("Có lỗi khi lấy thông tin chứng chỉ:", err);
//     res.status(500).json({ message: "Có lỗi khi lấy thông tin chứng chỉ." });
//   }
// };

// const getJobAppliedByID = async (req, res) => {
//   const id = req.query.id;

//   try {
//     const jobApplied = await queryGetJobAppliedByID(id);
//     if (jobApplied) {
//       const jobPromises = jobApplied.map(async (element) => {
//         return await queryGetWorkDetail(element.job_id);
//       });
//       const array_job = await Promise.all(jobPromises);
//       return res.status(200).json({ jobApplied: array_job });
//     } else {
//       return res.status(200).json({ jobApplied: [] });
//     }
//   } catch (err) {
//     console.log("Có lỗi khi lấy thông tin công việc đã ứng tuyển:", err);
//     res
//       .status(500)
//       .json({ message: "Có lỗi khi lấy thông tin công việc đã ứng tuyển." });
//   }
// };

// const getJobSavedByID = async (req, res) => {
//   const id = req.query.id;
//   try {
//     const jobSaved = await queryGetJobSavedByID(id);
//     if (jobSaved) {
//       const jobPromises = jobSaved.map(async (element) => {
//         return await queryGetWorkDetail(element.job_id);
//       });
//       const array_job = await Promise.all(jobPromises);
//       return res.status(200).json({ jobSaved: array_job });
//     } else {
//       return res.status(200).json({ jobSaved: [] });
//     }
//   } catch (err) {
//     console.log("Có lỗi khi lấy thông tin công việc đã lưu:", err);
//     res
//       .status(500)
//       .json({ message: "Có lỗi khi lấy thông tin công việc đã lưu." });
//   }
// };

// const getFollowedCompanyByID = async (req, res) => {
//   const id = req.query.id;
//   try {
//     const company_id_Saved = await queryGetFollowedCompanyByID(id);

//     if (company_id_Saved) {
//       // Create an array of promises
//       const companyPromises = company_id_Saved.map(async (element) => {
//         return await queryGetCompanyInformation(element.employer_id);
//       });

//       // Wait for all promises to resolve
//       const array_company = await Promise.all(companyPromises);
//       return res.status(200).json({ companySaved: array_company });
//     } else {
//       // Handle case where there are no saved companies
//       return res.status(200).json({ companySaved: [] });
//     }
//   } catch (err) {
//     console.log("Có lỗi khi lấy thông tin công ty đã theo dõi:", err);
//     res
//       .status(500)
//       .json({ message: "Có lỗi khi lấy thông tin công ty đã theo dõi." });
//   }
// };

const getCompanyInformation = async (req, res) => {
  try {
    const id = req.query.id;
    const companyInfor = await queryGetCompanyInformation(id);
    if (companyInfor) {
      return res.status(200).json({ companyInfor });
    } else {
      return res.status(200).json({ companyInfor: {} });
    }
  } catch (err) {
    console.log("Có lỗi khi lấy thông tin công ty:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin công ty." });
  }
};

const updateJobseekerProfileImage = async (req, res) => {
  try {
    const { id } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Không có file ảnh." });
    }

    const imageUrl = await uploadToS3(req.file);
    const affectedRows = await queryUpdateJobseekerProfileImage(id, imageUrl);
    if (affectedRows !== 0) {
      const type = "basic"; // them type de tuong thich ham moi
      const userInfor = await queryItemProfile(type, data);
      return res.status(200).json({
        data: userInfor,
        message: "Cập nhật ảnh đại diện thành công.",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Lỗi server khi cập nhật ảnh.", err });
  }
};
/*
// const updateExpectedJob = async (req, res) => {
//   try {
//     const { id, expectedJob } = req.body;
//     const affectedRows = await queryUpdateExpectedJob(id, expectedJob);
//     if (affectedRows) {
//       const userInfor = await queryGetUserInformation(id);
//       return res.status(200).json({
//         userInfor,
//         message: "Cập nhật công việc mong muốn thành công.",
//       });
//     }
//   } catch (err) {
//     console.error("Có lỗi khi thêm công việc mong muốn:", err);
//     res.status(500).json({ message: "Có lỗi khi thêm công việc mong muốn." });
//   }
// };

// const updateJobseekerProfile = async (req, res) => {
//   try {
//     const { id, profile } = req.body;
//     const affectedRows = await queryUpdateJobseekerProfile(id, profile);
//     if (affectedRows) {
//       const userInfor = await queryGetUserInformation(id);
//       return res.status(200).json({
//         userInfor,
//         message: "Cập nhật hồ sơ thành công.",
//       });
//     }
//   } catch (err) {
//     console.error("Có lỗi khi cập nhật hồ sơ:", err);
//     res.status(500).json({ message: "Có lỗi khi khi cập nhật hồ sơ." });
//   }
// };

// const updateCareerTarget = async (req, res) => {
//   try {
//     const { id, careerTarget } = req.body;
//     const affectedRows = await queryUpdateCareerTarget(id, careerTarget);
//     if (affectedRows) {
//       const userInfor = await queryGetUserInformation(id);
//       return res.status(200).json({
//         userInfor,
//         message: "Cập nhật mục tiêu công việc thành công.",
//       });
//     }
//   } catch (err) {
//     console.error("Có lỗi khi cập nhật mục tiêu công việc:", err);
//     res
//       .status(500)
//       .json({ message: "Có lỗi khi cập nhật mục tiêu công việc." });
//   }
// };

// const addExperience = async (req, res) => {
//   try {
//     const { id, experience } = req.body;
//     const affectedRows = await queryAddExperience(id, experience);
//     if (affectedRows) {
//       const experience = await queryGetExperienceByID(id);
//       return res
//         .status(200)
//         .json({ experience, message: "Thêm kinh nghiệm thành công." });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Thêm kinh nghiệm thất bại." });
//   }
// };

// const addEducation = async (req, res) => {
//   try {
//     const { id, education } = req.body;
//     const affectedRows = await queryAddEducation(id, education);
//     if (affectedRows) {
//       const education = await queryGetEducationByID(id);
//       return res
//         .status(200)
//         .json({ education, message: "Thêm học vấn thành công." });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Thêm học vấn thất bại." });
//   }
// };

// const addProject = async (req, res) => {
//   try {
//     const { id, project } = req.body;
//     const affectedRows = await queryAddProject(id, project);
//     if (affectedRows) {
//       const project = await queryGetProjectByID(id);
//       return res
//         .status(200)
//         .json({ project, message: "Thêm dự án thành công." });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Thêm dự án thất bại." });
//   }
// };

// const addSkill = async (req, res) => {
//   try {
//     const { id, skill } = req.body;
//     const affectedRows = await queryAddSkill(id, skill);
//     if (affectedRows > 0) {
//       const skill = await queryGetSkillByID(id);
//       return res
//         .status(200)
//         .json({ skill, message: "Thêm kỹ năng thành công." });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Thêm kỹ năng thất bại." });
//   }
// };

// const addLanguage = async (req, res) => {
//   try {
//     const { id, language } = req.body;
//     const affectedRows = await queryAddLanguage(id, language);
//     if (affectedRows > 0) {
//       const language = await queryGetLanguageByID(id);
//       return res
//         .status(200)
//         .json({ language, message: "Thêm ngôn ngữ thành công." });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Thêm ngôn ngữ thất bại." });
//   }
// };

// const addCertification = async (req, res) => {
//   try {
//     const { id, certification } = req.body;
//     const affectedRows = await queryAddCertification(id, certification);
//     if (affectedRows) {
//       const certificate = await queryGetCertificateByID(id);
//       return res
//         .status(200)
//         .json({ certificate, message: "Thêm chứng chỉ thành công." });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Thêm chứng chỉ thất bại." });
//   }
// };

// const deleteExperience = async (req, res) => {
//   try {
//     const { id, id_delete } = req.query;
//     const affectedRows = await queryDeleteExperience(id, id_delete);
//     if (affectedRows) {
//       const experience = await queryGetExperienceByID(id);
//       return res
//         .status(200)
//         .json({ experience, message: "Xóa kinh nghiệm thành công." });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Xóa kinh nghiệm thất bại." });
//   }
// };

// const deleteEducation = async (req, res) => {
//   try {
//     const { id, id_delete } = req.query;
//     const affectedRows = await queryDeleteEducation(id, id_delete);
//     if (affectedRows) {
//       const education = await queryGetEducationByID(id);
//       return res
//         .status(200)
//         .json({ education, message: "Xóa học vấn thành công." });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Xóa học vấn thất bại." });
//   }
// };

// const deleteProject = async (req, res) => {
//   try {
//     const { id, id_delete } = req.query;
//     const affectedRows = await queryDeleteProject(id, id_delete);
//     if (affectedRows) {
//       const project = await queryGetProjectByID(id);
//       return res
//         .status(200)
//         .json({ project, message: "Xóa dự án thành công." });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Xóa dự án thất bại." });
//   }
// };

// const deleteSkill = async (req, res) => {
//   try {
//     const { id, id_delete } = req.query;
//     const affectedRows = await queryDeleteSkill(id, id_delete);
//     if (affectedRows) {
//       const skill = await queryGetSkillByID(id);
//       return res
//         .status(200)
//         .json({ skill, message: "Xóa kỹ năng thành công." });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Xóa kỹ năng thất bại." });
//   }
// };

// const deleteLanguage = async (req, res) => {
//   try {
//     const { id, id_delete } = req.query;
//     const affectedRows = await queryDeleteLanguage(id, id_delete);
//     if (affectedRows) {
//       const language = await queryGetLanguageByID(id);
//       return res
//         .status(200)
//         .json({ language, message: "Xóa ngôn ngữ thành công." });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Xóa ngôn ngữ thất bại." });
//   }
// };

// const deleteCertification = async (req, res) => {
//   try {
//     const { id, id_delete } = req.query;
//     const affectedRows = await queryDeleteCertification(id, id_delete);
//     if (affectedRows) {
//       const certificate = await queryGetCertificateByID(id);
//       return res
//         .status(200)
//         .json({ certificate, message: "Xóa chứng chỉ thành công." });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Xóa chứng chỉ thất bại." });
//   }
// };
*/

// type: experience, education, project, skill, language, certification, basic, cv
const getItemProfile = async (req, res) => {
  // type: basic, experience, education, project, skill, language, certification, cv: xem cu the file table_for_jobseeker
  const { type, profile_id } = req.query;
  try {
    // console.log(req);
    console.log("dang lay info cua jobseeker bang new query", type, profile_id);
    if (!type || !profile_id) {
      return res.status(400).json({ message: "Thiếu thông tin." });
    }
    const userInfor = await queryItemProfile(type, profile_id);
    if (userInfor) {
      return res.status(200).json({data: userInfor });
    } else {
      return res.status(200).json({ data: [] });
    }
  } catch (err) {
    console.log("Có lỗi khi lấy thông tin hồ sơ:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin hồ sơ." });
  }
};




const updateItemProfile = async (req, res, next) => {  
  try {
    const {type, data} = req.body;
    if (!type || !data) {
      return res.status(400).json({ message: "Thiếu thông tin." });
    }
    data['create_at'] = new Date();
    const affectedRows = await queryUpdateItemProfile(type, data);
    if (affectedRows === 0) {
      return res.status(500).json({ message: "Cập nhật không thành công", err });
    }
    const userInfor = await queryItemProfile(type, data.profiel_id);
    return res.status(200).json({
      data: userInfor,
      message: "Cập nhật hồ sơ thành công.",
    });
    // return res.success("Update thành công.");

  } catch (err) {
    return res.status(500).json({ message: "Lỗi server", err });
  }
};

const deleteItemProfile = async (req, res, next) => {
  try {
    const {type, data} = req.body;
    if (!type || !data) {
      return res.status(400).json({ message: "Thiếu thông tin." });
    }
        // console.log("queryDeleteItemProfile", type, data);
    const affectedRows = await queryDeleteItemProfile(type, data);
    if (affectedRows === 0) {
      return res.status(500).json({ message: "Xóa không thành công", err });
    }
    // return res.success("Xóa thành công.");
    const userInfor = await queryItemProfile(type, data.profiel_id);
    return res.status(200).json({
      data: userInfor,
      message: "Cập nhật hồ sơ thành công.",
    });

  } catch (err) {
    return res.status(500).json({ message: "Lỗi server", err });
  }
};

const addItemProfile = async (req, res, next) => {
  try {
    const {type, data} = req.body;
    if (!type || !data) {
      return res.status(400).json({ message: "Thiếu thông tin." });
    }
    data['create_at'] = new Date();
    const affectedRows = await queryAddItemProfile(type, data);
    if (affectedRows === 0) {
      return next(new Error("Thêm không thành công."));
    }
    const userInfor = await queryItemProfile(type, data.profiel_id);
    return res.status(200).json({
      data: userInfor,
      message: "Cập nhật hồ sơ thành công.",
    });

  } catch (err) {
    return res.status(500).json({ message: "Lỗi server", err });
  }
};
const getNotificationByID = async (req, res) => {
  const id = req.query.id;
  try {
    const notification = await queryGetNotificationByID(id);
    if (notification) {
      return res.status(200).json({ notification });
    }
  } catch (err) {
    console.error("Có lỗi khi lấy thông tin thông báo:", err);
    res.status(500).json({ message: "Có lỗi khi lấy thông tin thông báo." });
  }
};

module.exports = {
  getListEmployee,
  getEmployeeDetail,

  // getUserInformation,
  // getExperienceByID,
  // getEducationByID,
  // getProjectByID,
  // getSkillByID,
  // getLanguageByID,
  // getCertificateByID,
  // getJobAppliedByID,
  // getJobSavedByID,
  // getFollowedCompanyByID,
  getCompanyInformation,

  updateJobseekerProfileImage,
  // updateJobseekerProfile,
  // updateExpectedJob,
  // updateCareerTarget,

  // addExperience,
  // addEducation,
  // addProject,
  // addSkill,
  // addLanguage,
  // addCertification,

  // deleteExperience,
  // deleteEducation,
  // deleteProject,
  // deleteSkill,
  // deleteLanguage,
  // deleteCertification,
  getItemProfile,
  deleteItemProfile,
  addItemProfile,
  updateItemProfile,


  getNotificationByID,
};
