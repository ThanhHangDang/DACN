import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetIndustriesQuery,
  useGetScalesQuery,
  useGetCitiesQuery,
} from "../../../redux_toolkit/CategoryApi.js";
import { 
  useGetCompanyInforQuery,
  useUpdateCompanyInforMutation,
  useAddCompanyInforMutation,
  useDeleteCompanyInforMutation,
} from "../../../redux_toolkit/employerApi.js";
import CompanyBackground from "../../../component/_component/ui/employer/CompanyBackground.js";
import { toast } from "react-toastify";

export default function CompanyProfile() {
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.auth);
  const { data: industry } = useGetIndustriesQuery();
  const { data: scale } = useGetScalesQuery();
  const { data: cities } = useGetCitiesQuery(84); // 84 for Vietnam
  const navigate = useNavigate();
  
  const id = user?.id;
  const { data, refetch } = useGetCompanyInforQuery(id);
  const companyInformation = data || {};
  
  // RTK Query mutations
  const [updateCompanyProfile, { isLoading: isUpdating }] = useUpdateCompanyInforMutation();
  const [addCompanyLocation, { isLoading: isAddingLocation }] = useAddCompanyInforMutation();
  const [updateCompanyLocation, { isLoading: isUpdatingLocation }] = useUpdateCompanyInforMutation();
  const [deleteCompanyLocation, { isLoading: isDeletingLocation }] = useDeleteCompanyInforMutation();

  //  const [addCompanyInfor, { isLoading: isAdding }] = useAddCompanyInforMutation();
  // const [deleteCompanyInfor, { isLoading: isDeleting }] = useDeleteCompanyInforMutation();
  // Company profile state
  const [updateCompany, setUpdateCompany] = useState({
    company_name: "",
    phone_number: "",
    scale_id: "",
    industry_id: "",
    describle: "",
  });

  // New location state
  const [newLocation, setNewLocation] = useState({ 
    address: "", 
    city_id: "" 
  });
  
  // Edit location state
  const [editLocation, setEditLocation] = useState(null);

  // Update state when company data changes
  useEffect(() => {
    if (companyInformation) {
      setUpdateCompany({
        company_name: companyInformation.company_name || "",
        phone_number: companyInformation.phone_number || "",
        scale_id: companyInformation.scale_id || "",
        industry_id: companyInformation.industry_id || "",
        describle: companyInformation.describle || "",
      });
    }
  }, [companyInformation]);

  // Handle company profile update
  const handleUpdateCompanyProfile = async () => {
    try {
      // Validate required fields
      if (!updateCompany.company_name || !updateCompany.phone_number || !updateCompany.industry_id) {
        toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
        return;
      }

      const result = await updateCompanyProfile({
        company_id: id,
        ...updateCompany
      }).unwrap();
      
      toast.success("Cập nhật thông tin công ty thành công");
      refetch(); // Refresh company data
    } catch (error) {
      console.error("Failed to update company profile:", error);
      toast.error("Cập nhật thông tin công ty thất bại");
    }
  };

  // Handle adding a new location
  const handleAddLocation = async () => {
    try {
      if (!newLocation.address || !newLocation.city_id) {
        toast.error("Vui lòng nhập đầy đủ thông tin địa chỉ");
        return;
      }

     const response =  await addCompanyLocation({type: "company_location", data: {
        company_id: companyInformation.company_id,
        address: newLocation.address,
        city_id: newLocation.city_id}
      }).unwrap();
      if (response.success) {
        setNewLocation({ address: "", city_id: "" }); // Reset form
        toast.success("Thêm địa chỉ công ty thành công");
        refetch(); // Refresh locations list
      }
      else
      {
        toast.error("Thêm địa chỉ công ty thất bại");
      }

    } catch (error) {
      console.error("Failed to add location:", error);
      toast.error("Thêm địa chỉ công ty thất bại");
    }
  };

  // Handle updating a location
  const handleUpdateLocation = async () => {
    try {
      if (!editLocation || !editLocation.address || !editLocation.city_id) {
        toast.error("Vui lòng nhập đầy đủ thông tin địa chỉ");
        return;
      }

      const result  = await updateCompanyLocation({ type: "company_location", data: {
        location_id: editLocation.location_id,
        address: editLocation.address,
        city_id: editLocation.city_id}
      }).unwrap();
      
      if (result.success) {
      setEditLocation(null); // Exit edit mode
      toast.success("Cập nhật địa chỉ công ty thành công");
      refetch(); // Refresh locations list
      }
      else
      {
        toast.error("Cập nhật địa chỉ công ty thất bại");
      }
    } catch (error) {
      console.error("Failed to update location:", error);
      toast.error("Cập nhật địa chỉ công ty thất bại");
    }
  };

  // Handle deleting a location
  const handleDeleteLocation = async (locationId) => {
    try {
      if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này không?")) {
        const response =   await deleteCompanyLocation( {type:'company_location', data:{location_id: locationId}} ).unwrap();
        if (response.success) {
        toast.success("Xóa địa chỉ công ty thành công");
        refetch(); // Refresh locations list
        }
        else
        {
          toast.error("Xóa địa chỉ công ty thất bại");
        }
      }
    } catch (error) {
      console.error("Failed to delete location:", error);
      toast.error("Xóa địa chỉ công ty thất bại");
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="rounded-2 me-2 my-2 p-2">
        <CompanyBackground company={companyInformation} />
      </div>

      <div className="rounded-2 me-2 my-2 p-2">
        <h5 className="mb-3 border-bottom pb-2">Thông tin công ty</h5>
        
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
              value={updateCompany.company_name}
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
              value={updateCompany.phone_number}
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
          <div className="col-md-6">
            <label className="form-label fw-bold">
              Lĩnh vực công ty <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              value={updateCompany.industry_id}
              onChange={(e) => {
                setUpdateCompany({
                  ...updateCompany,
                  industry_id: e.target.value,
                });
              }}
            >
              <option value="">Chọn lĩnh vực</option>
              {industry?.map((option) => (
                <option value={option.industry_id} key={option.industry_id}>
                  {option.industry_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Quy mô công ty{" "}
              <span className="text-muted">(Không bắt buộc)</span>
            </label>
            <select
              className="form-select"
              value={updateCompany.scale_id}
              onChange={(e) => {
                setUpdateCompany({
                  ...updateCompany,
                  scale_id: e.target.value,
                });
              }}
            >
              <option value="">Chọn quy mô công ty</option>
              {scale?.map((option) => (
                <option value={option.scale_id} key={option.scale_id}>
                  {option.scale_min} - {option.scale_max} nhân viên
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sơ lược về công ty */}
        <div className="mb-4">
          <label className="form-label">Sơ lược về công ty</label>
          <textarea
            className="form-control"
            rows="5"
            placeholder="Sơ lược về công ty của bạn..."
            value={updateCompany.describle}
            onChange={(e) => {
              setUpdateCompany({ ...updateCompany, describle: e.target.value });
            }}
          ></textarea>
        </div>

        <div className="mb-4">
          <button
            className="btn btn-primary"
            onClick={handleUpdateCompanyProfile}
            disabled={isUpdating}
          >
            {isUpdating ? "Đang cập nhật..." : "Cập nhật thông tin công ty"}
          </button>
        </div>

        {/* Địa chỉ công ty - Managed separately */}
        <h5 className="mt-4 mb-3 border-bottom pb-2">Địa chỉ công ty</h5>

        {/* List existing locations */}
        {Array.isArray(companyInformation.company_location) && companyInformation.company_location.length > 0 ? (
          <div className="list-group mb-3">
            {companyInformation.company_location.map((location) => (
              <div key={location.location_id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <div>
                  <strong>{location.address}</strong>
                  <span className="ms-2 badge bg-light text-dark">{location.city_name}</span>
                </div>
                <div>
                  {editLocation?.location_id === location.location_id ? (
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-success btn-sm"
                        onClick={handleUpdateLocation}
                        disabled={isUpdatingLocation}
                      >
                        <i className="bi bi-check-lg"></i> Lưu
                      </button>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditLocation(null)}
                      >
                        <i className="bi bi-x-lg"></i> Hủy
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                          console.log("Edit location:", location);
                          setEditLocation(location);
                        }}
                      >
                        <i className="bi bi-pencil"></i> Sửa
                      </button>
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          console.log("Delete location:", location);
                          handleDeleteLocation(location.location_id);
                        }}
                        disabled={isDeletingLocation}
                      >
                        <i className="bi bi-trash"></i> Xóa
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info">Chưa có địa chỉ nào được thêm</div>
        )}
        
        {/* Edit location form */}
        {editLocation && (
          <div className="card p-3 mb-3 bg-light">
            <h6>Sửa địa chỉ</h6>
            <div className="row">
              <div className="col-md-8 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập địa chỉ chi tiết"
                  value={editLocation.address || ""}
                  onChange={(e) => setEditLocation({
                    ...editLocation,
                    address: e.target.value
                  })}
                />
              </div>
              <div className="col-md-4 mb-2">
                <select 
                  className="form-select"
                  value={editLocation.city_id || ""}
                  onChange={(e) => setEditLocation({
                    ...editLocation,
                    city_id: e.target.value
                  })}
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  {cities?.map((city) => (
                    <option key={city.city_id} value={city.city_id}>
                      {city.city_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Add new location form */}
        <div className="card p-3 bg-light">
          <h6>Thêm địa chỉ mới</h6>
          <div className="row">
            <div className="col-md-8 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập địa chỉ chi tiết (ví dụ: 130 Sương Nguyệt Ánh, Phường Bến Thành)"
                value={newLocation?.address || ""}
                onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
              />
            </div>
            <div className="col-md-4 mb-2">
              <select 
                className="form-select"
                value={newLocation?.city_id || ""}
                onChange={(e) => setNewLocation({...newLocation, city_id: e.target.value})}
              >
                <option value="">Chọn Tỉnh/Thành phố</option>
                {cities?.map((city) => (
                  <option key={city.city_id} value={city.city_id}>
                    {city.city_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <button 
              className="btn btn-primary btn-sm mt-2"
              onClick={handleAddLocation}
              disabled={isAddingLocation}
            >
              <i className="bi bi-plus-circle"></i> {isAddingLocation ? "Đang thêm..." : "Thêm địa chỉ"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
