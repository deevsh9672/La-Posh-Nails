import Service from '../models/Service.js';
import { uploadFile } from '../config/cloudinary.js';

export const getServices = async (req, res, next) => {
  try {
    const { category, activeOnly = 'true' } = req.query;
    const filter = {};

    if (activeOnly === 'true') {
      filter.isActive = true;
    }

    if (category) {
      filter.category = category;
    }

    const services = await Service.find(filter).sort({ category: 1, name: 1 });
    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlugOrId = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    let service;

    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      service = await Service.findById(identifier);
    } else {
      service = await Service.findOne({ slug: identifier.toLowerCase() });
    }

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const { name, category, description, price, durationMinutes, isActive } = req.body;

    if (!name || !category || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name, category, and description are required',
      });
    }

    let imageUrl = req.body.imageUrl || 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80';
    if (req.file) {
      const uploadRes = await uploadFile(req.file.buffer, req.file.originalname, 'services');
      imageUrl = uploadRes.url;
    }

    // Generate unique slug
    let baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let slug = baseSlug;
    let counter = 1;
    while (await Service.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const service = await Service.create({
      name,
      slug,
      category,
      description,
      price: price ? Number(price) : null,
      durationMinutes: durationMinutes ? Number(durationMinutes) : 60,
      imageUrl,
      isActive: isActive !== undefined ? String(isActive) === 'true' : true,
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    const { name, category, description, price, durationMinutes, isActive } = req.body;

    if (name) service.name = name;
    if (category) service.category = category;
    if (description) service.description = description;
    if (price !== undefined) service.price = price === '' ? null : Number(price);
    if (durationMinutes !== undefined) service.durationMinutes = Number(durationMinutes);
    if (isActive !== undefined) service.isActive = String(isActive) === 'true';

    if (req.file) {
      const uploadRes = await uploadFile(req.file.buffer, req.file.originalname, 'services');
      service.imageUrl = uploadRes.url;
    } else if (req.body.imageUrl) {
      service.imageUrl = req.body.imageUrl;
    }

    await service.save();

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
