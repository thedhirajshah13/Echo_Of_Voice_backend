const ImageUpload = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, msg: "File not found" });
    }

    // Cloudinary automatically returns secure URL in req.file.path
    const imageUrl = req.file.path;

    return res.status(200).json({
      success: true,
      msg: "File uploaded successfully",
      url: imageUrl,
      public_id: req.file.filename, // optional - useful for delete/update later
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

export default ImageUpload;
