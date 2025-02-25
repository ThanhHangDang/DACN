import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getNotificationByUserID } from "../../../redux/actions/notificationAction.js"; // import

export default function JobSeekerNotification() {
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.auth);
  const { notification } = useSelector((state) => state.notification);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin || user?.user?.role !== 3) {
      navigate("/login");
    }
    dispatch(getNotificationByUserID(user?.user.id)); // dispatch
  }, [isLogin, user]);

  return (
    <div>
      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <h3>Thông báo của bạn</h3>
      </div>
      <div className="bg-light rounded-2 me-2 my-2 p-2">
        {notification && notification.length > 0 ? (
          <>
            {notification.map((noti) => (
              <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
                key={noti.messenger_id}
              >
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      Bạn nhận thông báo từ {notification?.username}
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>{notification?.content}</p>
                      <br />
                      <p>{notification?.date_time}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          "Bạn chưa có thông báo nào"
        )}
      </div>
    </div>
  );
}
