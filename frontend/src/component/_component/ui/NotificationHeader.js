import React from "react";

const notifications = [
  {
    id: 1,
    name: "Đoàn Phương Quang Lưu",
    content: "đã nhắc đến bạn và những người khác ở một bình luận trong",
    group: "Kèo banh Cầu Xéo",
    time: "1 giờ",
    avatar: "https://via.placeholder.com/40",
    unread: true,
  },
  {
    id: 2,
    name: "Trần Thế Anh",
    content: "đã nhắc đến bạn và những người khác ở một bình luận trong",
    group: "Kèo banh Cầu Xéo",
    time: "3 ngày",
    avatar: "https://via.placeholder.com/40",
    unread: true,
  },
  {
    id: 3,
    name: "Hệ thống",
    content: "đã từ chối đăng nhập nhưng bị chặn vì thông tin ngắn lại.",
    group: "",
    time: "1 tuần",
    avatar: "https://via.placeholder.com/40",
    unread: false,
  },
];

const NotificationHeader = () => {
  return (
    <div className="container my-3">
      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Tất cả
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Chưa đọc
          </a>
        </li>
      </ul>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Thông báo</h5>
        <a href="#" className="text-decoration-none">
          Xem tất cả
        </a>
      </div>

      {/* Notification List */}
      <ul className="list-group">
        {notifications.map((noti) => (
          <li
            key={noti.id}
            className="list-group-item d-flex align-items-start"
          >
            <img
              src={noti.avatar}
              alt="Avatar"
              className="rounded-circle me-3"
              width="40"
              height="40"
            />
            <div className="flex-grow-1">
              <div>
                <strong>{noti.name}</strong> {noti.content}{" "}
                {noti.group && <strong>{noti.group}</strong>}
              </div>
              <small className="text-muted">{noti.time}</small>
            </div>
            {noti.unread && (
              <span className="badge bg-primary rounded-pill ms-2">●</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationHeader;
