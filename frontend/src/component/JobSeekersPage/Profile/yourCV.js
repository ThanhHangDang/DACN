import React, { useState, useRef } from "react";

export default function YourCV() {
  const dataCV = [
    {
      cv_id: 1,
      profile_id: 1,
      cv_name: "ThanhHangDang_intern.pdf",
      cv_link: "abc.html",
      create_at: "2025-04-07 16:10:29",
      isactive: 1,
    },
    {
      cv_id: 2,
      profile_id: 1,
      cv_name: "ThanhHangDang_intern.pdf",
      cv_link: "abc.html",
      create_at: "2025-04-07 16:10:29",
      isactive: 0,
    },
  ];

  //Ẩn hiện cv
  const handleShowCV = (profile_id, cv_id) => {
    console.log(
      "Truyển vào item.profile_id: ",
      profile_id,
      " và item.cv_id: ",
      cv_id,
      " ở ngay chỗ nút click. Lưu ý chỗ này cần set lại cho tất cả CV có profile_id trùng và khác cv_id gửi lên thành isactive = 0"
    );
  };

  const handleHideCV = (profile_id, cv_id) => {
    console.log(
      "Truyển vào item.profile_id: ",
      profile_id,
      " và item.cv_id: ",
      cv_id,
      " ở ngay chỗ nút click. "
    );
  };

  //Xóa cv
  const [cvItem, setCvItem] = useState({
    profile_id: "",
    cv_id: "",
  });
  const handleDeleteCVItem = () => {
    console.log("CV cần xóa", cvItem);
  };

  //Upload cv
  const cvInputRef = useRef(null);
  const handleButtonUploadCVClick = () => {
    if (cvInputRef) {
      cvInputRef.current.click();
    }
  };
  const handleCVChange = (event) => {
    const cv = event.target.files[0];
    console.log("assadsaxasx", cv);
    if (cv) {
      console.log("Cần gửi cv này lên server: ", cv);
    }
  };

  return (
    <div>
      {/* Thẻ input cv */}
      <input
        type="file"
        className="form-control-file"
        id="cvInput"
        style={{ display: "none" }}
        ref={cvInputRef}
        onChange={handleCVChange}
        accept=".pdf,.doc,.docx"
      />
      {/* End thẻ input cv */}

      {/* Modal delete */}
      <div
        className="modal fade"
        id="confirmDeleteCVModal"
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
                onClick={handleDeleteCVItem}
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

      <div className="container rounded-2 me-2 my-2 p-2 card shadow-sm">
        <h5 className="fw-bold">Hồ sơ đính kèm của bạn</h5>

        {dataCV && dataCV.length > 0 ? (
          dataCV.map((item, index) => (
            <div
              key={index}
              className="card rounded-2 p-2 d-flex flex-row justify-content-between m-1 shadow-sm"
            >
              <div className="d-flex flex-column">
                <span>
                  <i className="bi bi-paperclip"></i> {item.cv_name || "Tên CV"}
                </span>
                <span>Tải lên: {item.create_at || "Chưa có ngày"}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-success"
                  disabled={item?.isactive === 1 && true}
                  onClick={() => handleShowCV(item.profile_id, item.cv_id)}
                >
                  Hiện
                </button>
                <button
                  className="btn btn-secondary"
                  disabled={item?.isactive === 0 && true}
                  onClick={() => handleHideCV(item.profile_id, item.cv_id)}
                >
                  Ẩn
                </button>
                <button
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#confirmDeleteCVModal"
                  onClick={() =>
                    setCvItem({
                      profile_id: item.profile_id,
                      cv_id: item.cv_id,
                    })
                  }
                >
                  Xóa
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>Hãy upload CV của bạn!</div>
        )}
      </div>

      <div className="container rounded-2 me-2 my-2 p-2 card shadow-sm">
        <h5 className="fw-bold">Thêm đính kèm hồ sơ</h5>
        <div className=" p-2 d-flex flex-column align-items-center justify-content-center text-center">
          <div
            className="card shadow-sm col-3 "
            onClick={handleButtonUploadCVClick}
          >
            <i className=" rounded-2 bi bi-upload lh-lg"></i>
            <p>Upload CV</p>
          </div>
          <p>Vui lòng chọn file .doc, .docx, .pdf</p>
        </div>
      </div>
    </div>
  );
}
