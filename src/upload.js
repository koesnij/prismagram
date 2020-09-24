import multer from 'multer';

export const uploadMiddleware = multer({ dest: 'uploads/' }).single('file');

export const uploadController = (req, res) => {
  const { file } = req;
  console.log(file);
  res.end();
};
