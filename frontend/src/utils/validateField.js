export function validateField(name, value, formValues = {}) {
  if (value.trim() === "") {
    return `${name} không được để trống`;
  }

  switch (name) {
    case "username":
      if (value.length < 5 || value.length > 30) {
        return "Tên đăng nhập phải từ 5-30 ký tự";
      }
      break;
    case "name":
      if (value.length < 5 || value.length > 30) {
        return "Họ và tên phải từ 5-30 ký tự";
      }
      break;
    case "phone":
      if (!/^[0-9]{7,14}$/.test(value)) {
        return "Số điện thoại phải từ 7-14 chữ số";
      }
      break;
    case "email":
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
        return "Email không đúng định dạng";
      }
      break;
    case "password":
      if (value.length < 8) {
        return "Mật khẩu phải có ít nhất 8 ký tự";
      }
      break;
    case "startDate":
      if (
        formValues.endDate &&
        new Date(value) >= new Date(formValues.endDate)
      ) {
        return "Ngày bắt đầu phải trước ngày kết thúc";
      }
      break;
    case "endDate":
      if (
        formValues.startDate &&
        new Date(formValues.startDate) >= new Date(value)
      ) {
        return "Ngày kết thúc phải sau ngày bắt đầu";
      }
      break;
    default:
      break;
  }

  return ""; // Nếu không lỗi
}
