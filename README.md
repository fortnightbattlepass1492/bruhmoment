# Coastal Motors Website

A car dealership website with inventory management system.

## Features

- Home page with featured vehicles
- Inventory page with filtering capabilities
- Sell Your Car form for customer submissions
- Admin panel for inventory management
- MongoDB integration for data storage

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

3. Access the website at http://localhost:4000

## MongoDB Configuration

The application uses MongoDB Atlas for data storage. For security reasons, in a production environment, you should use environment variables for the MongoDB connection string.

## File Structure

- `home.html` - Main landing page
- `inventory.html` - Vehicle inventory with filters
- `sell-your-car.html` - Form for customers to submit their vehicles
- `admin.html` - Admin panel for inventory management
- `server.mjs` - Express server with MongoDB integration
- `uploads/` - Directory for vehicle images

## Image Uploads

Images are stored in the `uploads` directory. Make sure this directory exists and has proper permissions.

## Security Notes

- For production deployment, move MongoDB credentials to environment variables
- Implement proper authentication for the admin panel
- Add input validation on all forms