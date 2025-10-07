# Backend Integration Guide

## Overview
This guide provides step-by-step instructions for implementing a backend system for the Luxy Beauty Salon website.

---

## Table of Contents
1. [Technology Stack Options](#technology-stack-options)
2. [Database Design](#database-design)
3. [API Endpoints](#api-endpoints)
4. [Implementation Steps](#implementation-steps)
5. [Security Considerations](#security-considerations)
6. [Testing](#testing)
7. [Deployment](#deployment)

---

## Technology Stack Options

### Option 1: Node.js + Express (Recommended)
**Pros:**
- JavaScript full-stack (same language as frontend)
- Large ecosystem (npm packages)
- Fast development
- Good for real-time features

**Tech Stack:**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (NoSQL) or PostgreSQL (SQL)
- **ORM:** Mongoose (MongoDB) or Sequelize (PostgreSQL)
- **Authentication:** JWT (JSON Web Tokens)
- **Email:** Nodemailer
- **File Upload:** Multer

**Installation:**
```bash
# Initialize Node.js project
npm init -y

# Install dependencies
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install nodemailer multer express-validator
npm install --save-dev nodemon
```

---

### Option 2: Python + Django/Flask
**Pros:**
- Robust and mature
- Excellent for data processing
- Strong security features
- Great documentation

**Tech Stack:**
- **Language:** Python 3.x
- **Framework:** Django or Flask
- **Database:** PostgreSQL or MySQL
- **ORM:** Django ORM or SQLAlchemy
- **Authentication:** Django Auth or Flask-Login
- **Email:** Django Email or Flask-Mail

**Installation:**
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Django
pip install django djangorestframework django-cors-headers
pip install psycopg2-binary pillow python-decouple

# Or install Flask
pip install flask flask-sqlalchemy flask-cors flask-jwt-extended
pip install flask-mail python-dotenv
```

---

### Option 3: PHP + Laravel
**Pros:**
- Widely supported hosting
- Mature ecosystem
- Easy deployment
- Cost-effective

**Tech Stack:**
- **Language:** PHP 8.x
- **Framework:** Laravel
- **Database:** MySQL or PostgreSQL
- **Authentication:** Laravel Sanctum
- **Email:** Laravel Mail

**Installation:**
```bash
# Install Composer (if not installed)
# Then create Laravel project
composer create-project laravel/laravel luxy-backend

# Install additional packages
composer require laravel/sanctum
composer require intervention/image
```

---

### Option 4: Serverless (Firebase/Supabase)
**Pros:**
- No server management
- Auto-scaling
- Pay-as-you-go
- Quick setup

**Tech Stack:**
- **Backend:** Firebase or Supabase
- **Database:** Firestore or Supabase PostgreSQL
- **Authentication:** Firebase Auth or Supabase Auth
- **Storage:** Firebase Storage or Supabase Storage
- **Functions:** Cloud Functions

**Setup:**
```bash
# Firebase
npm install -g firebase-tools
firebase login
firebase init

# Supabase
npm install @supabase/supabase-js
```

---

## Database Design

### Database Schema

#### 1. Users Table
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('customer', 'admin', 'staff') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 2. Services Table
```sql
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration INT NOT NULL, -- in minutes
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 3. Bookings Table
```sql
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    service_id INT,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
```

#### 4. Team Members Table
```sql
CREATE TABLE team_members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    bio TEXT,
    image_url VARCHAR(255),
    facebook_url VARCHAR(255),
    instagram_url VARCHAR(255),
    twitter_url VARCHAR(255),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 5. Testimonials Table
```sql
CREATE TABLE testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    customer_location VARCHAR(100),
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    image_url VARCHAR(255),
    is_approved BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 6. Gallery Table
```sql
CREATE TABLE gallery (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    category VARCHAR(50) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 7. Contact Messages Table
```sql
CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    replied_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 8. Newsletter Subscribers Table
```sql
CREATE TABLE newsletter_subscribers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL
);
```

#### 9. Business Settings Table
```sql
CREATE TABLE business_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO business_settings (setting_key, setting_value) VALUES
('business_hours', '{"monday": "9:00 AM - 7:00 PM", "tuesday": "9:00 AM - 7:00 PM", ...}'),
('contact_email', 'info@luxysalon.com'),
('contact_phone', '+1 (555) 123-4567'),
('address', '123 Beauty Street, City, State 12345');
```

---

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/register
Register a new user
```json
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

#### POST /api/auth/login
User login
```json
Request:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

#### POST /api/auth/logout
User logout (invalidate token)

---

### Booking Endpoints

#### POST /api/bookings
Create a new booking
```json
Request:
{
  "service_id": 1,
  "booking_date": "2024-12-25",
  "booking_time": "14:00",
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "+1234567890",
  "message": "First time customer"
}

Response:
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "id": 1,
    "booking_date": "2024-12-25",
    "booking_time": "14:00",
    "status": "pending"
  }
}
```

#### GET /api/bookings
Get all bookings (Admin only)
```json
Query Parameters:
- status: pending|confirmed|completed|cancelled
- date: YYYY-MM-DD
- page: 1
- limit: 10

Response:
{
  "success": true,
  "bookings": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50
  }
}
```

#### GET /api/bookings/:id
Get booking by ID

#### PUT /api/bookings/:id
Update booking status
```json
Request:
{
  "status": "confirmed"
}
```

#### DELETE /api/bookings/:id
Cancel booking

#### GET /api/bookings/availability
Check available time slots
```json
Query Parameters:
- date: YYYY-MM-DD
- service_id: 1

Response:
{
  "success": true,
  "available_slots": [
    "09:00", "10:00", "11:00", "14:00", "15:00"
  ]
}
```

---

### Service Endpoints

#### GET /api/services
Get all services
```json
Query Parameters:
- category: manicure|pedicure|facial|massage|hair|lash|locs

Response:
{
  "success": true,
  "services": [
    {
      "id": 1,
      "name": "Classic Manicure",
      "category": "manicure",
      "price": 25.00,
      "duration": 45,
      "description": "...",
      "image_url": "..."
    }
  ]
}
```

#### GET /api/services/:id
Get service by ID

#### POST /api/services (Admin only)
Create new service

#### PUT /api/services/:id (Admin only)
Update service

#### DELETE /api/services/:id (Admin only)
Delete service

---

### Contact Endpoints

#### POST /api/contact
Submit contact form
```json
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Question about services",
  "message": "I would like to know..."
}

Response:
{
  "success": true,
  "message": "Message sent successfully"
}
```

#### GET /api/contact (Admin only)
Get all contact messages

---

### Newsletter Endpoints

#### POST /api/newsletter/subscribe
Subscribe to newsletter
```json
Request:
{
  "email": "john@example.com"
}

Response:
{
  "success": true,
  "message": "Subscribed successfully"
}
```

#### POST /api/newsletter/unsubscribe
Unsubscribe from newsletter

---

### Gallery Endpoints

#### GET /api/gallery
Get all gallery images
```json
Query Parameters:
- category: all|nails|hair|facial|massage

Response:
{
  "success": true,
  "images": [...]
}
```

#### POST /api/gallery (Admin only)
Upload new image

#### DELETE /api/gallery/:id (Admin only)
Delete image

---

### Team Endpoints

#### GET /api/team
Get all team members

#### POST /api/team (Admin only)
Add team member

#### PUT /api/team/:id (Admin only)
Update team member

#### DELETE /api/team/:id (Admin only)
Remove team member

---

### Testimonial Endpoints

#### GET /api/testimonials
Get approved testimonials

#### POST /api/testimonials
Submit new testimonial

#### PUT /api/testimonials/:id/approve (Admin only)
Approve testimonial

---

## Implementation Steps

### Step 1: Set Up Development Environment

#### For Node.js + Express:
```bash
# Create project directory
mkdir luxy-backend
cd luxy-backend

# Initialize npm
npm init -y

# Install dependencies
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install nodemailer multer express-validator helmet morgan
npm install --save-dev nodemon

# Create folder structure
mkdir src
mkdir src/models src/routes src/controllers src/middleware src/config src/utils
```

#### Create .env file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/luxy_salon
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:3000

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

---

### Step 2: Create Server (server.js)

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files
app.use('/uploads', express.static('uploads'));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/bookings', require('./src/routes/bookings'));
app.use('/api/services', require('./src/routes/services'));
app.use('/api/contact', require('./src/routes/contact'));
app.use('/api/newsletter', require('./src/routes/newsletter'));
app.use('/api/gallery', require('./src/routes/gallery'));
app.use('/api/team', require('./src/routes/team'));
app.use('/api/testimonials', require('./src/routes/testimonials'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

### Step 3: Create Models

#### User Model (src/models/User.js)
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['customer', 'admin', 'staff'],
    default: 'customer'
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

#### Booking Model (src/models/Booking.js)
```javascript
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  bookingDate: {
    type: Date,
    required: [true, 'Booking date is required']
  },
  bookingTime: {
    type: String,
    required: [true, 'Booking time is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required']
  },
  customerEmail: {
    type: String,
    required: [true, 'Customer email is required']
  },
  customerPhone: {
    type: String,
    required: [true, 'Customer phone is required']
  },
  message: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
```

#### Service Model (src/models/Service.js)
```javascript
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['manicure', 'pedicure', 'facial', 'massage', 'hair', 'lash', 'locs']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: 15
  },
  imageUrl: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
```

---

### Step 4: Create Controllers

#### Booking Controller (src/controllers/bookingController.js)
```javascript
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const { sendBookingConfirmation } = require('../utils/email');

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const {
      service_id,
      booking_date,
      booking_time,
      customer_name,
      customer_email,
      customer_phone,
      message
    } = req.body;

    // Validate service exists
    const service = await Service.findById(service_id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Check if time slot is available
    const existingBooking = await Booking.findOne({
      bookingDate: booking_date,
      bookingTime: booking_time,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    // Create booking
    const booking = await Booking.create({
      service: service_id,
      bookingDate: booking_date,
      bookingTime: booking_time,
      customerName: customer_name,
      customerEmail: customer_email,
      customerPhone: customer_phone,
      message,
      user: req.user?.id // If user is logged in
    });

    // Send confirmation email
    await sendBookingConfirmation(booking, service);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all bookings (Admin)
exports.getAllBookings = async (req, res) => {
  try {
    const { status, date, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (date) query.bookingDate = new Date(date);

    const bookings = await Booking.find(query)
      .populate('service', 'name category price')
      .sort({ bookingDate: -1, bookingTime: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Booking.countDocuments(query);

    res.json({
      success: true,
      bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('service');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking status updated',
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Check availability
exports.checkAvailability = async (req, res) => {
  try {
    const { date, service_id } = req.query;

    const service = await Service.findById(service_id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Get all bookings for the date
    const bookings = await Booking.find({
      bookingDate: new Date(date),
      status: { $in: ['pending', 'confirmed'] }
    }).select('bookingTime');

    // Generate time slots (9 AM to 7 PM, every hour)
    const allSlots = [];
    for (let hour = 9; hour <= 19; hour++) {
      allSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    // Remove booked slots
    const bookedTimes = bookings.map(b => b.bookingTime);
    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));

    res.json({
      success: true,
      available_slots: availableSlots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

---

### Step 5: Create Routes

#### Booking Routes (src/routes/bookings.js)
```javascript
const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  checkAvailability
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', createBooking);
router.get('/', protect, authorize('admin', 'staff'), getAllBookings);
router.get('/availability', checkAvailability);
router.get('/:id', protect, getBookingById);
router.put('/:id', protect, authorize('admin', 'staff'), updateBookingStatus);

module.exports = router;
```

---

### Step 6: Create Middleware

#### Auth Middleware (src/middleware/auth.js)
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

// Authorize roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};
```

---

### Step 7: Create Email Utility

#### Email Utility (src/utils/email.js)
```javascript
const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send booking confirmation
exports.sendBookingConfirmation = async (booking, service) => {
  const mailOptions = {
    from: `Luxy Salon <${process.env.EMAIL_USER}>`,
    to: booking.customerEmail,
    subject: 'Booking Confirmation - Luxy Beauty Salon',
    html: `
      <h1>Booking Confirmation</h1>
      <p>Dear ${booking.customerName},</p>
      <p>Your booking has been confirmed!</p>
      <h3>Booking Details:</h3>
      <ul>
        <li><strong>Service:</strong> ${service.name}</li>
        <li><strong>Date:</strong> ${booking.bookingDate.toDateString()}</li>
        <li><strong>Time:</strong> ${booking.bookingTime}</li>
        <li><strong>Price:</strong> $${service.price}</li>
      </ul>
      <p>We look forward to seeing you!</p>
      <p>Best regards,<br>Luxy Beauty Salon Team</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Send contact form notification
exports.sendContactNotification = async (contactData) => {
  const mailOptions = {
    from: `Luxy Salon <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Contact Message from ${contactData.name}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Phone:</strong> ${contactData.phone}</p>
      <p><strong>Subject:</strong> ${contactData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message}</p>
    `
  };

  await transporter.sendMail(mailOptions);
};
```

---

### Step 8: Update Frontend to Connect to Backend

#### Update index.js (Frontend)

```javascript
// API Base URL
const API_URL = 'http://localhost:5000/api';

// Booking Form Submission
document.getElementById('booking-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    service_id: document.getElementById('service').value,
    booking_date: document.getElementById('date').value,
    booking_time: document.getElementById('time').value,
    customer_name: document.getElementById('name').value,
    customer_email: document.getElementById('email').value,
    customer_phone: document.getElementById('phone').value,
    message: document.getElementById('message').value
  };

  try {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (data.success) {
      showModal('Success!', 'Your booking has been confirmed. We will contact you shortly.');
      document.getElementById('booking-form').reset();
    } else {
      showModal('Error', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    showModal('Error', 'Something went wrong. Please try again.');
  }
});

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('contact-name').value,
    email: document.getElementById('contact-email').value,
    phone: document.getElementById('contact-phone').value,
    subject: document.getElementById('contact-subject').value,
    message: document.getElementById('contact-message').value
  };

  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (data.success) {
      showModal('Success!', 'Your message has been sent. We will get back to you soon.');
      document.getElementById('contact-form').reset();
    } else {
      showModal('Error', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    showModal('Error', 'Something went wrong. Please try again.');
  }
});

// Load Services from Backend
async function loadServices() {
  try {
    const response = await fetch(`${API_URL}/services`);
    const data = await response.json();

    if (data.success) {
      // Populate service dropdown
      const serviceSelect = document.getElementById('service');
      data.services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = `${service.name} - $${service.price}`;
        serviceSelect.appendChild(option);
      });
    }
  } catch (error) {
    console.error('Error loading services:', error);
  }
}

// Check availability
async function checkAvailability(date, serviceId) {
  try {
    const response = await fetch(`${API_URL}/bookings/availability?date=${date}&service_id=${serviceId}`);
    const data = await response.json();

    if (data.success) {
      // Update time dropdown with available slots
      const timeSelect = document.getElementById('time');
      timeSelect.innerHTML = '<option value="">Select Time</option>';
      
      data.available_slots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = slot;
        timeSelect.appendChild(option);
      });
    }
  } catch (error) {
    console.error('Error checking availability:', error);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadServices();
  
  // Check availability when date or service changes
  document.getElementById('date').addEventListener('change', () => {
    const date = document.getElementById('date').value;
    const serviceId = document.getElementById('service').value;
    if (date && serviceId) {
      checkAvailability(date, serviceId);
    }
  });
  
  document.getElementById('service').addEventListener('change', () => {
    const date = document.getElementById('date').value;
    const serviceId = document.getElementById('service').value;
    if (date && serviceId) {
      checkAvailability(date, serviceId);
    }
  });
});
```

---

## Security Considerations

### 1. Input Validation
```javascript
const { body, validationResult } = require('express-validator');

// Validation middleware
exports.validateBooking = [
  body('customer_email').isEmail().normalizeEmail(),
  body('customer_phone').isMobilePhone(),
  body('booking_date').isISO8601().toDate(),
  body('customer_name').trim().isLength({ min: 2, max: 100 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];
```

### 2. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 3. SQL Injection Prevention
- Use parameterized queries
- Use ORM (Mongoose, Sequelize)
- Validate and sanitize all inputs

### 4. XSS Protection
```javascript
const xss = require('xss-clean');
app.use(xss());
```

### 5. CORS Configuration
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
}));
```

### 6. Environment Variables
- Never commit .env file
- Use strong JWT secrets
- Rotate secrets regularly

### 7. HTTPS
- Use SSL certificates in production
- Redirect HTTP to HTTPS

---

## Testing

### Unit Testing (Jest)
```bash
npm install --save-dev jest supertest

# Create test file: tests/booking.test.js
```

```javascript
const request = require('supertest');
const app = require('../server');

describe('Booking API', () => {
  test('POST /api/bookings - should create booking', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .send({
        service_id: '123',
        booking_date: '2024-12-25',
        booking_time: '14:00',
        customer_name: 'Test User',
        customer_email: 'test@example.com',
        customer_phone: '+1234567890'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
});
```

### API Testing (Postman)
1. Create Postman collection
2. Test all endpoints
3. Test error scenarios
4. Export collection for documentation

---

## Deployment

### Option 1: Heroku
```bash
# Install Heroku CLI
heroku login
heroku create luxy-salon-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
```

### Option 2: DigitalOcean/AWS
1. Create droplet/EC2 instance
2. Install Node.js and MongoDB
3. Clone repository
4. Install dependencies
5. Set up PM2 for process management
6. Configure Nginx as reverse proxy
7. Set up SSL with Let's Encrypt

### Option 3: Vercel/Netlify Functions
- Deploy as serverless functions
- Use MongoDB Atlas for database
- Configure environment variables

---

## Monitoring & Maintenance

### Logging
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Error Tracking
- Use Sentry for error tracking
- Set up alerts for critical errors

### Performance Monitoring
- Use New Relic or DataDog
- Monitor API response times
- Track database query performance

### Backup Strategy
- Daily database backups
- Store backups in multiple locations
- Test restore procedures regularly

---

## Next Steps

1. ✅ Choose technology stack
2. ✅ Set up development environment
3. ✅ Create database schema
4. ✅ Implement API endpoints
5. ✅ Connect frontend to backend
6. ✅ Test thoroughly
7. ✅ Deploy to production
8. ✅ Monitor and maintain

---

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Best Practices](https://jwt.io/introduction)
- [REST API Design Guide](https://restfulapi.net/)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)

---

## Support

For backend implementation questions:
1. Review this guide thoroughly
2. Check official documentation
3. Test in development environment first
4. Use version control (Git)
5. Document your changes
