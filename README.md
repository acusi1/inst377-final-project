Customer Management System
Description

This project is a full stack web application that allows users to manage customer data using Node.js, Express, Supabase, and external APIs. It includes dynamic frontend interaction using Fetch API and demonstrates database operations (create and read) with real-time updates.

Target Browsers
Google Chrome (Desktop & Mobile)
Safari (iOS)
Microsoft Edge
Firefox
Developer Manual
Installation
npm install
Run the Application
node server.js

Then open in your browser:

http://localhost:3000/dashboard.html
API Endpoints
GET /customers

Retrieves all customers from the Supabase database.

POST /customer

Adds a new customer to the database.

GET /fact

Fetches a random fact from an external API.

Project Structure
server.js
package.json
public/
  index.html
  about.html
  dashboard.html
  dashboard.js
  style.css
Known Issues
Backend must be running locally for the application to work
Requires Supabase credentials in server.js
Application will not function without starting the Node.js server
Future Improvements
Add charts or data visualization library (Chart.js)
Improve UI styling and responsiveness
Add authentication system
Deploy to Vercel or Render
