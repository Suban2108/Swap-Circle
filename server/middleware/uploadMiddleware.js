import multer from "multer";
import path from "path";

// Configure storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter file types
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  const extname = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowed.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb("Images only! (jpeg, jpg, png)");
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
