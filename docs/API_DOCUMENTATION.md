# API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://api.luxysalon.com/api
```

## Authentication
Most endpoints require authentication using JWT (JSON Web Tokens).

### Headers
```
Authorization: Bearer <token>
Content-Type: application/json
```

---

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ]
}
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "securePassword123"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

**Errors:**
- `400` - Validation error
- `409` - Email already exists

---

### Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

**Errors:**
- `400` - Invalid credentials
- `401` - Unauthorized

---

### Get Current User
**GET** `/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "customer",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Update Password
**PUT** `/auth/updatepassword`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword456"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Password updated successfully",
  "token": "new_jwt_token_here"
}
```

---

## Booking Endpoints

### Create Booking
**POST** `/bookings`

**Request Body:**
```json
{
  "service_id": "507f1f77bcf86cd799439011",
  "booking_date": "2024-12-25",
  "booking_time": "14:00",
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "+1234567890",
  "message": "First time customer, please call before appointment"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "id": "507f1f77bcf86cd799439012",
    "service": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Classic Manicure",
      "price": 25.00
    },
    "bookingDate": "2024-12-25",
    "bookingTime": "14:00",
    "status": "pending",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "+1234567890",
    "message": "First time customer, please call before appointment",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors:**
- `400` - Validation error or time slot unavailable
- `404` - Service not found

---

### Get All Bookings (Admin/Staff)
**GET** `/bookings`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` (optional): `pending`, `confirmed`, `completed`, `cancelled`
- `date` (optional): `YYYY-MM-DD`
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example:** `/bookings?status=pending&page=1&limit=10`

**Response:** `200 OK`
```json
{
  "success": true,
  "bookings": [
    {
      "id": "507f1f77bcf86cd799439012",
      "service": {
        "id": "507f1f77bcf86cd799439011",
        "name": "Classic Manicure",
        "category": "manicure",
        "price": 25.00
      },
      "bookingDate": "2024-12-25",
      "bookingTime": "14:00",
      "status": "pending",
      "customerName": "John Doe",
      "customerEmail": "john@example.com",
      "customerPhone": "+1234567890",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

---

### Get Booking by ID
**GET** `/bookings/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "booking": {
    "id": "507f1f77bcf86cd799439012",
    "service": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Classic Manicure",
      "category": "manicure",
      "description": "Professional manicure service...",
      "price": 25.00,
      "duration": 45
    },
    "bookingDate": "2024-12-25",
    "bookingTime": "14:00",
    "status": "pending",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "+1234567890",
    "message": "First time customer",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors:**
- `404` - Booking not found

---

### Update Booking Status (Admin/Staff)
**PUT** `/bookings/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Booking status updated",
  "booking": {
    "id": "507f1f77bcf86cd799439012",
    "status": "confirmed",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Cancel Booking
**DELETE** `/bookings/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Booking cancelled successfully"
}
```

---

### Check Availability
**GET** `/bookings/availability`

**Query Parameters:**
- `date` (required): `YYYY-MM-DD`
- `service_id` (required): Service ID

**Example:** `/bookings/availability?date=2024-12-25&service_id=507f1f77bcf86cd799439011`

**Response:** `200 OK`
```json
{
  "success": true,
  "date": "2024-12-25",
  "service": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Classic Manicure"
  },
  "available_slots": [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00"
  ]
}
```

---

## Service Endpoints

### Get All Services
**GET** `/services`

**Query Parameters:**
- `category` (optional): `manicure`, `pedicure`, `facial`, `massage`, `hair`, `lash`, `locs`
- `active` (optional): `true`, `false`

**Example:** `/services?category=manicure&active=true`

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 7,
  "services": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Classic Manicure",
      "category": "manicure",
      "description": "Professional manicure service including nail shaping, cuticle care, and polish application.",
      "price": 25.00,
      "duration": 45,
      "imageUrl": "/uploads/services/manicure1.jpg",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get Service by ID
**GET** `/services/:id`

**Response:** `200 OK`
```json
{
  "success": true,
  "service": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Classic Manicure",
    "category": "manicure",
    "description": "Professional manicure service...",
    "price": 25.00,
    "duration": 45,
    "imageUrl": "/uploads/services/manicure1.jpg",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Create Service (Admin)
**POST** `/services`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Deluxe Manicure",
  "category": "manicure",
  "description": "Premium manicure service with extended massage and premium polish.",
  "price": 45.00,
  "duration": 60,
  "imageUrl": "/uploads/services/manicure-deluxe.jpg"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Service created successfully",
  "service": {
    "id": "507f1f77bcf86cd799439013",
    "name": "Deluxe Manicure",
    "category": "manicure",
    "price": 45.00,
    "duration": 60,
    "isActive": true
  }
}
```

---

### Update Service (Admin)
**PUT** `/services/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "price": 50.00,
  "description": "Updated description"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Service updated successfully",
  "service": {
    "id": "507f1f77bcf86cd799439011",
    "price": 50.00,
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Delete Service (Admin)
**DELETE** `/services/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Service deleted successfully"
}
```

---

## Contact Endpoints

### Submit Contact Form
**POST** `/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Question about services",
  "message": "I would like to know more about your facial services."
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Message sent successfully. We will get back to you soon."
}
```

---

### Get All Contact Messages (Admin)
**GET** `/contact`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `is_read` (optional): `true`, `false`
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:** `200 OK`
```json
{
  "success": true,
  "messages": [
    {
      "id": "507f1f77bcf86cd799439014",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "subject": "Question about services",
      "message": "I would like to know more...",
      "isRead": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25
  }
}
```

---

### Mark Message as Read (Admin)
**PUT** `/contact/:id/read`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Message marked as read"
}
```

---

## Newsletter Endpoints

### Subscribe to Newsletter
**POST** `/newsletter/subscribe`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

**Errors:**
- `400` - Invalid email
- `409` - Email already subscribed

---

### Unsubscribe from Newsletter
**POST** `/newsletter/unsubscribe`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter"
}
```

---

### Get All Subscribers (Admin)
**GET** `/newsletter/subscribers`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `active` (optional): `true`, `false`

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 150,
  "subscribers": [
    {
      "id": "507f1f77bcf86cd799439015",
      "email": "john@example.com",
      "isActive": true,
      "subscribedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## Gallery Endpoints

### Get All Gallery Images
**GET** `/gallery`

**Query Parameters:**
- `category` (optional): `all`, `nails`, `hair`, `facial`, `massage`

**Example:** `/gallery?category=nails`

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 20,
  "images": [
    {
      "id": "507f1f77bcf86cd799439016",
      "title": "Nail Art Design",
      "category": "nails",
      "imageUrl": "/uploads/gallery/nail-art-1.jpg",
      "displayOrder": 1,
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Upload Gallery Image (Admin)
**POST** `/gallery`

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Form Data:**
- `image`: File
- `title`: String
- `category`: String
- `displayOrder`: Number

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "image": {
    "id": "507f1f77bcf86cd799439017",
    "title": "New Design",
    "category": "nails",
    "imageUrl": "/uploads/gallery/new-design.jpg"
  }
}
```

---

### Delete Gallery Image (Admin)
**DELETE** `/gallery/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

---

## Team Endpoints

### Get All Team Members
**GET** `/team`

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 4,
  "team": [
    {
      "id": "507f1f77bcf86cd799439018",
      "name": "Sarah Johnson",
      "position": "Senior Stylist",
      "bio": "10+ years of experience in hair styling and coloring.",
      "imageUrl": "/uploads/team/sarah.jpg",
      "socialMedia": {
        "facebook": "https://facebook.com/sarahjohnson",
        "instagram": "https://instagram.com/sarahjohnson",
        "twitter": "https://twitter.com/sarahjohnson"
      },
      "displayOrder": 1,
      "isActive": true
    }
  ]
}
```

---

### Add Team Member (Admin)
**POST** `/team`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Emily Davis",
  "position": "Nail Technician",
  "bio": "Specialized in nail art and gel manicures.",
  "imageUrl": "/uploads/team/emily.jpg",
  "socialMedia": {
    "facebook": "https://facebook.com/emilydavis",
    "instagram": "https://instagram.com/emilydavis"
  },
  "displayOrder": 5
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Team member added successfully",
  "member": {
    "id": "507f1f77bcf86cd799439019",
    "name": "Emily Davis",
    "position": "Nail Technician"
  }
}
```

---

### Update Team Member (Admin)
**PUT** `/team/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "position": "Senior Nail Technician",
  "bio": "Updated bio..."
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Team member updated successfully"
}
```

---

### Delete Team Member (Admin)
**DELETE** `/team/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Team member removed successfully"
}
```

---

## Testimonial Endpoints

### Get Approved Testimonials
**GET** `/testimonials`

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 10,
  "testimonials": [
    {
      "id": "507f1f77bcf86cd799439020",
      "customerName": "Jane Smith",
      "customerLocation": "New York, NY",
      "rating": 5,
      "reviewText": "Amazing service! Highly recommend.",
      "imageUrl": "/uploads/testimonials/jane.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Submit Testimonial
**POST** `/testimonials`

**Request Body:**
```json
{
  "customerName": "Jane Smith",
  "customerLocation": "New York, NY",
  "rating": 5,
  "reviewText": "Amazing service! The staff was professional and friendly.",
  "imageUrl": "/uploads/testimonials/jane.jpg"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Thank you for your review! It will be published after approval."
}
```

---

### Approve Testimonial (Admin)
**PUT** `/testimonials/:id/approve`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Testimonial approved successfully"
}
```

---

### Delete Testimonial (Admin)
**DELETE** `/testimonials/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Testimonial deleted successfully"
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation error |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

---

## Rate Limiting

- **General endpoints**: 100 requests per 15 minutes per IP
- **Authentication endpoints**: 5 requests per 15 minutes per IP
- **File upload endpoints**: 10 requests per hour per user

---

## Pagination

All list endpoints support pagination:

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

**Response includes:**
```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

---

## File Upload

**Supported formats:**
- Images: JPG, JPEG, PNG, GIF
- Max size: 5MB

**Upload endpoint:**
```
POST /upload
Content-Type: multipart/form-data
```

**Response:**
```json
{
  "success": true,
  "fileUrl": "/uploads/filename.jpg"
}
```

---

## Webhooks (Future Feature)

Webhooks will be available for:
- New booking created
- Booking status changed
- New contact message
- Payment received

---

## API Versioning

Current version: `v1`

Future versions will be accessible via:
```
/api/v2/...
```

---

## Support

For API support:
- Email: api-support@luxysalon.com
- Documentation: https://docs.luxysalon.com
- Status Page: https://status.luxysalon.com
