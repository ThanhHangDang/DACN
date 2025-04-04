// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Kiểm tra và tạo thư mục uploads nếu chưa tồn tại
// const uploadDir = path.join(__dirname, "../../uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// // Kiểm tra loại file
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Chỉ cho phép tải lên file ảnh (JPG, PNG, GIF)"), false);
//   }
// };

// // Cấu hình Multer
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 50 * 1024 * 1024 }, // Giới hạn file 5MB
// });

// module.exports = upload;

const multer = require("multer");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const s3 = require("../config/s3Config"); // Import cấu hình S3
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid"); // Thư viện tạo tên file duy nhất

dotenv.config();

// Cấu hình multer để xử lý file trước khi upload lên S3
const storage = multer.memoryStorage(); // Lưu file vào RAM trước khi upload

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Giới hạn 5MB
});

const uploadToS3 = async (file) => {
  const fileExtension = path.extname(file.originalname);
  const fileName = `uploads/${uuidv4()}${fileExtension}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read", // Cho phép truy cập công khai
  };

  await s3.send(new PutObjectCommand(params));

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};

module.exports = { upload, uploadToS3 };
