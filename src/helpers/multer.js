const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  console.log(file.mimetype, 'blllllllllllllllllllllllllllllllllllllllll')
  if (file.fieldname === 'image' || file.fieldname === 'document' || file.fieldname === 'assignment') {
    // File filter logic for image field
    if (
      // Image types
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/gif' ||
      file.mimetype === 'image/heic' ||

      // Document types
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' || // Microsoft Word (.doc)
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || // Modern Word (.docx)
      file.mimetype === 'application/vnd.ms-excel' || // Microsoft Excel (.xls)
      file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || // Modern Excel (.xlsx)
      file.mimetype === 'application/vnd.ms-powerpoint' || // Microsoft PowerPoint (.ppt)
      file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || // Modern PowerPoint (.pptx)
      file.mimetype === 'application/vnd.oasis.opendocument.text' || // OpenDocument Text (.odt)
      file.mimetype === 'application/vnd.oasis.opendocument.spreadsheet' || // OpenDocument Spreadsheet (.ods)
      file.mimetype === 'application/vnd.oasis.opendocument.presentation' || // OpenDocument Presentation (.odp)
      file.mimetype === 'application/rtf' || // Rich Text Format (.rtf)
      file.mimetype === 'application/zip' || // ZIP Archive (.zip)
      file.mimetype === 'application/x-rar-compressed' ||// RAR Archive (.rar)

      //Video types

      file.mimetype === 'video/mp4' ||
      file.mimetype === 'video/webm' ||
      file.mimetype === 'video/ogg' ||
      file.mimetype === 'video/x-msvideo' ||
      file.mimetype === 'video/x-ms-wmv' ||
      file.mimetype === 'video/quicktime' ||
      file.mimetype === 'video/x-flv' ||
      file.mimetype === 'video/x-matroska' ||
      file.mimetype === 'video/3gpp' ||
      file.mimetype === 'video/3gpp2' 
      
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter })

module.exports = { upload }