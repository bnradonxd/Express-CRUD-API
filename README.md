# AI Product Management System

A full-stack product management system built with Node.js, Express and Firebase, featuring REST APIs, workflow automation with n8n, AI-powered product enrichment using Google Gemini and real-time synchronization with Google Sheets.

This project started as a university CRUD exercise focused on connecting a backend to a real frontend beyond Postman. It evolved into a production-ready application integrating cloud deployment, automation workflows, asynchronous processing and generative AI services.

---

## Live Demo

- Frontend: https://express-crud-api-bnradon.vercel.app/
- API: https://express-crud-api-bnradon.onrender.com/items
- Google Sheets Sync: https://docs.google.com/spreadsheets/d/1yjLuSYvkeEuaXs22j4UAbrlkyp_kob9LFgfGI1CUWXo/edit

---

## What it does

- Create, read, update and delete products from a deployed frontend
- REST API connected to Firebase Firestore
- Real-time frontend synchronization with backend updates
- AI-powered automatic product enrichment using Google Gemini
- Automatic generation of:
  - Product categories
  - Optimized descriptions
  - Short summaries
  - Dynamic tags
- Workflow automation using n8n and webhooks
- Automatic synchronization with Google Sheets
- Error handling and application state management
- CORS configuration between frontend and backend deployments
- Modular backend architecture following REST API best practices

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express |
| Frontend | Vanilla JavaScript, HTML, CSS |
| Database | Firebase Firestore |
| Automation | n8n (Webhooks + Workflows) |
| AI Integration | Google Gemini |
| Backend Deployment | Render |
| Frontend Deployment | Vercel |
| Automation Hosting | Railway |
| Tools | Git, GitHub, Postman |

---

## Project structure

```bash
├── src/
│   ├── controllers/   # Business logic
│   ├── routes/        # API routes
│   ├── services/      # External integrations
│   └── utils/         # Firebase config and helpers
│
├── front/             # Frontend files
│   ├── app.js
│   ├── style.css
│   └── index.html
│
├── server.js
├── index.js
└── package.json  

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /items |Get all products |
| GET | /items/:id | Get products by id |
| POST | /items | Create product|
| PUT | /items/:id | Update product|
| DELETE | /items/:id | Delete product|

---

## How it works

- The frontend sends HTTP requests using fetch() to the deployed API
- Express handles routing, validation and business logic
- Firebase Firestore stores product data
- A webhook is triggered when a new product is created
- n8n receives and processes the request
- Google Gemini generates AI-enhanced product information
- Firestore updates automatically with enriched data
- Product information is synchronized into Google Sheets
- Updated data is rendered dynamically on the frontend

---

## Automation Flow

1. Product is created through the API
2. Backend triggers an n8n webhook
3. n8n processes the product data 
4. Google Gemini generates enhanced information 
5. Firestore updates automatically
6. Data is synchronized with Google Sheets
7. Frontend updates dynamically

---

## Preview

![Screenshot](./front/screenshot.png)

---

## Run locally

```bash
git clone https://github.com/bnradon/Express-CRUD-API
cd Express-CRUD-API
npm install

# Start backend
npm start

# Open frontend
front/index.html


## Enviroment variables 

For deployment, Firebase credentials are handled using environment variables instead of local JSON files:

FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
FIREBASE_CLIENT_EMAIL=YOUR_EMAIL
FIREBASE_PRIVATE_KEY=YOUR_KEY

N8N_WEBHOOK_URL=YOUR_WEBHOOK
GEMINI_API_KEY=YOUR_API_KEY
```

---

## Features implemented

- Production-ready REST API deployment
- Firebase Firestore integration
- Full CRUD operations
- Frontend connected to live backend
- Workflow automation using n8n
- AI-powered product enhancement
- Google Sheets synchronization
- Real-time frontend updates
- Error handling and validation
- Cloud deployment architecture
- CORS handling
- Modular backend structure

---

## Future Improvements

- Authentication and authorization
- Role-based access
- Image generation and upload support
- Pagination and filtering
- Docker containerization
- CI/CD pipelines
- WebSocket real-time updates
- Queue-based asynchronous processing
- Automated testing

---

*Built by [@bnradon] (https://github.com/bnradon) as part of my backend and full-stack learning journey :)
