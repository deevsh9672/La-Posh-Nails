import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const isCloudinaryConfigured = () => {
  return (
    Boolean(process.env.CLOUDINARY_CLOUD_NAME) &&
    Boolean(process.env.CLOUDINARY_API_KEY) &&
    Boolean(process.env.CLOUDINARY_API_SECRET) &&
    process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name'
  );
};

/**
 * Upload a file buffer to Cloudinary or fallback to local disk storage
 * @param {Buffer} buffer - File buffer
 * @param {string} originalName - Original filename
 * @param {string} folder - Folder name in Cloudinary / local storage
 * @returns {Promise<{ url: string, publicId: string }>}
 */
export const uploadFile = async (buffer, originalName, folder = 'laposh') => {
  if (isCloudinaryConfigured()) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto',
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      );
      uploadStream.end(buffer);
    });
  }

  // Graceful local disk fallback if Cloudinary is not configured
  const uploadsDir = path.resolve('uploads', folder);
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const ext = path.extname(originalName) || '.jpg';
  const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  const filePath = path.join(uploadsDir, fileName);

  fs.writeFileSync(filePath, buffer);
  return {
    url: `/uploads/${folder}/${fileName}`,
    publicId: `local_${fileName}`,
  };
};

/**
 * Delete asset from Cloudinary or local fallback
 */
export const deleteFile = async (publicId) => {
  if (!publicId) return;
  if (isCloudinaryConfigured() && !publicId.startsWith('local_')) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.warn(`[Cloudinary Warning] Could not delete image ${publicId}:`, err.message);
    }
  } else if (publicId.startsWith('local_')) {
    const filename = publicId.replace('local_', '');
    // Search folders in uploads/
    const uploadsBase = path.resolve('uploads');
    if (fs.existsSync(uploadsBase)) {
      const folders = fs.readdirSync(uploadsBase);
      for (const folder of folders) {
        const fullPath = path.join(uploadsBase, folder, filename);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
          break;
        }
      }
    }
  }
};

export default cloudinary;
