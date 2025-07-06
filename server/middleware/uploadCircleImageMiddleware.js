import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now()
    const ext = path.extname(file.originalname)
    const groupId = req.params.groupId || "group"
    cb(null, `group-avatar-${groupId}-${timestamp}${ext}`)
  },
})

const upload = multer({ storage })

export default upload
