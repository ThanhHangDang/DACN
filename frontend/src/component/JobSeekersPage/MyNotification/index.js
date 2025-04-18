import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
// import { getNotificationByUserID } from "../../../redux/actions/notificationAction.js"; // import
import { useGetNotificationByUserIDQuery } from "../../../redux_toolkit/notificationApi";
export default function JobSeekerNotification() {
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.auth);
  // const { notification } = useSelector((state) => state.notification);
  const { data: notification } = useGetNotificationByUserIDQuery(
    user?.user?.id,
    {
      skip: !user?.user?.id, // Skip the query if user ID is not available
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin || user?.user?.role !== 3) {
      navigate("/login");
    }
    // dispatch(getNotificationByUserID(user?.user.id)); // dispatch
  }, [navigate, isLogin, user]);

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
                className="accordion accordion-flush border border-2"
                id="accordionFlushExample"
                key={noti.messenger_id}
              >
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#flush-collapseOne${noti.messenger_id}`}
                      aria-expanded="false"
                      aria-controls={`flush-collapseOne${noti.messenger_id}`}
                    >
                      Bạn nhận thông báo từ {noti?.username} lúc{" "}
                      {noti?.date_time}
                    </button>
                  </h2>
                  <div
                    id={`flush-collapseOne${noti.messenger_id}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`flush-headingOne${noti.messenger_id}`}
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>{noti?.content}</p>
                      <br />
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
