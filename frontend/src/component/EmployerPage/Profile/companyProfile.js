import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyInformation } from "../../../redux/actions/companyAction";

export default function CompanyProfile() {
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { companyInformation } = useSelector((state) => state.company);

  const [updateCompany, setUpdateCompany] = useState({
    company_name: "",
    phone_number: "",
    address: "",
    scale_min: "",
    scale_max: "",
    industry_name: "",
    describle: "",
    logo: "",
  });

  useEffect(() => {
    if (!isLogin && !(user?.user.role === 2)) {
      navigate("/login");
    }
    dispatch(getCompanyInformation(user?.user.id));
  }, [isLogin, user]);

  return (
    <div>
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
              value={companyInformation.company_name}
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
              value={companyInformation.phone_number}
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
              value={companyInformation.address}
            />
          </div>

          {/* Quy mô công ty */}
          <div className="col-md-6">
            <label className="form-label">
              Quy mô công ty{" "}
              <span className="text-muted">(Không bắt buộc)</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ví dụ: 130 Sương Nguyệt Ánh, Phường Bến Thành, Quận 1"
              value={`từ ${companyInformation.scale_min} đến ${companyInformation.scale_max}`}
            />
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
          <select className="form-select">
            <option seleced>{companyInformation.industry_name}</option>
            <option>Dịch vụ tài chính</option>
            <option>Sản xuất</option>
          </select>
        </div>

        {/* Sơ lược về công ty */}
        <div className="mb-3">
          <label className="form-label">Sơ lược về công ty</label>
          <textarea
            className="form-control"
            rows="5"
            placeholder="Sơ lược về công ty của bạn..."
            value={companyInformation.describle}
          ></textarea>
        </div>

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
              <i
                className="bi bi-image"
                style={{ fontSize: "2rem", color: "#888" }}
              ></i>
              <p className="mt-2 text-muted">Upload ảnh ở đây</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <button className="btn btn-primary text-end">Cập nhật</button>
      </div>
    </div>
  );
}
