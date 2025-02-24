import multer from 'multer'
import fs from 'fs'
import path from 'path'

import getDirName from '../utils/getDirName.js'

const _dirname = getDirName(import.meta.url)

const ensureUploadsDirectory = () => {
    const uploadsDir = path.join(_dirname, '../uploads')
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir)
    }
}

ensureUploadsDirectory()

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname)
    },
    destination: function (req, file, cb){
        const tempDir = path.join(_dirname, '../uploads')
        cb(null, tempDir)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFormats = ["image/jpeg", "image/png"]

    if (allowedFormats.includes(file.mimetype)) {
        cb(null, true)
    } else {

        cb(new Error('Only JPEG and PNG files are allowed.'), false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

export default upload