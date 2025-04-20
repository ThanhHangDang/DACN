import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetIndustriesQuery } from "../../../redux_toolkit/CategoryApi.js";
import { useGetCompanyInforQuery } from "../../../redux_toolkit/employerApi.js";
import CompanyBackground from "../../../component/_component/ui/employer/CompanyBackground.js";

export default function CompanyProfile() {
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.auth);
  const { data: industry } = useGetIndustriesQuery();
  const navigate = useNavigate();
  const id = user?.id;
  console.log("id", id);
  const { data } = useGetCompanyInforQuery(id);
  const companyInformation = data || {};

  const [updateCompany, setUpdateCompany] = useState({
    company_name: companyInformation.company_name || "",
    phone_number: companyInformation.phone_number || "",
    address: companyInformation.address || "",
    scale_min: companyInformation.scale_min || "",
    scale_max: companyInformation.scale_max || "",
    industry_id: companyInformation.industry_id || "",
    describle: companyInformation.describle || "",
  });

  const handleUpdateCompanyProfile = () => {
    console.log(updateCompany);
  };

  return (
    <div className="card shadow-sm">
      <div className=" rounded-2 me-2 my-2 p-2">
        <CompanyBackground company={companyInformation} />
      </div>

      <div className="rounded-2 me-2 my-2 p-2">
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
