# AI-Powered Smart Accommodation & Local Service Finder

## 📌 Project Overview

Finding a suitable hostel or PG in a new city can be confusing due to scattered information, unreliable listings, and lack of clarity about nearby essential services.

This project builds an **AI-powered, location-aware accommodation discovery platform** that helps users find **hostels/PGs and nearby services** using **open geographic data and intelligent backend processing**.

The system combines:

- OpenStreetMap spatial data
- Fast backend APIs
- Intelligent spatial queries
- A clean and responsive frontend

to deliver **accurate, reliable, and user-friendly accommodation discovery**.

---

# 🎯 Problem Statement

Many accommodation platforms suffer from the following issues:

- Hostel and PG listings are scattered across multiple websites
- Distance to essential services like food, groceries, or laundry is unclear
- Many platforms rely on expensive paid map APIs
- Users cannot easily compare hostels based on nearby facilities

---

# 💡 Solution Overview

This project introduces a **hostel-centric discovery system** that:

- Uses **OpenStreetMap (OSM)** as a free and reliable data source
- Performs **spatial calculations directly in the database**
- Provides **FastAPI-based REST APIs**
- Enables **future AI-based recommendations**

---

# 🚀 Key Features

## 👤 User Features

- Search hostels or PGs by city
- View nearby essential services (food, grocery, laundry, etc.)
- Hostel ranking based on surrounding facilities
- Clean and responsive user interface
- Map-friendly design

---

## 🧠 Intelligence Layer

- Proximity-based hostel ranking
- Backend-driven spatial distance calculations
- Foundation for AI-based recommendations
- Extendable to review sentiment analysis

---

# 🛠️ Backend Capabilities

- OpenStreetMap data ingestion
- Spatial indexing using PostGIS
- FastAPI REST API endpoints
- Scalable backend architecture

---

# 🧑‍🤝‍🧑 Team & Roles

| Member | Role | Responsibilities |
|------|------|------|
| Priyanka | Team Lead | Planning, coordination, documentation |
| Anish | AI Engineer | AI recommendation logic and experimentation |
| Mehwish | Frontend Developer | UI/UX design and frontend implementation |
| Manjiri | Backend Developer | Data ingestion, spatial database, APIs |

---

# 🏗️ System Architecture

```
OpenStreetMap (OSM)
        |
        v
Overpass API
        |
        v
PostgreSQL + PostGIS
(Spatial Processing)
        |
        v
FastAPI Backend
        |
        v
Frontend Web Interface
```

---

# 🗺️ Backend Architecture

## 1️⃣ Data Source – OpenStreetMap

The system uses **OpenStreetMap (OSM)** instead of paid map services.

Hostels and nearby facilities are fetched using the **Overpass API**.

Data includes:

- Hostels / PGs
- Restaurants
- Grocery stores
- Laundry services
- Other essential facilities

---

## 2️⃣ Data Ingestion

The data is stored in **PostgreSQL with PostGIS extension**.

Each record contains:

- OSM ID
- Name
- Category
- Geographic location (`geography(Point,4326)`)

Spatial indexes are created using **GiST indexing** for efficient queries.

---

## 3️⃣ Spatial Distance Calculations

Distance calculations are performed inside the database using **PostGIS functions** such as:

- `ST_Distance`
- Spatial joins

This enables:

- Accurate real-world distance measurement
- Fast queries
- Reduced frontend computation

---

## 4️⃣ FastAPI Backend

The backend exposes REST APIs for:

- Fetching hostels by city
- Fetching nearby services
- Ranking hostels based on nearby amenities

These APIs are designed to be **directly consumable by frontend applications**.

---

# 📁 Project Structure

```
hostel-project-backend-spatial-engine
│
├── backend
│   │
│   ├── app
│   │   ├── api
│   │   ├── db
│   │   ├── models
│   │   ├── services
│   │   └── main.py
│   │
│   ├── ingestion
│   │   └── osm_ingest.py
│   │
│   ├── create_tables.py
│   └── requirements.txt
│
├── frontend
│   ├── node_modules
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
│
└── README.md
```

---

# 🧪 Technology Stack

## Frontend

- HTML
- JavaScript
- Tailwind CSS
- Node.js (for frontend tooling)

## Backend

- Python
- FastAPI
- PostgreSQL
- PostGIS
- Overpass API

## AI (Planned)

- Recommendation system
- NLP-based review analysis
- Intelligent ranking models

---

# ⚙️ Setup & Installation

## 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd hostel-project-backend-spatial-engine
```

---

## 2️⃣ Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend will start at:

```
http://127.0.0.1:8000
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Then open:

```
index.html
```

in your browser.

---

# 🔧 Current Project Status

✔ OpenStreetMap data ingestion implemented  
✔ PostgreSQL + PostGIS spatial database configured  
✔ FastAPI backend APIs developed  
✔ Distance-based hostel ranking logic implemented  
⏳ Frontend and backend integration in progress  

---

# 🔮 Future Enhancements

- Interactive map visualization
- AI-based hostel recommendations
- User preference filtering
- Review sentiment analysis
- Mobile-first UI

---

# 📄 Disclaimer

This project is built for **learning and experimentation with spatial databases, backend systems, and applied AI concepts**.

All geographic data used in this project is sourced from **OpenStreetMap**.

---

# 🙌 Acknowledgements

- OpenStreetMap Contributors
- FastAPI Community
- PostGIS Documentation
- Open-source developer community
