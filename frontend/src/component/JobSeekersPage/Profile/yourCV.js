import React from "react";

export default function yourCV() {
  return (
    <div>
      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <h3>Hồ sơ đính kèm của bạn</h3>
        <div className="border border-primary rounded-2 p-2 d-flex justify-content-between">
          <span>
            <i class="bi bi-paperclip"></i>ThanhHangDang_Intern_CV.pdf
          </span>
          <span>Tải lên: 9/11/2024</span>
        </div>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <h3>Thêm đính kèm hồ sơ</h3>
        <div className=" p-2 d-flex justify-content-center text-center">
          <div className="col-3 border border-primary">
            <i class=" rounded-2 bi bi-upload lh-lg"></i>
            <p>Upload CV</p>
          </div>
        </div>
      </div>
    </div>
  );
}
