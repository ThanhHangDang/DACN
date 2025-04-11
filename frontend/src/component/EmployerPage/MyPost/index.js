import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategoryTags,
  getCategoryJobFunction,
  getCategoryIndustry,
  getCategoryCity,
  getCategoryEdu,
  getCategoryLanguage,
} from "../../../redux/actions/categoryAction";

import {
  getPostsByUser,
  deletePostByUser,
  postNewWork,
  editPostByUser,
} from "../../../redux/actions/postAction";

export default function EmployerPost() {
  const dispatch = useDispatch();

  const { isLogin, user } = useSelector((state) => state.auth);
  const { tags, jobFunction, industry, city, edu, lang } = useSelector(
    (state) => state.category
  );
  const { postsByUser } = useSelector((state) => state.post);
  const [isAddPost, setIsAddPost] = useState(true);

  const [newPost, setNewPost] = useState({
    job_id: "0",
    employer_id: user?.user?.id,
    title: "",
    date_post: new Date().toISOString(),
    industry_id: 20,
    job_function_id: 1,
    quantity: 1,
    salary_min: 500000,
    salary_max: 1000000,
    describle: "",
    require_experience: 0,
    require_skill: [],
    require_language: [],
    require_age_min: 18,
    require_age_max: 18,
    address: "",
    work_location: 1,
    require_gender: "Không yêu cầu",
    require_martial_status: "Không yêu cầu",
    require_education: 1,
    level_id: 1,
    working_type: "full-time",
    working_time: "",
    more_requirement: "",
    require_certification: [],
  });

  const [skillInput, setSkillInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  const skillOptions = ["React", "React Native", "NodeJS", "Java", "Python"];
  const languageOptions = [
    "Tiếng Anh",
    "Tiếng Nhật",
    "Tiếng Hàn",
    "Tiếng Trung",
  ];

  const martialStatusOptions = ["Không yêu cầu", "Đã kết hôn", "Độc thân"];
  const workingTypeOptions = ["full-time", "part-time", "flexible"];

  const navigate = useNavigate();

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleLanguageInputChange = (e) => {
    setLanguageInput(e.target.value);
  };

  const handleAddSkill = (skill) => {
    if (!newPost.require_skill.includes(skill)) {
      setNewPost((prev) => ({
        ...prev,
        require_skill: [...prev.require_skill, skill],
      }));
    }
    setSkillInput("");
  };

  const handleAddLanguage = (language) => {
    if (!newPost.require_language.includes(language)) {
      setNewPost((prev) => ({
        ...prev,
        require_language: [...prev.require_language, language],
      }));
    }
    setLanguageInput("");
  };

  const handleRemoveSkill = (skill) => {
    setNewPost((prev) => ({
      ...prev,
      require_skill: prev.require_skill.filter((s) => s !== skill),
    }));
  };

  const handleRemoveLanguage = (language) => {
    setNewPost((prev) => ({
      ...prev,
      require_language: prev.require_language.filter((l) => l !== language),
    }));
  };

  const handleAddPost = () => {
    console.log("newPost: ", newPost);
    if (isAddPost) {
      dispatch(postNewWork(newPost));
    } else {
      dispatch(editPostByUser(newPost));
    }
    setNewPost({
      ...newPost,
      job_id: 0,
      employer_id: user?.user?.id,
      title: "",
      date_post: new Date().toISOString(),
      industry_id: 20,
      job_function_id: 1,
      quantity: 1,
      salary_min: 500000,
      salary_max: 1000000,
      describle: "",
      require_experience: 0,
      require_skill: [],
      require_language: [],
      require_age_min: 18,
      require_age_max: 18,
      address: "",
      work_location: 1,
      require_gender: "Không yêu cầu",
      require_martial_status: "Không yêu cầu",
      require_education: 1,
      level_id: 1,
      working_type: "full-time",
      working_time: "",
      more_requirement: "",
      require_certification: [],
    });
  };

  const [postID, setPostID] = useState(0);

  const handleDeletePost = () => {
    dispatch(deletePostByUser(user?.user?.id, postID));
  };

  useEffect(() => {
    if (!isLogin || user?.user?.role !== 2) {
      navigate("/login");
    }
    dispatch(getCategoryTags());
    dispatch(getCategoryJobFunction());
    dispatch(getCategoryIndustry());
    dispatch(getCategoryCity(84));
    dispatch(getCategoryEdu());
    dispatch(getCategoryLanguage());
    dispatch(getPostsByUser(user?.user?.id));
  }, []);

  return (
    <>
      {/* Modal thêm bài đăng */}
      <div
        className="modal fade"
        id="addPostModal"
        tabIndex={-1}
        aria-labelledby="modalTitle"
        // aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Thêm Bài Đăng
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
                      Tiêu đề bài đăng*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập tiêu đề bài đăng"
                      value={newPost.title}
                      onChange={(e) =>
                        setNewPost({ ...newPost, title: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="startYear" className="form-label">
                      Lĩnh vực*
                    </label>
                    <select
                      className="form-select"
                      id="field"
                      value={newPost.industry_id}
                      onChange={(e) =>
                        setNewPost({ ...newPost, industry_id: e.target.value })
                      }
                    >
                      {industry?.map((option) => (
                        <option
                          value={option.industry_id}
                          key={option.industry_id}
                        >
                          {option.industry_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="endYear" className="form-label">
                      Ngành nghề*
                    </label>
                    <select
                      className="form-select"
                      id="field"
                      value={newPost.job_function_id}
                      onChange={(e) =>
                        setNewPost({
                          ...newPost,
                          job_function_id: e.target.value,
                        })
                      }
                    >
                      {jobFunction?.map((option) => (
                        <option
                          value={option.job_function_id}
                          key={option.job_function_id}
                        >
                          {option.job_function_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-3">
                    <label htmlFor="endYear" className="form-label">
                      Số lượng*
                    </label>
                    <input
                      type="number"
                      className="form-control me-2"
                      placeholder="1"
                      min={1}
                      value={newPost.quantity}
                      onChange={(e) =>
                        setNewPost({ ...newPost, quantity: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-9 row">
                    <label className="form-label">Mức lương</label>
                    <div className="d-flex">
                      <input
                        type="number"
                        className="form-control me-2"
                        placeholder="Từ"
                        step={1000000}
                        min={1000000}
                        value={newPost.salary_min}
                        onChange={(e) =>
                          setNewPost({ ...newPost, salary_min: e.target.value })
                        }
                      />
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Đến"
                        step={1000000}
                        min={1000000}
                        value={newPost.salary_max}
                        onChange={(e) =>
                          setNewPost({ ...newPost, salary_max: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="benefits" className="form-label">
                    Mô tả công việc
                  </label>
                  <textarea
                    className="form-control"
                    id="benefits"
                    rows={3}
                    placeholder="Nhập mô tả công việc"
                    value={newPost.describle.replace(/00pizon00/g, "\n")}
                    onChange={(e) =>
                      setNewPost({
                        ...newPost,
                        describle: e.target.value.replace(/\n/g, "00pizon00"),
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Ngăn không cho xuống dòng (đối với textarea) hoặc submit form
                        setNewPost((prev) => ({
                          ...prev,
                          describle: prev.describle + "00pizon00",
                        }));
                      }
                    }}
                  />
                </div>

                <div className="row">
                  <label htmlFor="benefits" className="form-label">
                    Yêu cầu công việc
                  </label>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="startYear" className="form-label">
                      Kinh nghiệm*
                    </label>
                    <input
                      type="number"
                      className="form-control me-2"
                      placeholder="Năm kinh nghiệm"
                      step={1}
                      min={0}
                      value={newPost.require_experience}
                      onChange={(e) =>
                        setNewPost({
                          ...newPost,
                          require_experience: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="endYear" className="form-label">
                      Trình độ học vấn*
                    </label>
                    <select
                      className="form-select"
                      id="field"
                      value={newPost.require_education}
                      onChange={(e) =>
                        setNewPost({
                          ...newPost,
                          require_education: e.target.value,
                        })
                      }
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
                </div>

                <div className="row mb-3">
                  <div className="">
                    <label htmlFor="postTitle" className="form-label">
                      Kỹ năng
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập kỹ năng"
                      value={skillInput}
                      onChange={handleSkillInputChange}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          skillOptions.includes(skillInput)
                        ) {
                          e.preventDefault();
                          handleAddSkill(skillInput);
                        }
                      }}
                    />
                  </div>
                  <ul className="list-group">
                    {tags
                      ?.filter((skill) =>
                        skill.tags_content
                          .toLowerCase()
                          .includes(skillInput.toLowerCase())
                      )
                      .map((skill) => (
                        <>
                          {skillInput !== "" && (
                            <li
                              key={skill.tag_id}
                              className="list-group-item list-group-item-action ms-2 mr-2"
                              onClick={() => handleAddSkill(skill)}
                            >
                              {skill.tags_content}
                            </li>
                          )}
                        </>
                      ))}
                  </ul>
                  <div className="mt-2">
                    {newPost.require_skill.map((skill) => (
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

                <div className="row mb-3">
                  <div className="">
                    <label htmlFor="postTitle" className="form-label">
                      Ngôn ngữ
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập yêu cầu khác"
                      value={languageInput}
                      onChange={handleLanguageInputChange}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          languageOptions.includes(languageInput)
                        ) {
                          e.preventDefault();
                          handleAddLanguage(languageInput);
                        }
                      }}
                    />
                  </div>
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
                              onClick={() => handleAddLanguage(language)}
                            >
                              {language.metric_display}
                            </li>
                          )}
                        </>
                      ))}
                  </ul>
                  <div className="mt-2">
                    {newPost.require_language.map((language) => (
                      <span
                        key={language.language_id}
                        className="badge bg-primary me-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveLanguage(language)}
                      >
                        {language.metric_display}{" "}
                        <span className="ms-1">&times;</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="startYear" className="form-label">
                      Độ tuổi
                    </label>
                    <div className="d-flex">
                      <input
                        type="number"
                        className="form-control me-2"
                        placeholder="Từ"
                        min={18}
                        value={newPost.require_age_min}
                        onChange={(e) =>
                          setNewPost({
                            ...newPost,
                            require_age_min: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Đến"
                        min={18}
                        value={newPost.require_age_max}
                        onChange={(e) =>
                          setNewPost({
                            ...newPost,
                            require_age_max: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="endYear" className="form-label">
                      Giới tính
                    </label>
                    <select
                      className="form-select"
                      id="field"
                      selected={newPost.require_gender}
                      onChange={(e) =>
                        setNewPost({
                          ...newPost,
                          require_gender: e.target.value,
                        })
                      }
                    >
                      <option value="Không yêu cầu" selected>
                        Không yêu cầu
                      </option>
                      <option value="nam">Nam</option>
                      <option value="nữ">Nữ</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="startYear" className="form-label">
                      Tình trạng hôn nhân
                    </label>
                    <select
                      className="form-select"
                      id="field"
                      selected={newPost.require_martial_status}
                      onChange={(e) =>
                        setNewPost({
                          ...newPost,
                          require_martial_status: e.target.value,
                        })
                      }
                    >
                      {martialStatusOptions.map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="endYear" className="form-label">
                      Loại hình làm việc
                    </label>
                    <select
                      className="form-select"
                      id="field"
                      selected={newPost.working_type}
                      onChange={(e) =>
                        setNewPost({ ...newPost, working_type: e.target.value })
                      }
                    >
                      {workingTypeOptions.map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="">
                    <label htmlFor="postTitle" className="form-label">
                      Thời gian làm việc
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập thời gian làm việc"
                      value={newPost.working_time}
                      onChange={(e) =>
                        setNewPost({ ...newPost, working_time: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="endYear" className="form-label">
                    Khu vực làm việc*
                  </label>
                  <select
                    className="form-select"
                    id="field"
                    selected={newPost.work_location}
                    onChange={(e) =>
                      setNewPost({ ...newPost, work_location: e.target.value })
                    }
                  >
                    {city?.map((option) => (
                      <option value={option.city_id} key={option.city_id}>
                        {option.city_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="row mb-3">
                  <div className="">
                    <label htmlFor="postTitle" className="form-label">
                      Địa điểm làm việc*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập Địa điểm làm việc"
                      value={newPost.address}
                      onChange={(e) =>
                        setNewPost({ ...newPost, address: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="">
                    <label htmlFor="postTitle" className="form-label">
                      Yêu cầu khác
                    </label>
                    <textarea
                      rows={3}
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Nhập yêu cầu khác"
                      value={newPost.more_requirement.replace(
                        /00pizon00/g,
                        "\n"
                      )}
                      onChange={(e) =>
                        setNewPost({
                          ...newPost,
                          more_requirement: e.target.value.replace(
                            /\n/g,
                            "00pizon00"
                          ),
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // Ngăn không cho xuống dòng (đối với textarea) hoặc submit form
                          setNewPost((prev) => ({
                            ...prev,
                            more_requirement:
                              prev.more_requirement + "00pizon00",
                          }));
                        }
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
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleAddPost}
              >
                Đăng bài
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End modal thêm bài đăng */}

      {/* Modal delete */}
      <div
        className="modal fade"
        id="confirmDeletePostModal"
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
                onClick={handleDeletePost}
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

      <div>
        <div className="bg-light rounded-2 me-2 my-2 p-2">
          <h3>Quản lý tin tuyển dụng</h3>
        </div>

        <button
          className="btn btn-success float-end me-3 my-2"
          data-bs-toggle="modal"
          data-bs-target="#addPostModal"
          onClick={() => setIsAddPost(true)}
        >
          + Đăng tin tuyển dụng
        </button>

        <div className="bg-light rounded-2 me-2 my-2 p-2">
          <table class="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">Bài đăng</th>
                <th scope="col">Hình thức</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Ngày đăng</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {postsByUser?.map((post) => (
                <tr key={post.job_id}>
                  <td>
                    <NavLink to={`/post-detail/${post.job_id}`}>
                      {post.title}
                    </NavLink>
                  </td>
                  <td>{post.working_type}</td>
                  <td>{post.quantity}</td>
                  <td>{new Date(post.date_post).toLocaleDateString()}</td>
                  <td
                    data-bs-toggle="modal"
                    data-bs-target="#addPostModal"
                    onClick={() => {
                      setNewPost({
                        ...newPost,
                        job_id: post.job_id,
                        title: post.title,
                        industry_id: post.industry_id,
                        job_function_id: post.job_function_id,
                        quantity: post.quantity,
                        salary_min: post.salary_min,
                        salary_max: post.salary_max,
                        describle: post.describle,
                        require_experience: post.require_experience,
                        // require_skill: post.require_skill,
                        // require_language: post.require_language,
                        require_age_min: post.require_age_min,
                        require_age_max: post.require_age_max,
                        address: post.address,
                        work_location: post.work_location,
                      });
                      setIsAddPost(false);
                    }}
                  >
                    <p className="text-primary">Sửa</p>
                  </td>
                  <td>
                    <p className="text-primary">Gia hạn</p>
                  </td>
                  <td>
                    <p
                      className="text-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmDeletePostModal"
                      onClick={() => {
                        setPostID(post.job_id);
                      }}
                    >
                      Xóa
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
