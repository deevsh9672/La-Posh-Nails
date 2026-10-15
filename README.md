# La Posh Nails Studio & Makeup Hairstyles Academy

A full-stack production-ready MERN web application built for **La Posh Nails Studio & Makeup Hairstyles Academy**, located at 102 Pride Corporate, Kalavad Road, Rajkot, Gujarat.

---

## 💅 Business Profile

- **Business Name**: La Posh Nails Studio & Makeup Hairstyles Academy
- **Address**: 102 Pride Corporate, Royal Park Main Road, Kalavad Road, Opposite Krishna Medical, Rajkot, Gujarat 360005
- **Phone**: [+91 95123 48787](tel:+919512348787)
- **WhatsApp**: [Chat on WhatsApp](https://wa.me/919512348787)
- **Instagram**: [@laposh_nails_and_salon](https://www.instagram.com/laposh_nails_and_salon/)
- **Google Rating**: 4.3 / 5 from 189 verified reviews
- **Operating Hours**: Monday – Sunday, 10:00 AM – 8:00 PM

---

## 🛠️ Mandatory MERN Technology Stack

### Frontend (`client/`)
- **React.js 18** with **Vite**
- **React Router v6** for multi-page navigation
- **Tailwind CSS** with bespoke luxury beauty theme:
  - White (`#FFFFFF`)
  - Warm Background (`#FFF8F6`)
  - Blush Pink (`#F4DDE2`)
  - Champagne Gold (`#C6A36B`)
  - Primary Charcoal Text (`#292326`)
  - Secondary Text (`#746B70`)
  - Border (`#F0E5E8`)
- **Lucide React** icons
- **Framer Motion** for subtle reveals and transitions
- **Axios** with global interceptors and cookie support

### Backend (`server/`)
- **Node.js** & **Express.js** REST API
- **MongoDB Atlas** with **Mongoose ODM**
- **JWT Admin Authentication** stored in `HttpOnly`, `SameSite`, `Secure` cookies with fallback `Authorization: Bearer` support
- **bcryptjs** for secure password hashing
- **Helmet** for HTTP security headers
- **CORS** with explicit allowed-origin whitelist
- **Express Rate Limiting** on login, appointment, and enquiry routes
- **Centralized Error Handling** with Zod schema validation
- **Slot Availability Engine** with atomic double-booking conflict prevention
- **Nodemailer** integration with safe error boundaries
- **Cloudinary SDK** with graceful local filesystem fallback for image uploads
- **CSV Data Export** for bookings and student leads

---

## 📂 Project Structure

```
la-posh-website/
├── client/
│   ├── public/
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/        # Navbar, Footer, ServiceCard, FloatingWhatsApp, SEOHead, StatusBadge
│   │   │   └── booking/       # BookingWizard multi-step interactive scheduler
│   │   ├── context/           # AuthContext (Admin state), ToastContext
│   │   ├── layouts/           # MainLayout (public), AdminLayout (protected)
│   │   ├── pages/
│   │   │   ├── public/        # 14 public customer-facing pages
│   │   │   └── admin/         # 7 secure dashboard management pages
│   │   ├── services/          # Centralized Axios API client
│   │   ├── App.jsx            # Router route table
│   │   ├── index.css          # Tailwind base & custom layers
│   │   └── main.jsx
│   ├── tailwind.config.js     # Luxury palette configuration
│   ├── vite.config.js         # API proxy & Vite settings
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/            # DB, Cloudinary, Mailer configs
│   │   ├── controllers/       # Auth, Appointments, Services, Gallery, Enquiries, Settings
│   │   ├── middleware/        # Auth, RateLimiter, Upload, ErrorHandler
│   │   ├── models/            # Admin, Service, Appointment, CourseEnquiry, GalleryImage, BusinessSettings
│   │   ├── routes/            # REST API endpoints
│   │   ├── services/          # Availability calculation & conflict prevention
│   │   ├── utils/             # CSV helpers
│   │   ├── validators/        # Zod request body schemas
│   │   ├── app.js             # Express app setup
│   │   ├── server.js          # Server entry & graceful shutdown
│   │   └── seed.js            # Database seeder (Admin, Services, Gallery, Settings)
│   ├── tests/
│   │   └── api.test.js        # Automated integration test suite (10/10 passing)
│   └── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start & Local Development

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v22.21.0)
- **MongoDB** running locally or a free **MongoDB Atlas** cluster URI

### 2. Environment Setup
Copy `.env.example` in the root (or server):
```bash
# Server configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/laposh_db
JWT_SECRET=laposh_super_secret_jwt_key_beauty_2026_change_in_production
JWT_EXPIRES_IN=7d
ADMIN_SETUP_SECRET=laposh_bootstrap_admin_secret_key_2026

# Optional: Cloudinary (If omitted, uploads automatically fallback to local /uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional: Nodemailer SMTP
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password
EMAIL_FROM="La Posh Studio & Academy" <no-reply@laposh.com>
ADMIN_NOTIFICATION_EMAIL=admin@laposh.com

# Studio WhatsApp Number
WHATSAPP_BUSINESS_NUMBER=919512348787
```

### 3. Install Dependencies
```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 4. Seed the Database
Seeds initial business settings, 12 featured services, 9 portfolio gallery items, and the default admin account:
```bash
cd server
npm run seed
```
> **Default Admin Credentials**:
> - **Email**: `admin@laposh.com`
> - **Password**: `Admin@LaPosh2026`

### 5. Run Backend & Frontend

In Terminal 1 (Backend):
```bash
cd server
npm run dev
# Server runs on http://localhost:5000 (API at http://localhost:5000/api)
```

In Terminal 2 (Frontend):
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🧪 Automated Testing

Run the automated integration test suite:
```bash
cd server
npm test
```
The test suite utilizes `mongodb-memory-server` and `supertest` to independently test:
1. Health check endpoint status
2. Public service catalog retrieval
3. Real-time slot availability generation between 10:00 AM and 8:00 PM
4. Atomic appointment creation with booking reference format (`LP-YYYYMMDD-XXXX`)
5. **Double-booking collision prevention** (returns `409 Conflict` when capacity is reached)
6. Course lead registration and status initialization
7. Protected admin routes rejection without JWT (`401 Unauthorized`)
8. Admin login verification and JWT cookie issuance
9. Admin protected resource access with Bearer token
10. Studio business settings retrieval

---

## 📡 REST API Reference

### Authentication
- `POST /api/auth/login` — Sign in as administrator (Rate-limited, sets HttpOnly cookie)
- `POST /api/auth/logout` — Invalidate admin session
- `GET /api/auth/me` — Retrieve currently logged-in administrator profile

### Services
- `GET /api/services` — List active services (supports category filter)
- `GET /api/services/:id` or `:slug` — Service detail
- `POST /api/services` — Create service (Admin, supports image upload)
- `PATCH /api/services/:id` — Update service (Admin, supports image upload)
- `DELETE /api/services/:id` — Delete service (Admin)

### Appointments
- `GET /api/appointments/availability?date=YYYY-MM-DD&serviceId=ID` — Calculate live slots
- `POST /api/appointments` — Submit booking request (Rate-limited, atomic conflict check)
- `GET /api/appointments/metrics` — Dashboard metrics summary (Admin)
- `GET /api/appointments` — List & search appointments (Admin, supports `?export=csv`)
- `GET /api/appointments/:id` — Get single appointment (Admin)
- `PATCH /api/appointments/:id/status` — Update appointment status & internal notes (Admin)
- `DELETE /api/appointments/:id` — Delete appointment (Admin)

### Gallery
- `GET /api/gallery` — List published gallery photos by category
- `POST /api/gallery` — Upload photo with alt text & category (Admin)
- `PATCH /api/gallery/:id` — Update photo details (Admin)
- `DELETE /api/gallery/:id` — Delete photo (Admin)

### Academy Course Enquiries
- `POST /api/course-enquiries` — Submit student lead (Rate-limited)
- `GET /api/course-enquiries` — Search & list leads (Admin, supports `?export=csv`)
- `PATCH /api/course-enquiries/:id` — Update lead status & follow-up notes (Admin)
- `DELETE /api/course-enquiries/:id` — Delete lead (Admin)

### Settings
- `GET /api/settings` — Get public business details (Hours, location, rating)
- `PATCH /api/settings` — Update studio configuration (Admin)

---

## 🔒 Production Deployment Checklist

1. **MongoDB Atlas**:
   - Create a free M0 cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
   - Add database user credentials and set network access to `0.0.0.0/0`.
   - Copy connection string to `MONGODB_URI`.
2. **Backend (Render / Railway / Koyeb)**:
   - Root directory: `server`
   - Build command: `npm install`
   - Start command: `node src/server.js`
   - Set environment variables from `.env.example`.
3. **Frontend (Vercel / Netlify)**:
   - Root directory: `client`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Set environment variable: `VITE_API_BASE_URL=https://your-backend-domain.com/api`.
