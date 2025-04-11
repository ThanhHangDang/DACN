import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { getCompanyInformation } from "../../../redux/actions/companyAction";
// import { getCategoryIndustry } from "../../../redux_toolkit/categorySlice.js";
import { useGetIndustriesQuery } from "../../../redux_toolkit/CategoryApi.js";
import { useGetCompanyInformationQuery } from "../../../redux_toolkit/guestApi.js";
import CompanyHeader from "../../../component/_component/ui/CompanyHeader.js";

export default function CompanyProfile() {
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.auth);
  const {data: industry } =useGetIndustriesQuery();
  const navigate = useNavigate();
  // const { companyInformation } = useSelector((state) => state.company);
  const { data: companyInformation } = useGetCompanyInformationQuery(user?.user.id);

  console.log("company information ", companyInformation);

  const [updateCompany, setUpdateCompany] = useState({
    company_name: companyInformation.company_name || "",
    phone_number: companyInformation.phone_number || "",
    address: companyInformation.address || "",
    scale_min: companyInformation.scale_min || "",
    scale_max: companyInformation.scale_max || "",
    industry_id: companyInformation.industry_id || "",
    describle: companyInformation.describle || "",
  });

  const [logo, setLogo] = useState("");

  const handleUpdateCompanyProfile = () => {
    console.log(updateCompany);
  };

  const handleUpdateCompanyLogo = () => {
    console.log(logo);
  };

  // useEffect(() => {
  //   if (!isLogin && !(user?.user.role === 2)) {
  //     navigate("/login");
  //   }
  //   dispatch(getCompanyInformation(user?.user.id));
  // }, [isLogin, user]);

  return (
    <div>
      <div className="bg-light rounded-2 me-2 my-2 p-2">
        {/* Logo công ty */}
        <div className="mb-4">
          <label className="form-label fw-bold">Logo công ty</label>
          <div className="d-flex align-items-center justify-content-center mb-1">
            <img
              src={companyInformation.logo}
              alt=""
              style={{ height: 80 }}
              className=""
            />
          </div>
          <div
            className="border rounded d-flex align-items-center justify-content-center"
            style={{ height: "100px", borderColor: "#ccc" }}
          >
            <div className="text-center">
              {/* <i
                className="bi bi-image"
                style={{ fontSize: "2rem", color: "#888" }}
              ></i> */}
              <input
                type="file"
                className="form-control-file"
                accept="image/jpeg, image/png, image/gif" // Chỉ cho phép chọn ảnh
                id="fileInput"
                onChange={(e) => {
                  setLogo(e.target.files[0]);
                }}
              />
              {/* <p className="mt-2 text-muted">
                Upload ảnh ở đây{" "}
                
              </p> */}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <button
            className="btn btn-primary text-end"
            onClick={handleUpdateCompanyLogo}
          >
            Cập nhật
          </button>
        </div>
      </div>

      {/* <CompanyHeader companyInformation={companyInformation} /> */}

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <div className="row mb-3">
          {/* Tên công ty */}
          <div className="col-md-6">
            <label className="form-label fw-bold">
              Tên công ty <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ví dụ: Công ty TNHH HDN Teams"
              value={
                updateCompany.company_name
                  ? updateCompany.company_name
                  : companyInformation.company_name
              }
              onChange={(e) =>
                setUpdateCompany({
                  ...updateCompany,
                  company_name: e.target.value,
                })
              }
            />
          </div>

          {/* Điện thoại */}
          <div className="col-md-6">
            <label className="form-label fw-bold">
              Điện thoại <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ví dụ: 0981868099"
              value={
                updateCompany.phone_number
                  ? updateCompany.phone_number
                  : companyInformation.phone_number
              }
              onChange={(e) =>
                setUpdateCompany({
                  ...updateCompany,
                  phone_number: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="row mb-3">
          {/* Địa chỉ công ty */}
          <div className="col-md-6">
            <label className="form-label">
              Địa chỉ công ty{" "}
              <span className="text-muted">(Không bắt buộc)</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ví dụ: 130 Sương Nguyệt Ánh, Phường Bến Thành, Quận 1"
              value={
                updateCompany.address
                  ? updateCompany.address
                  : companyInformation.address
              }
              onChange={(e) =>
                setUpdateCompany({
                  ...updateCompany,
                  address: e.target.value,
                })
              }
            />
          </div>

          {/* Quy mô công ty */}
          {/* <div className="col-md-6">
            <label className="form-label">
              Quy mô công ty{" "}
              <span className="text-muted">(Không bắt buộc)</span>
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Ví dụ: 130 Sương Nguyệt Ánh, Phường Bến Thành, Quận 1"
              value={`từ ${companyInformation.scale_min} đến ${companyInformation.scale_max}`}
              onChange={(e) =>
                setUpdateCompany({
                  ...updateCompany,
                  scale: e.target.value,
                })
              }
            />
          </div> */}

          <div className="row col-md-6">
            <label className="form-label">
              Quy mô công ty{" "}
              <span className="text-muted">(Không bắt buộc)</span>
            </label>
            <div className="col-md-4 mb-3">
              {/* <label htmlFor="startYear" className="form-label">
                Từ
              </label> */}
              <input
                type="number"
                min="1"
                step="1000"
                className="form-control"
                id="startYear"
                placeholder="Quy mô tối thiểu"
                value={
                  updateCompany.scale_min
                    ? updateCompany.scale_min
                    : companyInformation.scale_min
                }
                onChange={(e) =>
                  setUpdateCompany({
                    ...updateCompany,
                    scale_min: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4 mb-3">
              {/* <label htmlFor="endYear" className="form-label">
                Đến
              </label> */}
              <input
                type="number"
                min="1"
                step="1000"
                className="form-control"
                id="endYear"
                placeholder="Quy mô tối đa"
                value={
                  updateCompany.scale_max
                    ? updateCompany.scale_max
                    : companyInformation.scale_max
                }
                onChange={(e) =>
                  setUpdateCompany({
                    ...updateCompany,
                    scale_max: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Người liên hệ */}
        {/* <div className="mb-3">
          <label className="form-label">
            Người liên hệ <span className="text-muted">(Không bắt buộc)</span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Ví dụ: Nguyễn Văn A"
            value=""
          />
        </div> */}

        {/* Lĩnh vực công ty */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Lĩnh vực công ty <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            value={
              updateCompany.industry_id
                ? updateCompany.industry_id
                : companyInformation.industry_id
            }
            onChange={(e) => {
              setUpdateCompany({
                ...updateCompany,
                industry_id: e.target.value,
              });
            }}
          >
            {industry?.map((option) => (
              <option value={option.industry_id} key={option.industry_id}>
                {option.industry_name}
              </option>
            ))}
          </select>
        </div>

        {/* Sơ lược về công ty */}
        <div className="mb-3">
          <label className="form-label">Sơ lược về công ty</label>
          <textarea
            className="form-control"
            rows="5"
            placeholder="Sơ lược về công ty của bạn..."
            value={
              updateCompany.describle
                ? updateCompany.describle
                : companyInformation.describle
            }
            onChange={(e) => {
              setUpdateCompany({ ...updateCompany, describle: e.target.value });
            }}
          ></textarea>
        </div>

        <div className="mb-3">
          <button
            className="btn btn-primary text-end"
            onClick={handleUpdateCompanyProfile}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}
