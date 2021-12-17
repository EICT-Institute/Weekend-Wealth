module.exports.uploadImage = (upload) => (req, res, next) => {
  const fieldName = 'image';
  const fileType = /jpeg|jpg|png/;
  const fileSize = 500000; // size in byte

  upload.uploadFile(fileType, fileSize).single(fieldName)(req, res, (err) => {
    if (err) {
      next(err);
    } else next();
  });
};
