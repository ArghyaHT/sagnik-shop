import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`http://localhost:3000/${req.file.path}`)
  // console.log(req.file.path) 
  // aikhane amar backend modhe uploads bole akta folder ache ai folder tar 
  // modhe amr image uploads hoeche thikache akhane /uploads/filepath bole frontend pachena so
  // amake tar age http://localhost:3000/uploads/req.file.path korle tokhno path paejache ata amr prochondo bhul hoechilo
  // jodi ami proxy te bole ditam frontend e http://localhost:3000/ tale amake ata na dialo hoto jehutu ami proxy lagaini tai amake ai path ta bole dite hbe
})

export default router