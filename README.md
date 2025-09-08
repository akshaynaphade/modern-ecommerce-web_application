# E-commerce Internship Project

## Features
- User authentication with JWT
- Item CRUD APIs with filters (price, category)
- Add/remove items from cart
- Cart persists after logout (stored in DB)
- Frontend: React + TailwindCSS (modern responsive UI)

## Setup

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Environment Variables
Create a `.env` file inside `backend/` with:
```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
```
