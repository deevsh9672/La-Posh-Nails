import GalleryImage from '../models/GalleryImage.js';
import { uploadFile, deleteFile } from '../config/cloudinary.js';

export const getGalleryImages = async (req, res, next) => {
  try {
    const { category, publishedOnly = 'true' } = req.query;
    const filter = {};

    if (publishedOnly === 'true') {
      filter.isPublished = true;
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    const images = await GalleryImage.find(filter).sort({ sortOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: images.length,
      data: images,
    });
  } catch (error) {
    next(error);
  }
};

export const createGalleryImage = async (req, res, next) => {
  try {
    const { title, category, altText, sortOrder, isPublished } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title and category are required',
      });
    }

    let imageUrl = req.body.imageUrl;
    let cloudinaryPublicId = '';

    if (req.file) {
      const uploadRes = await uploadFile(req.file.buffer, req.file.originalname, 'gallery');
      imageUrl = uploadRes.url;
      cloudinaryPublicId = uploadRes.publicId;
    }

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file or provide an imageUrl',
      });
    }

    const galleryImage = await GalleryImage.create({
      title,
      category,
      imageUrl,
      cloudinaryPublicId,
      altText: altText || `${title} - La Posh Nails Studio Rajkot`,
      sortOrder: sortOrder ? Number(sortOrder) : 0,
      isPublished: isPublished !== undefined ? String(isPublished) === 'true' : true,
    });

    res.status(201).json({
      success: true,
      message: 'Gallery image uploaded successfully',
      data: galleryImage,
    });
  } catch (error) {
    next(error);
  }
};

export const updateGalleryImage = async (req, res, next) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Gallery image not found',
      });
    }

    const { title, category, altText, sortOrder, isPublished } = req.body;

    if (title) image.title = title;
    if (category) image.category = category;
    if (altText) image.altText = altText;
    if (sortOrder !== undefined) image.sortOrder = Number(sortOrder);
    if (isPublished !== undefined) image.isPublished = String(isPublished) === 'true';

    if (req.file) {
      if (image.cloudinaryPublicId) {
        await deleteFile(image.cloudinaryPublicId);
      }
      const uploadRes = await uploadFile(req.file.buffer, req.file.originalname, 'gallery');
      image.imageUrl = uploadRes.url;
      image.cloudinaryPublicId = uploadRes.publicId;
    } else if (req.body.imageUrl) {
      image.imageUrl = req.body.imageUrl;
    }

    await image.save();

    res.status(200).json({
      success: true,
      message: 'Gallery image updated successfully',
      data: image,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryImage = async (req, res, next) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Gallery image not found',
      });
    }

    if (image.cloudinaryPublicId) {
      await deleteFile(image.cloudinaryPublicId);
    }

    await GalleryImage.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Gallery image deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
