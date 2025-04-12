import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useAddItemProfileMutation,useDeleteItemProfileMutation,useUpdateItemProfileMutation,useGetItemProfileQuery } from "../../../redux_toolkit/JobseekerApi.js";
import { useGetLanguagesQuery,useGetEducationQuery,useGetTagsQuery } from "../../../redux_toolkit/CategoryApi.js";
import formatDateToDDMMYYYY from "../../../utils/formatDate.js";
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Invalid date
    
    // Thêm offset múi giờ để đảm bảo ngày được hiển thị đúng
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};
export default function YourCVwithUs() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {data:userInformation} = useGetItemProfileQuery({type: "Basic",profile_id: user?.user?.id});
  const {data:listExp} = useGetItemProfileQuery({type: "experience",profile_id: user?.user?.id});
  const {data:listEducation} = useGetItemProfileQuery({type: "education",profile_id: user?.user?.id});
  const {data:listProject} = useGetItemProfileQuery({type: "project",profile_id: user?.user?.id});
  const {data:listSkill} = useGetItemProfileQuery({type: "skill",profile_id: user?.user?.id});
  const {data:listLanguage} = useGetItemProfileQuery({type: "language",profile_id: user?.user?.id});
  const {data:listCertification} = useGetItemProfileQuery({type: "certification",profile_id: user?.user?.id});
  const [addItemProfile] = useAddItemProfileMutation();
  const [deleteItemProfile] = useDeleteItemProfileMutation();
  const [updateProfileItem] = useUpdateItemProfileMutation();

  const {data: edu} = useGetEducationQuery();
  const {data: tags} = useGetTagsQuery();
  const {data: lang} = useGetLanguagesQuery();
  console.log("listLanguage: ", listLanguage);
  const [experience, setExperience] = useState({
    profile_experience_id: "",
    exp_title: "",
    exp_company: "",
    exp_from: "",
    exp_to: "",
    exp_description: "",
  });

  const [education, setEducation] = useState({
    profile_education_id: "",
    major: "",
    school: "",
    from_: "",
    to_: "",
    education_id: "1",
  });

  const [dataDeleteModal, setDataDeleteModal] = useState({
    type: "",
    data:{}
  });

  const [careerTarget, setCareerTarget] = useState("");

  const [project, setProject] = useState({
    project_name: "",
    project_from: "",
    project_to: "",
    project_description: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [skillAdd, setSkillAdd] = useState([]);

  const [languageInput, setLanguageInput] = useState("");    const skillAdd_ID = [];
  skillAdd.forEach((item) => {skillAdd_ID.push(item.tag_id)});
  const [languageAdd, setLanguageAdd] = useState([]);

  const [certification, setCertification] = useState({
    profile_certifications_id: "",
    certifications: "",
    month_: "",
  });

  const [modalUpdateID, setModalUpdateID] = useState("");

  const [isAdd, setIsAdd] = useState(true);

  const handleUpdateCarreerTarget = async () => {
    try{
      await updateProfileItem({type:"Basic",data:{profile_id:userInformation?.jobseeker_id,career_target:careerTarget}}).unwrap();
    }
    catch (error) {
      console.error("Error adding Carreer Target:", error);
      toast.error("Update Carreer Target thất bại!");
    }
  };

  const handleAddExperience = async () => {
    try {
    if (isAdd) {
      await addItemProfile({type:"experience",data:{profile_id:userInformation?.jobseeker_id,...experience}}).unwrap();
      toast.success("Thêm Experience thành công!");
    } else {
      await updateProfileItem({type:"experience",data:{profile_id:userInformation?.jobseeker_id,...experience}}).unwrap();
      toast.success("Update Experience thành công!");
    }

    setExperience({
      profile_experience_id: "",
      exp_title: "",
      exp_company: "",
      exp_from: "",
      exp_to: "",
      exp_description: "",
    });
  }
  catch (error) {
      console.error("Error adding experience:", error);
      toast.error("Thêm kinh nghiệm thất bại!");
    }
  };

  const handleAddEducation = async () => {
    try {
    if (isAdd) {
     await addItemProfile({type:"education",data:{profile_id:userInformation?.jobseeker_id,...education}}).unwrap();
     toast.success("Thêm Education thành công!");
    } else {
    await  updateProfileItem({type:"education",data:{profile_id:userInformation?.jobseeker_id,...education}}).unwrap();
    toast.success("Update Education thành công!");
    }
    setEducation({
      profile_education_id: "",
      major: "",
      school: "",
      from_: "",
      endYear: "",
      to_: "",
    });
  }
  catch (error) {
      console.error("Error adding education:", error);
      toast.error("Thêm học vấn thất bại!");
    }
  };

  const handleAddProject = async () => {
    try {
    if (isAdd) {
      await addItemProfile({type:"project",data:{profile_id:userInformation?.jobseeker_id,...project}}).unwrap();
      toast.success("Thêm Project thành công!");
    } else { 
      await  updateProfileItem({type:"project",data:{profile_id:userInformation?.jobseeker_id,...project}}).unwrap();
      toast.success("Update Project thành công!");
    }
    setProject({
      profile_project_id: "",
      project_name: "",
      project_from: "",
      project_to: "",
      project_description: "",
    });
  }
  catch (error) {
      console.error("Error adding project:", error);
      toast.error("Thêm project thất bại!");
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkillAdd((prev) => prev.filter((item) => item !== skill));
  };

  const handleAddSkillOptions = (skill) => {
    if (!skillAdd.includes(skill)) {
      setSkillAdd([...skillAdd, skill]);
    }
    setSkillInput("");
  };

  const handleAddSkill = async () => {
    try {
    const skillAdd_ID = [];
    skillAdd.forEach((item) => {skillAdd_ID.push(item.tag_id)});
    await addItemProfile({type:"skill",data:{profile_id:userInformation?.jobseeker_id,values:skillAdd_ID}}).unwrap();
    setSkillAdd([]);
    setSkillInput("");
    toast.success("Thêm skill thành công!");
    }
    catch (error) {
      console.error("Error adding skill:", error);
      toast.error("Thêm skillthất bại!");
    }
  };

  const handleRemoveLanguage = (language) => {
    setLanguageAdd((prev) => prev.filter((item) => item !== language));
  };

  const handleAddLanguageOptions = (language) => {
    if (!languageAdd.includes(language)) {
      setLanguageAdd([...languageAdd, language]);
    }
    setLanguageInput("");
  };

  const handleAddLanguage = async () => {
    try {
    const languageID = [];
    languageAdd.forEach((item) => {languageID.push(item.language_id)});
    await addItemProfile({type:"language",data:{profile_id:userInformation?.jobseeker_id,values:languageID}}).unwrap();
    toast.success("Thêm Language  thành công!");
    setLanguageAdd([]);
    setLanguageInput("");
    }
    catch (error) {
      console.error("Error adding Language:", error);
      toast.error("Thêm ngoại ngữ thất bại!");
    }
  };

  const handleAddCertification = async () => {
    try {
      if (isAdd) {
        await addItemProfile({
          type: "certification",
          data: {
            profile_id: userInformation?.jobseeker_id,
            ...certification
          }
        }).unwrap();
      toast.success("Thêm Certification thành công!");
      } else {
        await updateProfileItem({
          type: "certification",
          data: {
            profile_id: userInformation?.jobseeker_id,
            ...certification
            // certification đã có profile_certifications_id nhờ bạn đã thêm ở trên
          }
        }).unwrap();
        toast.success("Cập nhật Certification thành công!");
      }
  
      setCertification({
        profile_certifications_id: "", // Reset ID khi hoàn thành
        certifications: "",
        month_: "",
      });
    }
    catch (error) {
      console.error("Error adding Certification:", error);
      toast.error("Thêm chứng chỉ thất bại!");
    }
  };

  const handleDeleteProfileItem = async () => {
    try {
    console.log("dataDeleteModal: ", dataDeleteModal);
   await deleteItemProfile(dataDeleteModal).unwrap();
   toast.success("Xóa thành công!");
    }
    catch (error) {
      console.error("Error Delete:", error);
      toast.error("Xóa thất bại!");
    }
  };


  return (
    <div>
      {/* Modal mục tiêu nghề nghiệp */}
      <div
        className="modal fade"
        id="careerTarget"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        // aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Mục tiêu nghề nghiệp
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="benefits" className="form-label">
                    Mục tiêu nghề nghiệp
                  </label>
                  <textarea
                    className="form-control"
                    id="benefits"
                    rows={4}
                    placeholder="Nhập mục tiêu nghề nghiệp"
                    defaultValue={
                      careerTarget
                        ? careerTarget
                        : userInformation?.career_target
                    }
                    onChange={(e) => setCareerTarget(e.target.value)}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleUpdateCarreerTarget}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal mục tiêu nghề nghiệp */}

      {/* Modal thêm kinh nghiệm */}
      <div
        className="modal fade"
        id="addExperience"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        // aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Thêm kinh nghiệm
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <div className="col-md-7">
                    <label htmlFor="postTitle" className="form-label">
                      Công việc
                    </label>
                    <input
                      value={experience.exp_title || ""}  // Thêm || "" để tránh lỗi undefined
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập công việc"
                      onChange={(e) => {
                        setExperience({ ...experience, exp_title: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="postTitle" className="form-label">
                      Công ty
                    </label>
                    <input
                      value={experience.exp_company}
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập công ty"
                      onChange={(e) => {
                        setExperience({
                          ...experience,
                          exp_company: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="startYear" className="form-label">
                      Từ
                    </label>
                    <input
                      value={experience.exp_from}
                      type="date"
                      min="1960"
                      className="form-control"
                      id="startYear"
                      placeholder="Nhập năm bắt đầu"
                      onChange={(e) => {
                        setExperience({
                          ...experience,
                          exp_from: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="endYear" className="form-label">
                      Đến
                    </label>
                    <input
                      value={experience.exp_to}
                      type="date"
                      min="1960"
                      className="form-control"
                      id="endYear"
                      placeholder="Nhập năm kết thúc"
                      onChange={(e) => {
                        setExperience({
                          ...experience,
                          exp_to: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="benefits" className="form-label">
                    Mô tả
                  </label>
                  <textarea
                    value={experience.exp_description}
                    className="form-control"
                    id="benefits"
                    rows={4}
                    placeholder="Nhập mô tả công việc"
                    onChange={(e) => {
                      setExperience({
                        ...experience,
                        exp_description: e.target.value,
                      });
                    }}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddExperience}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal thêm kinh nghiệm */}

      {/* Modal thêm học vấn */}
      <div
        className="modal fade"
        id="addEducation"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        // aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Thêm học vấn
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <div className="col-md-7">
                    <label htmlFor="postTitle" className="form-label">
                      Chuyên ngành
                    </label>
                    <input
                      value={education.major}
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập chuyên ngành"
                      onChange={(e) => {
                        setEducation({ ...education, major: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="postTitle" className="form-label">
                      Trường
                    </label>
                    <input
                      value={education.school}
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập Trường Đại học"
                      onChange={(e) => {
                        setEducation({ ...education, school: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="field" className="form-label">
                      Cấp bậc
                    </label>
                    <select
                      value={education.education_id}
                      className="form-select"
                      id="field"
                      onChange={(e) => {
                        setEducation({
                          ...education,
                          education_id: e.target.value,
                        });
                      }}
                    >
                      {edu?.map((option) => (
                        <option
                          value={option.education_id}
                          key={option.education_id}
                        >
                          {option.education_title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="startYear" className="form-label">
                      Từ
                    </label>
                    <input
                      value={education.from_}
                      type="date"
                      className="form-control"
                      id="startYear"
                      placeholder="Nhập năm bắt đầu"
                      min="1960"
                      onChange={(e) => {
                        setEducation({
                          ...education,
                          from_: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="endYear" className="form-label">
                      Đến
                    </label>
                    <input
                      value={education.to_}
                      type="date"
                      className="form-control"
                      id="endYear"
                      placeholder="Nhập năm kết thúc"
                      min="1960"
                      onChange={(e) => {
                        setEducation({ ...education, to_: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddEducation}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal thêm học vấn */}

      {/* Modal thêm dự án */}
      <div
        className="modal fade"
        id="addProject"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        // aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Thêm dự án
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <div className="">
                    <label htmlFor="postTitle" className="form-label">
                      Dự án
                    </label>
                    <input
                      value={project.project_name}
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập dự án"
                      onChange={(e) => {
                        setProject({
                          ...project,
                          project_name: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="startYear" className="form-label">
                      Từ
                    </label>
                    <input
                      value={project.project_from}
                      type="date"
                      className="form-control"
                      id="startYear"
                      placeholder="Nhập năm bắt đầu"
                      onChange={(e) => {
                        setProject({
                          ...project,
                          project_from: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="endYear" className="form-label">
                      Đến
                    </label>
                    <input
                      value={project.project_to}
                      type="date"
                      className="form-control"
                      id="endYear"
                      placeholder="Nhập năm kết thúc"
                      onChange={(e) => {
                        setProject({
                          ...project,
                          project_to: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="benefits" className="form-label">
                    Mô tả
                  </label>
                  <textarea
                    value={project.project_description}
                    className="form-control"
                    id="benefits"
                    rows={4}
                    placeholder="Nhập mô tả dự án"
                    // defaultValue={""}
                    onChange={(e) => {
                      setProject({
                        ...project,
                        project_description: e.target.value,
                      });
                    }}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddProject}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal thêm dự án */}

      {/* Modal thêm kỹ năng */}
      <div
        className="modal fade"
        id="addSkill"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        // aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Thêm kỹ năng
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="field" className="form-label">
                      Kỹ năng
                    </label>
                    <input
                      value={skillInput}
                      type="text"
                      className="form-control"
                      placeholder="Nhập kỹ năng"
                      onChange={(e) => {
                        setSkillInput(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && skillInput.trim() !== "") {
                          e.preventDefault();
                          handleAddSkillOptions(skillInput);
                        }
                      }}
                    />
                    <ul className="list-group">
                      {skillInput !== "" && tags
                        ?.filter((tag) =>
                          tag.tags_content
                            .toLowerCase()
                            .includes(skillInput.toLowerCase())
                        )
                        .map((skill) => (
                          <li
                            key={skill.tag_id}
                            className="list-group-item list-group-item-action ms-2 mr-2"
                            onClick={() => handleAddSkillOptions(skill)}
                          >
                            {skill.tags_content}
                          </li>
                        ))}
                    </ul>
                    <div className="mt-2">
                      {skillAdd?.map((skill) => (
                        <span
                          key={skill.tag_id}
                          className="badge bg-primary me-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          {skill.tags_content}{" "}
                          <span className="ms-1">&times;</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleAddSkill}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal thêm kỹ năng */}

      {/* Modal thêm ngoại ngữ */}
      <div
        className="modal fade"
        id="addLanguage"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        // aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Thêm ngoại ngữ
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="jobTitle" className="form-label">
                    Ngoại ngữ
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="jobTitle"
                    placeholder="Nhập ngoại ngữ"
                    value={languageInput}
                    onChange={(e) => setLanguageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && languageInput.trim() !== "") {
                        e.preventDefault();
                        handleAddLanguageOptions(languageInput);
                      }
                    }}
                  />
                  <ul className="list-group">
                    {lang
                      ?.filter((language) =>
                        language.metric_display
                          .toLowerCase()
                          .includes(languageInput.toLowerCase())
                      )
                      .map((language) => (
                        <>
                          {languageInput !== "" && (
                            <li
                              key={language.language_id}
                              className="list-group-item list-group-item-action ms-2 mr-2"
                              onClick={() => handleAddLanguageOptions(language)}
                            >
                              {language.metric_display}
                            </li>
                          )}
                        </>
                      ))}
                  </ul>
                  <div className="mt-2">
                    {languageAdd?.map((language) => (
                      <span
                        key={language.language_id}
                        className="badge bg-primary me-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleRemoveLanguage(language);
                        }}
                      >
                        {language.metric_display}{" "}
                        <span className="ms-1">&times;</span>
                      </span>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleAddLanguage}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal thêm ngoại ngữ */}

      {/* Modal thêm chứng chỉ */}
      <div
        className="modal fade"
        id="addCer"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        // aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Thêm chứng chỉ
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="jobTitle" className="form-label">
                    Chứng chỉ
                  </label>
                  <input
                    value={certification?.certifications || ""}
                    type="text"
                    className="form-control"
                    id="jobTitle"
                    placeholder="Nhập chứng chỉ"
                    onChange={(e) => {
                      setCertification({
                        ...certification,
                        certifications: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="mb-3 col-md-4">
                  <label htmlFor="jobTitle" className="form-label">
                    Ngày cấp
                  </label>
                  <input
                    value={certification.month_}
                    type="date"
                    className="form-control"
                    id="jobTitle"
                    placeholder="Nhập chứng chỉ"
                    onChange={(e) => {
                      setCertification({
                        ...certification,
                        month_: e.target.value,
                      });
                    }}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleAddCertification}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal thêm chứng chỉ */}

      {/* Modal delete */}
      <div
        className="modal fade"
        id="confirmDeleteModal"
        tabIndex={-1}
        // aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          {" "}
          {/* Căn giữa và nhỏ lại */}
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Xác nhận xóa
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className=" modal-body justify-content-center align-items-center modal-dialog-centered">
              {/* Căn giữa hai nút */}
              <button
                type="button"
                className="btn btn-secondary me-3"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteProfileItem}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal delete */}

      <div className="bg-light rounded-2 me-2 my-2 p-4">
        <h5 className="fw-bold">Hoàn chỉnh hồ sơ</h5>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span
            className={
              userInformation?.percent_complete < 50
                ? "text-danger fw-bold"
                : "text-muted"
            }
          >
            Cơ bản
          </span>
          <span
            className={
              userInformation?.percent_complete >= 50 &&
              userInformation?.percent_complete < 80
                ? "text-danger fw-bold"
                : "text-muted"
            }
          >
            Trung bình
          </span>
          <span
            className={
              userInformation?.percent_complete >= 80 &&
              userInformation?.percent_complete < 99
                ? "text-danger fw-bold"
                : "text-muted"
            }
          >
            Tương đối hoàn chỉnh
          </span>
          <span
            className={
              userInformation?.percent_complete >= 99
                ? "text-danger fw-bold"
                : "text-muted"
            }
          >
            Hoàn chỉnh
          </span>
        </div>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${userInformation.percent_complete}%` }}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {userInformation?.percent_complete}%
          </div>
        </div>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <span className="d-flex justify-content-between">
          <h3>Mục tiêu nghề nghiệp</h3>
          <i
            className="bi bi-pencil-square text-primary custom-hover"
            data-bs-toggle="modal"
            data-bs-target="#careerTarget"
          ></i>
        </span>

        <ul>
          <li>{userInformation.career_target}</li>
        </ul>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <span className="">
          <h3>Kinh nghiệm làm việc</h3>
          <p className="fst-italic">
            Mô tả kinh nghiệm làm việc của bạn càng chi tiết càng tốt
          </p>
          {listExp &&
            listExp?.map((exp, index) => (
              <div className="bg-white rounded-2 me-2 my-2 p-2" key={index}>
                <div className="d-flex justify-content-between align-items-center rounded-2">
                  <span className="col-md-3">{exp.exp_title}</span>
                  <span className="col-md-3">{exp.exp_company}</span>
                  <span className="col-md-3">
                    {formatDateToDDMMYYYY(exp.exp_from)} đến{" "}
                    {formatDateToDDMMYYYY(exp.exp_to)}
                  </span>

                  <span className="text-primary text-decoration-none">
                    <i
                      className="bi bi-pencil-square me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#addExperience"
                      onClick={() => {
                        setIsAdd(false);
                        setExperience({
                          ...experience,
                          profile_experience_id: exp.profile_experience_id,
                          exp_title: exp.exp_title,
                          exp_company: exp.exp_company,
                          exp_from: formatDateForInput(exp.exp_from),  // Sử dụng formatDateForInput
                          exp_to: formatDateForInput(exp.exp_to),      // Sử dụng formatDateForInput
                          exp_description: exp.exp_description,
                        });
                      }}
                    ></i>
                    <i
                      className="bi bi-trash text-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmDeleteModal"
                      onClick={() => {
                        setDataDeleteModal({
                          ...dataDeleteModal,
                          type: "experience",
                          data: {
                            profile_id: userInformation?.jobseeker_id,
                            profile_experience_id: exp.profile_experience_id,}   
                        });
                      }}
                    ></i>
                  </span>
                </div>
                <p>{exp.exp_description}</p>
              </div>
            ))}
        </span>

        <span
          className="d-flex justify-content-start text-primary lh-lg fs-5 ms-5 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#addExperience"
          onClick={() => {
            setIsAdd(true);
            setExperience({
              profile_experience_id: "", 
              exp_title: "",
              exp_company: "",
              exp_from: "",
              exp_to: "",
              exp_description: "",
            });
            // setModalUpdateID("");
          }}
        >
          <i className="bi bi-plus-circle me-2"></i>
          <p>Thêm kinh nghiệm làm việc</p>
        </span>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <span className="">
          <h3>Học vấn</h3>
          {listEducation &&
            listEducation?.map((edu, index) => (
              <div className="bg-white rounded-2 me-2 my-2 p-2" key={index}>
                <div className="d-flex justify-content-between align-items-center rounded-2">
                  <span className="col-md-3">{edu.major}</span>
                  <span className="col-md-2">{edu.education_title}</span>
                  <span className="col-md-3">{edu.school}</span>
                  <span className="col-md-3">
                    {formatDateToDDMMYYYY(edu.from_)} đến{" "}
                    {formatDateToDDMMYYYY(edu.to_)}
                  </span>
                  <span className="text-primary text-decoration-none">
                    <i
                      className="bi bi-pencil-square me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#addEducation"
                      onClick={() => {
                        setIsAdd(false);
                        setEducation({
                          ...education,
                          profile_education_id: edu.profile_education_id,
                          major: edu.major,
                          education_id: edu.education_id,
                          school: edu.school,
                          from_: formatDateForInput(edu.from_), // Sử dụng formatDateForInput
                            to_:formatDateForInput(edu.to_), // Sử dụng formatDateForInput
                        });
                        // setModalUpdateID(2);
                      }}
                    ></i>
                    <i
                      className="bi bi-trash text-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmDeleteModal"
                      onClick={() => {
                        setDataDeleteModal({
                          ...dataDeleteModal,
                          type: "education",
                          data: {
                            profile_id: userInformation?.jobseeker_id,
                            profile_education_id: edu.profile_education_id}   
                        });
                      }}
                    ></i>
                  </span>
                </div>
              </div>
            ))}
        </span>

        <span
          className="d-flex justify-content-start text-primary lh-lg fs-5 ms-5 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#addEducation"
          onClick={() => {
            setIsAdd(true);
            setEducation({
              profile_education_id: "",
              major: "",
              education_id: "",
              school: "",
              from_: "",
              to_: "",
            });
            setModalUpdateID("");
          }}
        >
          <i className="bi bi-plus-circle me-2"></i>
          <p>Thêm học vấn</p>
        </span>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <span className="">
          <h3>Dự án</h3>
          <p className="fst-italic">Mô tả dự án để thu hút nhà tuyển dụng</p>
          {listProject &&
            listProject?.map((pro, index) => (
              <div className="bg-white rounded-2 me-2 my-2 p-2" key={index}>
                <div className="d-flex justify-content-between align-items-center rounded-2">
                  <span className="col-md-3">{pro.project_name}</span>
                  <span className="col-md-3"></span>
                  <span className="col-md-3">
                    {formatDateToDDMMYYYY(pro.project_from)} đến{" "}
                    {formatDateToDDMMYYYY(pro.project_to)}
                  </span>
                  <span className="text-primary text-decoration-none">
                    <i
                      className="bi bi-pencil-square me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#addProject"
                      onClick={() => {
                        setIsAdd(false);
                        setProject({
                          ...project,
                          profile_project_id: pro.profile_project_id,
                          project_name: pro.project_name,
                          project_from: new Date(pro.project_from)
                            .toISOString()
                            .split("T")[0],
                          project_to: new Date(pro.project_to)
                            .toISOString()
                            .split("T")[0],
                          project_description: pro.project_description,
                        });

                      }}
                    ></i>
                    <i
                      className="bi bi-trash text-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmDeleteModal"
                      onClick={() => {
                        setDataDeleteModal({
                          ...dataDeleteModal,
                          type:"project",
                          data: {
                                  profile_id: userInformation?.jobseeker_id,
                                  profile_project_id: pro.profile_project_id}
                        });
                      }}
                    ></i>
                  </span>
                </div>
                <p>{pro.project_description}</p>
              </div>
            ))}
        </span>

        <span
          className="d-flex justify-content-start text-primary lh-lg fs-5 ms-5 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#addProject"
          onClick={() => {
            setIsAdd(true);
            setProject({
              profile_project_id: "",
              project_name: "",
              project_from: "",
              project_to: "",
              project_description: "",
            });
            setModalUpdateID("");
          }}
        >
          <i className="bi bi-plus-circle me-2"></i>
          <p>Thêm dự án</p>
        </span>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <span className="">
          <h3>Kỹ năng</h3>
          {listSkill &&
            listSkill?.map((skl, index) => (
              <div key={index}>
                <span
                  key={skl.tag_id}
                  className="badge bg-primary me-2 p-2 m-1"
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#confirmDeleteModal"
                  onClick={() => {
                    setDataDeleteModal({
                      ...dataDeleteModal,
                      type: "skill",
                      data: {
                              profile_id: userInformation?.jobseeker_id,
                              skill_id: skl.skill_id
                            }
                    });
                  }}
                >
                  {skl.tags_content} <span className="ms-1">&times;</span>
                </span>
              </div>
            ))}
        </span>

        <span
          className="d-flex justify-content-start text-primary lh-lg fs-5 ms-5 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#addSkill"
        >
          <i className="bi bi-plus-circle me-2"></i>
          <p>Thêm kỹ năng</p>
        </span>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <span className="">
          <h3>Ngoại ngữ</h3>
          {listLanguage &&
            listLanguage?.map((lang, index) => (
              <div key={index}>
                <span
                  key={lang.language_id}
                  className="badge bg-primary me-2 p-2 m-1"
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#confirmDeleteModal"
                  onClick={() => {
                    setDataDeleteModal({
                      ...dataDeleteModal,
                      type: "language",
                      data: {
                        profile_id: userInformation?.jobseeker_id,
                        language_id: lang.language_id,
                      }
                    });
                  }}
                >
                  {lang.metric_display} <span className="ms-1">&times;</span>
                </span>
              </div>
            ))}
        </span>

        <span
          className="d-flex justify-content-start text-primary lh-lg fs-5 ms-5 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#addLanguage"
        >
          <i className="bi bi-plus-circle me-2"></i>
          <p>Thêm ngoại ngữ</p>
        </span>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <span className="">
          <h3>Chứng chỉ</h3>
          {listCertification &&
            listCertification?.map((cer, index) => (
              <div className="bg-white rounded-2 me-2 my-2 p-2" key={index}>
                <div className="d-flex justify-content-between align-items-center rounded-2">
                  <span className="col-md-3">{cer.certifications || ""}</span>
                  <span className="col-md-3"></span>
                  <span className="col-md-3">
                    {formatDateToDDMMYYYY(cer.month_)}
                  </span>
                  <span className="text-primary text-decoration-none">
                    <i
                      className="bi bi-pencil-square me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#addCer"
                      onClick={() => {
                        setIsAdd(false);
                        setCertification({
                          ...certification,
                          profile_certifications_id: cer.profile_certifications_id, 
                          certifications: cer.certifications,
                          month_: new Date(cer.month_)
                            .toISOString()
                            .split("T")[0],
                        });
                        setModalUpdateID(6);
                      }}
                    ></i>
                    <i
                      className="bi bi-trash text-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmDeleteModal"
                      onClick={() => {
                        setDataDeleteModal({
                          ...dataDeleteModal,
                          type: "certification",
                          data: {
                            profile_id: userInformation?.jobseeker_id,
                            profile_certifications_id:
                              cer.profile_certifications_id,
                          }
                        });
                      }}
                    ></i>
                  </span>
                </div>
              </div>
            ))}
        </span>

        <span
          className="d-flex justify-content-start text-primary lh-lg fs-5 ms-5 custom-hover-2"
          data-bs-toggle="modal"
          data-bs-target="#addCer"
          onClick={() => {
            setIsAdd(true); // Thêm dòng này
            setCertification({
              profile_certifications_id: "", // Thêm dòng này
              certifications: "",
              month_: "",
            });
            // setModalUpdateID(""); // Không cần thiết nếu bạn dùng isAdd
          }}
        >
          <i className="bi bi-plus-circle me-2"></i>
          <p>Thêm chứng chỉ</p>
        </span>
      </div>
    </div>
  );
}
