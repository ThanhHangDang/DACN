import React, { useState, useEffect } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/authAction";

export default function Auth() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  //Data để tạo tài khoản
  const [dataRegister, setDataRegister] = useState({
    username: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "2",
  });

  //Check validation
  const [usernameValidMess, setUsernameValidMess] = useState("");
  const [nameValidMess, setNameValidMess] = useState("");
  const [ageValidMess, setAgeValidMess] = useState("");
  const [passwordValidMess, setPasswordValidMess] = useState("");
  const [phoneValidMess, setPhoneValidMess] = useState("");
  const [emailValidMess, setEmailValidMess] = useState("");

  const [usernameValid, setUsernameValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [ageValid, setAgeValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  const [formValid, setFormValid] = useState(false);

  //Kiểm tra dữ liệu nhập vào
  const handleErrors = (e) => {
    const { name, value } = e.target;
    let mess = value.trim() === "" ? name + " Không được rỗng" : "";

    switch (name) {
      case "username":
        setNameValid(mess === "" ? true : false);

        if (value && !(value.length >= 5 && value.length <= 30)) {
          mess = "Tên đăng nhập là chuỗi từ 5-30 ký tự";
          setUsernameValid(false);
        }
        setUsernameValidMess(mess);
        break;
      case "name":
        setNameValid(mess === "" ? true : false);

        if (value && !(value.length >= 5 && value.length <= 30)) {
          mess = "Họ và tên là chuỗi từ 5-30 ký tự";
          setNameValid(false);
        }
        setNameValidMess(mess);
        break;
      case "password":
        setPasswordValid(mess === "" ? true : false);
        if (value && !value.match("^(?=.*[A-Z])(?=.*[0-9!@#$%^&*])(?=.{8,})")) {
          mess =
            "Mật khẩu phải bắt đầu bằng chữ hoa, có ít nhất 1 chữ số hoặc ký tự đặc biệt, và ít nhất 8 ký tự.";
          setPasswordValid(false);
        }
        setPasswordValidMess(mess);
        break;

      case "phone":
        setPhoneValid(mess === "" ? true : false);
        if (value && !value.match("^[0-9]{7,14}$")) {
          mess = "Số điện thoại phải có từ 7 đến 14 chữ số";
          setPhoneValid(false);
        }
        setPhoneValidMess(mess);
        break;
      case "email":
        setEmailValid(mess === "" ? true : false);
        if (
          value &&
          !value.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")
        ) {
          mess = "Email không đúng định dạng";
          setEmailValid(false);
        }
        setEmailValidMess(mess);
        break;
      default:
        break;
    }
  };

  //Hàm xử lý yêu cầu tạo tài khoản
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(dataRegister));
    // console.log(dataRegister);
  };

  useEffect(() => {
    if (
      dataRegister.username &&
      dataRegister.name &&
      dataRegister.password &&
      dataRegister.phone &&
      dataRegister.email
    ) {
      setFormValid(
        usernameValid && nameValid && passwordValid && phoneValid && emailValid
      );
    } else {
      setFormValid(false); // Đảm bảo formValid là false nếu bất kỳ trường nào không có dữ liệu
    }
    if (isLogin) {
      navigate("/");
    }
  }, [
    usernameValid,
    nameValid,
    passwordValid,
    phoneValid,
    emailValid,
    dataRegister,isLogin
  ]);

  return (
    <div>
      <div className="container bg-light mt-5 mb-5 col-10 col-sm-5 rounded-3">
        <div className="row">
          <h2 className="fw-bold text-center mt-2">ĐĂNG KÝ TÀI KHOẢN</h2>
          <p>
            Nếu bạn có một tài khoản, xin vui lòng bấm nút "Đăng nhập" chuyển
            qua trang đăng nhập.
            <br />
            Những trường có * là bắt buộc
          </p>
        </div>
        <form method="post">
          <p>Tên đăng nhập*</p>
          <input
            type="text"
            className="form-control mb-3"
            name="username"
            placeholder="Tên đăng nhập"
            value={dataRegister.username}
            onChange={(e) => {
              setDataRegister({ ...dataRegister, username: e.target.value });
            }}
            onBlur={handleErrors}
          />
          {usernameValidMess ? (
            <div className="alert alert-danger">{usernameValidMess}</div>
          ) : (
            ""
          )}
          <p>Họ và tên*</p>
          <input
            type="text"
            className="form-control mb-3"
            name="name"
            placeholder="Họ và tên"
            value={dataRegister.name}
            onChange={(e) => {
              setDataRegister({ ...dataRegister, name: e.target.value });
            }}
            onBlur={handleErrors}
          />
          {nameValidMess ? (
            <div className="alert alert-danger">{nameValidMess}</div>
          ) : (
            ""
          )}
          <p>Số điện thoại*</p>
          <input
            type="text"
            className="form-control mb-3"
            name="phone"
            placeholder="Số điện thoại"
            value={dataRegister.phone}
            onChange={(e) => {
              setDataRegister({ ...dataRegister, phone: e.target.value });
            }}
            onBlur={handleErrors}
          />
          {phoneValidMess ? (
            <div className="alert alert-danger">{phoneValidMess}</div>
          ) : (
            ""
          )}
          <p>Email*</p>
          <input
            type="text"
            className="form-control mb-3"
            name="email"
            placeholder="Email"
            value={dataRegister.email}
            onChange={(e) => {
              setDataRegister({ ...dataRegister, email: e.target.value });
            }}
            onBlur={handleErrors}
          />
          {emailValidMess ? (
            <div className="alert alert-danger">{emailValidMess}</div>
          ) : (
            ""
          )}
          <p>Mật khẩu*</p>
          <input
            type="password"
            className="form-control mb-3"
            name="password"
            placeholder="Mật khẩu"
            value={dataRegister.password}
            onChange={(e) => {
              setDataRegister({ ...dataRegister, password: e.target.value });
            }}
            onBlur={handleErrors}
          />
          {passwordValidMess ? (
            <div className="alert alert-danger">{passwordValidMess}</div>
          ) : (
            ""
          )}
          <p>Bạn là:*</p>
          <select
            class="form-select mb-3"
            aria-label="Default select example"
            value={dataRegister.role}
            onChange={(e) => {
              setDataRegister({ ...dataRegister, role: e.target.value });
            }}
          >
            <option value="3" selected>
              Người tìm việc
            </option>
            <option value="2">Nhà tuyển dụng</option>
          </select>

          <div className="row">
            <div className="col">
              <button
                type="submit"
                className="form-control btn btn-outline-danger mt-3 mb-3"
                // disabled={loading}
                disabled={!formValid}
                onClick={handleSubmit}
              >
                Đăng ký
              </button>
            </div>
          </div>
          <div className="row d-flex justify-content-end">
            <div className="col-8 d-flex justify-content-end">
              <p className="me-2">Bạn đã là thành viên của Boost Career?</p>
              <NavLink to="/login" className="text-primary">
                Đăng nhập
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
