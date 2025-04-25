import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
// import { getNotificationByUserID } from "../../../redux/actions/notificationAction.js"; // import
import { useGetNotificationByUserIDQuery } from "../../../redux_toolkit/notificationApi";
export default function JobSeekerNotification() {
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.auth);
  // const { notification } = useSelector((state) => state.notification);
  const { data: notification } = useGetNotificationByUserIDQuery(user?.id, {
    skip: !user?.id, // Skip the query if user ID is not available
  });

  const navigate = useNavigate();

  const notificationData = [
    {
      notification_id: 1,
      recipient_id: 1,
      notification_type: "Theo dõi", //Theo dõi
      entity_id: 1,
      entity_name: "Kèo banh Cầu Xéo",
      entity_logo: "",
      is_read: false,
      content: "đã nhắc đến bạn và những người khác ở một bình luận trong",
      created_at: "1 giờ",
    },
    {
      notification_id: 2,
      recipient_id: 1,
      notification_type: "Lưu hồ sơ", //Lưu hồ sơ
      entity_id: 1,
      entity_name: "Kèo banh Cầu Xéo",
      entity_logo: "",
      is_read: false,
      content: "đã nhắc đến bạn và những người khác ở một bình luận trong",
      created_at: "2 giờ",
    },
    {
      notification_id: 3,
      recipient_id: 1,
      notification_type: "Hủy theo dõi", //Hủy theo dõi
      entity_id: 1,
      entity_name: "Kèo banh Cầu Xéo",
      entity_logo: "",
      is_read: true,
      content: "đã nhắc đến bạn và những người khác ở một bình luận trong",
      created_at: "3 ngày",
    },
    {
      notification_id: 4,
      recipient_id: 1,
      notification_type: "Hủy lưu hồ sơ", //Hủy lưu hồ sơ
      entity_id: 1,
      entity_name: "Kèo banh Cầu Xéo",
      entity_logo: "",
      is_read: true,
      content: "đã nhắc đến bạn và những người khác ở một bình luận trong",
      created_at: "3 ngày",
    },
    {
      notification_id: 5,
      recipient_id: 1,
      notification_type: "Ứng tuyển", //Hủy lưu hồ sơ
      entity_id: 1,
      entity_name: "Kèo banh Cầu Xéo",
      entity_logo: "",
      is_read: true,
      content: "đã nhắc đến bạn và những người khác ở một bình luận trong",
      created_at: "3 ngày",
    },
    {
      notification_id: 6,
      recipient_id: 1,
      notification_type: "Thông báo hệ thống", //Thông báo từ hệ thống
      entity_id: 1,
      entity_name: "Kèo banh Cầu Xéo",
      entity_logo: "",
      is_read: false,
      content: "đã nhắc đến bạn và những người khác ở một bình luận trong",
      created_at: "3 ngày",
    },
  ];

  const [openItem, setOpenItem] = useState(null);

  const toggle = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  const handleChangeIsRead = (id) => {
    // Call API to change is_read status
    console.log("Change is_read status for notification ID:", id);
  };

  useEffect(() => {
    if (!isLogin || user?.role !== 3) {
      navigate("/login");
    }
    // dispatch(getNotificationByUserID(user?.id)); // dispatch
  }, [navigate, isLogin, user]);

  return (
    <div>
      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <h3>Thông báo của bạn</h3>
      </div>

      {notificationData.length > 0 ? (
        <div className="accordion" id="faqAccordion">
          {notificationData?.map((item, index) => (
            <div
              className="accordion-item border-0 mb-1 custom-hover-4 shadow-sm"
              key={index}
            >
              <h2 className="accordion-header">
                <button
                  className={`accordion-button fw-semibold ${
                    openItem === item.notification_id ? "" : "collapsed"
                  } ${item.is_read ? "" : "bg-secondary"}`}
                  type="button"
                  onClick={() => {
                    toggle(item.notification_id);
                    if (item.is_read === false) {
                      handleChangeIsRead(item.notification_id);
                    }
                  }}
                  aria-expanded={openItem === item.notification_id}
                >
                  {/* <span className="me-3 text-primary fw-bold">
                  {item.notification_id}
                </span>{" "} */}
                  {item.notification_type}
                </button>
              </h2>
              {openItem === item.notification_id && (
                <div className="accordion-body d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        item?.entity_logo || "/img/notification/thong-bao.png"
                      }
                      alt="Logo"
                      className="img-fluid me-2 rounded-1 me-3"
                      style={{ width: 80, height: 80 }}
                    />

                    {(() => {
                      if (item.notification_type === "Thông báo hệ thống") {
                        return (
                          <p className="m-0">
                            Bạn nhận được thông báo từ hệ thông.
                          </p>
                        );
                      } else if (item.notification_type === "Theo dõi") {
                        return (
                          <p className="m-0">
                            {item.entity_name} đã theo dõi bạn.
                          </p>
                        );
                      } else if (item.notification_type === "Lưu hồ sơ") {
                        return (
                          <p className="m-0">
                            {item.entity_name} đã lưu hồ sơ của bạn.
                          </p>
                        );
                      } else if (item.notification_type === "Hủy theo dõi") {
                        return (
                          <p className="m-0">
                            {item.entity_name} đã hủy theo dõi bạn.
                          </p>
                        );
                      } else if (item.notification_type === "Lưu công việc") {
                        return (
                          <p className="m-0">
                            {item.entity_name} đã lưu công việc của bạn.
                          </p>
                        );
                      } else {
                        return (
                          <p className="m-0">
                            {item.entity_name} đã {item.notification_type} bạn.
                          </p>
                        );
                      }
                    })()}
                  </div>

                  <div className="d-flex flex-column align-items-center">
                    <p className="text-secondary">{item.created_at}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        "Chưa có thông báo nào."
      )}
    </div>
  );
}
