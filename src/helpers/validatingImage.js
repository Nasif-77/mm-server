  const {upload, uploadMultiple}=require('./multer')
  
  const verifyFileUpload = (req, res, next) => {
    if (req.files && req.files.document && req.files.document.length > 0) {
      uploadMultiple(req, res, (err) => {
        if (err) {
          console.error(err);
          return res.status(400).json({ error: 'Failed to upload documents' });
        }
        next();
      });
    } else {
      upload.single('image')(req, res, (err) => {
        if (err) {
          console.error(err);
          return res.status(400).json({ error: 'Failed to upload image' });
        }
        next();
      });
    }
  };
  
  

  module.exports = { verifyFileUpload };

  