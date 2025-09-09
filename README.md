E-commerce MERN Stack Project
A full-stack e-commerce application built as an internship project. It features a complete user workflow including authentication, product browsing with filters, and a persistent shopping cart. The backend is a RESTful API built with Node.js and Express, while the frontend is a responsive single-page application built with React and Tailwind CSS.

## 🛠️ Tech Stack  

| **Category**      | **Technologies** |
|-------------------|------------------|
| **Backend**       | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) ![REST API](https://img.shields.io/badge/REST-02569B?style=for-the-badge&logo=rest&logoColor=white) |
| **Frontend**      | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7E017?style=for-the-badge&logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) |
| **Auth & State**  | ![Authentication](https://img.shields.io/badge/Auth-JWT%20%7C%20LocalStorage-green?style=for-the-badge) ![Cart System](https://img.shields.io/badge/Cart%20System-Per%20User%20%7C%20Persistent-blue?style=for-the-badge) |


Live Demo
[Link to the deployed application will go here]

Features
Backend (Node.js / Express)
✅ Secure Authentication: User registration and login using JSON Web Tokens (JWT).

✅ RESTful API: Well-structured API for managing users, items, and carts.

✅ Product Management: Full CRUD (Create, Read, Update, Delete) functionality for items.

✅ Advanced Filtering: Filter items by category, price range, and other attributes.

✅ Persistent Shopping Cart: User carts are stored in the database and persist across sessions.

✅ Middleware Protection: Protected routes that require a valid JWT for access.

Frontend (React)
✅ Modern UI: Clean and responsive user interface built with React and styled with Tailwind CSS.

✅ Component-Based Architecture: Reusable components for UI elements like Login, Signup, Product Listings, and Cart.

✅ Client-Side Routing: Seamless navigation between pages without full-page reloads.

✅ State Management: Efficient state management for handling user session and cart data.

✅ Guest & User Cart Sync: A local cart is maintained for guests. Upon login, the guest cart is seamlessly merged with the user's server-side cart.

✅ Token Persistence: JWT is stored in localStorage to keep the user logged in after a page refresh.

Tech Stack
Backend: Node.js, Express.js

Frontend: React, Tailwind CSS

Database: MongoDB (with Mongoose)

Authentication: JSON Web Token (JWT), bcrypt.js

Project Structure
.
+---backend
|   |   .env.example
|   |   package.json
|   |   seed.js         # Script to populate DB with initial data
|   |   server.js       # Main server entry point
|   |
|   +---middleware
|   |       auth.js     # JWT verification middleware
|   |
|   +---models
|   |       Cart.js     # Mongoose model for Cart
|   |       Item.js     # Mongoose model for Item
|   |       User.js     # Mongoose model for User
|   |
|   +---routes
|   |       auth.js     # Auth routes (login/register)
|   |       cart.js     # Cart management routes
|   |       items.js    # Item CRUD and filtering routes
|   |
|   \---utils
|           db.js       # MongoDB connection logic
|
\---frontend
    |   package.json
    |
    +---public
    |       index.html
    |
    \---src
        |   api.js        # Centralized API call functions
        |   App.js        # Main App component with routing
        |   index.css     # Global styles and Tailwind imports
        |   index.js      # React app entry point
        |
        +---components
        |       Cart.js
        |       Listing.js
        |       Login.js
        |       Signup.js
        |
        \---pages
                Products.js # Page component for displaying products
Prerequisites
Node.js (v16 or higher)

npm or yarn

MongoDB instance (local or cloud-based like MongoDB Atlas)

Installation & Setup
Follow these steps to get the project up and running on your local machine.

1. Clone the repository

Bash

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Setup the Backend

Bash

# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the /backend directory
# Copy the contents from .env.example or use the template below
touch .env
Your backend/.env file should look like this:

MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=a_very_strong_and_long_secret_key
PORT=5000
3. (Optional) Seed the Database

To populate the database with initial sample data, run the seed script.

Bash

# Make sure your backend server is NOT running
node seed.js
4. Run the Backend Server

Bash

npm start
The backend API will be running on http://localhost:5000.

5. Setup the Frontend

Bash

# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Run the React development server
npm start
The frontend application will be available at http://localhost:3000.

API Endpoints
The backend provides the following RESTful API endpoints. Protected routes require a Bearer Token in the Authorization header.

Auth Routes (/api/auth)
POST /register: Register a new user.

POST /login: Log in an existing user and receive a JWT.

Item Routes (/api/items)
GET /: Get a list of all items.

Query Params for filtering: ?category=electronics, ?price_gte=100, ?price_lte=500

GET /:id: Get a single item by its ID.

POST /: Create a new item (Protected).

PUT /:id: Update an existing item (Protected).

DELETE /:id: Delete an item (Protected).

Cart Routes (/api/cart)
GET /: Get the cart for the currently authenticated user (Protected).

POST /: Add an item to the user's cart (or update quantity) (Protected).

Request Body: { "itemId": "...", "quantity": 1 }

DELETE /item/:itemId: Remove a specific item from the user's cart (Protected).