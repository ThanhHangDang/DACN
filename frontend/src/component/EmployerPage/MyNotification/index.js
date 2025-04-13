import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetNotificationByUserIDQuery } from "../../../redux_toolkit/notificationApi";

export default function EmployerNotification() {
  const { isLogin, user } = useSelector((state) => state.auth);

  // *********** lấy sãn notification ở đây, @pizon đưa vào frontend đi em
  const { data: notification } = useGetNotificationByUserIDQuery(user?.user?.id, {
    skip: !user?.user?.id, // Skip the query if user ID is not available
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin || user?.user?.role !== 2) {
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
            Ứng viên Tran Van A đã nộp hồ sơ cho công việc React Native
            Developer
          </span>
          <p className="text-primary">Xem</p>
        </div>

        <div className="border border-primary rounded-2 p-2 d-flex justify-content-between mb-2">
          <span className="text-primary">
            Ứng viên Tran Van A đã đánh giá công ty của bạn
          </span>
          <p className="text-primary">Xem</p>
        </div>

        <div className="border border-primary rounded-2 p-2 d-flex justify-content-between mb-2">
          <span className="text-primary">
            Bài đăng công việc React Bative Developer sẽ hết hạn trong 24h
          </span>
          <p className="text-primary">Xem</p>
        </div>
      </div>
    </div>
  );
}
