import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Admin from './models/Admin.js';
import Service from './models/Service.js';
import GalleryImage from './models/GalleryImage.js';
import BusinessSettings from './models/BusinessSettings.js';
import { connectDB } from './config/db.js';

const initialServices = [
  {
    name: 'Acrylic Nail Extensions',
    slug: 'acrylic-nail-extensions',
    category: 'Acrylic Nail Extensions',
    description: 'High-strength, sculpted full acrylic extensions tailored to your desired length and silhouette, finished with premium glossy top coat.',
    price: null, // As specified: Never invent prices; consult salon
    durationMinutes: 90,
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    name: 'Gel Nail Extensions',
    slug: 'gel-nail-extensions',
    category: 'Nail Extensions',
    description: 'Lightweight, flexible soft-gel extensions designed for a natural feel, enduring strength, and glass-like shine.',
    price: null,
    durationMinutes: 75,
    imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    name: 'Custom 3D & Freehand Nail Art',
    slug: 'custom-nail-art',
    category: 'Custom Nail Art',
    description: 'Intricate hand-painted patterns, 3D floral sculpting, chrome ombré, and Swarovski crystal embellishments by master artists.',
    price: null,
    durationMinutes: 60,
    imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    name: 'Emergency Nail Repair & Overlay',
    slug: 'nail-repair',
    category: 'Nail Repair',
    description: 'Precision reinforcement and silk wrap repair for cracked, split, or lifted extensions without needing full reapplication.',
    price: null,
    durationMinutes: 30,
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    name: 'Luxury Spa Manicure',
    slug: 'luxury-spa-manicure',
    category: 'Manicure',
    description: 'Deep exfoliating scrub, herbal cuticle nourishment, warm massage butter, and nail plate buffing for silky smooth hands.',
    price: null,
    durationMinutes: 45,
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    name: 'Therapeutic Aromatherapy Pedicure',
    slug: 'aromatherapy-pedicure',
    category: 'Pedicure',
    description: 'Mineral foot soak, gentle callus smoothing, rejuvenating mask, and reflexology foot massage.',
    price: null,
    durationMinutes: 60,
    imageUrl: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    name: 'Gel Polish Change & High-Shine Finish',
    slug: 'gel-polish-change',
    category: 'Nail Polish Changes',
    description: 'Fresh application of premium chip-resistant UV gel polish with over 150 designer shades to pick from.',
    price: null,
    durationMinutes: 40,
    imageUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    name: 'Safe Gel & Acrylic Polish Removal',
    slug: 'polish-removal',
    category: 'Polish Removal',
    description: 'Damage-free soak-off system paired with intense keratin oil therapy to keep your natural nail bed healthy.',
    price: null,
    durationMinutes: 30,
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    name: 'Signature Natural Dewy Makeup',
    slug: 'natural-dewy-makeup',
    category: 'Natural Makeup',
    description: 'Effortless luminous complexion, soft contouring, and defined lashes for daytime elegance or corporate events.',
    price: null,
    durationMinutes: 60,
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    name: 'Glamorous Evening & Party Makeup',
    slug: 'party-makeup',
    category: 'Party Makeup',
    description: 'Bold eye looks, HD airbrush foundation, sculpted highlight, and smudge-proof setting for celebrations.',
    price: null,
    durationMinutes: 75,
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    name: 'Royalty Bridal HD Makeup & Draping',
    slug: 'bridal-hd-makeup',
    category: 'Bridal Makeup',
    description: 'Comprehensive couture bridal transformation with waterproof HD finish, traditional jewel setting, and lehenga draping.',
    price: null,
    durationMinutes: 120,
    imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    name: 'Haute Couture Hairstyles & Updos',
    slug: 'professional-hairstyles',
    category: 'Professional Hairstyles',
    description: 'Textured messy buns, Bollywood waves, floral braided crowns, and traditional Gujarati bridal chignons.',
    price: null,
    durationMinutes: 60,
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
];

const initialGallery = [
  {
    title: 'Modern Classic French Tips',
    category: 'French Nails',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    altText: 'Elegant French manicure tips by Khan Hair Xpenso',
    sortOrder: 1,
  },
  {
    title: 'Iridescent Mirror Chrome Nails',
    category: 'Chrome Nails',
    imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    altText: 'Silver mirror chrome nail finish at Sector 17 Kurukshetra salon',
    sortOrder: 2,
  },
  {
    title: 'Understated Nude & Rose Gold Ombré',
    category: 'Nude Nail Designs',
    imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    altText: 'Subtle nude aesthetic nail design for daily elegance',
    sortOrder: 3,
  },
  {
    title: 'Grand Indian Bridal Nail Extension Set',
    category: 'Bridal Nails',
    imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    altText: 'Royal crimson and gold bridal extensions with crystals',
    sortOrder: 4,
  },
  {
    title: 'Champagne Glitter Sparkle Fade',
    category: 'Glitter Nails',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    altText: 'Sparkling glitter manicure for celebrations in Kurukshetra',
    sortOrder: 5,
  },
  {
    title: 'Delicate Botanical & Floral Nail Art',
    category: 'Floral Nail Art',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    altText: 'Hand-painted spring floral design on almond nails',
    sortOrder: 6,
  },
  {
    title: 'Navratri & Diwali Festive Art',
    category: 'Festive Nail Designs',
    imageUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80',
    altText: 'Vibrant festive nail patterns with metallic borders',
    sortOrder: 7,
  },
  {
    title: 'Stiletto Sculpted Acrylic Extensions',
    category: 'Acrylic Extensions',
    imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    altText: 'Sculpted stiletto acrylic nail extensions by Khan Hair Xpenso',
    sortOrder: 8,
  },
  {
    title: 'Bridal Chignon & Smoky Glam Eye',
    category: 'Makeup & Hairstyles',
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    altText: 'Complete bridal hairstyle and makeup transformation',
    sortOrder: 9,
  },
];

export const seedDatabase = async (options = {}) => {
  try {
    if (!options.skipConnect) {
      await connectDB();
    }
    console.log('[Seed] Seeding database...');

    const businessData = {
      businessName: 'Khan Hair Xpenso - The Beauty Salon & Training',
      address: 'SCO-55, 56, Kessal Mall, Sector 17, Kurukshetra, Haryana 136118',
      phone: '+91 98123 62083',
      whatsappNumber: '919812362083',
      openingHours: {
        start: '10:00',
        end: '21:30',
        days: 'Monday – Sunday (10 AM – 9:30 PM)',
      },
      instagramUrl: 'https://www.instagram.com/khanhairxpenso_kkr/',
      facebookUrl: 'https://www.facebook.com/khanhairxpensothebeautysalon',
      websiteUrl: 'http://khanhairxpenso.com/',
      googleRating: {
        rating: 3.9,
        reviewCount: 301,
        googleMapsReviewUrl: 'https://maps.google.com/?q=Khan+Hair+Xpenso+Kurukshetra',
      },
      bookingSettings: {
        slotIntervalMinutes: 30,
        bufferMinutes: 15,
        maxAdvanceDays: 30,
        simultaneousStaffCount: 2,
      },
    };

    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = await BusinessSettings.create(businessData);
      console.log('✅ Business Settings seeded');
    } else {
      Object.assign(settings, businessData);
      await settings.save();
      console.log('✅ Business Settings updated with Khan Hair Xpenso');
    }

    // 2. Seed Admin
    const adminEmail = 'admin@laposh.com';
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const passwordHash = await Admin.hashPassword('Admin@LaPosh2026');
      await Admin.create({
        name: 'La Posh Administrator',
        email: adminEmail,
        passwordHash,
        role: 'superadmin',
      });
      console.log(`✅ Default admin created: ${adminEmail} (Password: Admin@LaPosh2026)`);
    } else {
      console.log(`ℹ️ Admin already exists: ${adminEmail}`);
    }

    // 3. Seed Services
    for (const serviceData of initialServices) {
      await Service.findOneAndUpdate(
        { slug: serviceData.slug },
        serviceData,
        { upsert: true, new: true }
      );
    }
    console.log(`✅ ${initialServices.length} Services seeded/updated`);

    // 4. Seed Gallery Images
    for (const imgData of initialGallery) {
      await GalleryImage.findOneAndUpdate(
        { title: imgData.title },
        imgData,
        { upsert: true, new: true }
      );
    }
    console.log(`✅ ${initialGallery.length} Gallery items seeded/updated`);

    console.log('[Seed] Seeding completed successfully!');
    if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
      process.exit(0);
    }
  } catch (error) {
    console.error('[Seed Error] Failed:', error);
    if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
      process.exit(1);
    }
  }
};

if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase();
}
