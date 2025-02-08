import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

export default function JobSeekerNotification() {
  const { isLogin, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin || user?.user?.role !== 3) {
      navigate("/login");
    }
  }, [isLogin, navigate, user]);

  return (
    <div>
      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <h3>Thông báo của bạn</h3>
      </div>
      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <div className="border border-primary rounded-2 p-2 d-flex justify-content-between mb-2">
          <span className="text-primary">
            Công ty TNHH HDN Teams đã xem hồ sơ của bạn
          </span>
          <a className="text-primary">Xem</a>
        </div>

        <div className="border border-primary rounded-2 p-2 d-flex justify-content-between mb-2">
          <span className="text-primary">
            Công ty TNHH HDN Teams đã xem hồ sơ của bạn
          </span>
          <a className="text-primary">Xem</a>
        </div>
      </div>
    </div>
  );
}
