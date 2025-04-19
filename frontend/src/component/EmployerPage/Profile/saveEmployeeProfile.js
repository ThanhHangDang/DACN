import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SaveEmployeeProfile() {
  const { isLogin, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin && !(user?.user.role === 2)) {
      navigate("/login");
    }
  }, [isLogin, navigate, user]);

  return (
    <div>
      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <h5 className="fw-bold">Quản lý hồ sơ ứng viên</h5>
      </div>

      <div className="bg-light rounded-2 me-2 my-2 p-2">
        <table className="table table-hover text-center">
          <thead>
            <tr>
              <th scope="col">Ứng viên</th>
              <th scope="col">Công việc</th>
              <th scope="col">Hồ sơ</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>
                <a href="#aaaa" className="text-primary">
                  Xem thêm
                </a>
              </td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>
                <a href="#aaaa" className="text-primary">
                  Xem thêm
                </a>
              </td>
            </tr>
            <tr>
              <td>Larry the Bird</td>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>
                <a href="#aaaa" className="text-primary">
                  Xem thêm
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
