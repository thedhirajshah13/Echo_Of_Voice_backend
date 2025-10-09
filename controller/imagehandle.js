const ImageUpload = (req, res) => {
  if (!req.file) {
    return res.status(404).json({ msg: "file not found" });
  }

  const imageUrl = `http://localhost:8000/file/${req.file.filename}`;
  return res.status(200).json(imageUrl);
};

export default ImageUpload;
