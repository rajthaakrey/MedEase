# MedEase — Pharmacy Management System

> Free, open-source pharmacy management software built for Indian medical stores. Manage inventory, billing, expiry alerts, suppliers, prescriptions and sales — completely free, no subscription ever.

![MedEase](https://img.shields.io/badge/status-in%20development-yellow?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![FastAPI](https://img.shields.io/badge/backend-FastAPI-009688?style=flat-square)
![HTML CSS JS](https://img.shields.io/badge/frontend-HTML%20%2F%20CSS%20%2F%20JS-orange?style=flat-square)

---

## What is MedEase?

MedEase is a pharmacy management web application designed specifically for independent Indian pharmacies and medical stores. It replaces expensive legacy software with a modern, fast, and completely free alternative.

This is a final year project built by **Raj Thakre**.

---

## Features

| Feature | Description |
|---|---|
| **Inventory Management** | Track every medicine, batch number and expiry date. Get low-stock alerts before you run out. |
| **Fast POS Billing** | Search medicines, add to cart and generate invoices in seconds. Stock deducts automatically using FEFO (First Expiry, First Out). |
| **Expiry Alerts** | See what expires in 30, 60 or 90 days — and the exact rupee value of stock at risk. |
| **Supplier Management** | Record purchases, manage vendors and view full procurement history in one place. |
| **Demand Forecasting** | Know which medicines need reordering before stock runs out, based on actual daily sales. |
| **Sales Reports** | Daily, weekly and monthly revenue. Profit per medicine. Everything to make better decisions. |
| **CRM Call Reminders** | Never miss a customer refill — see who hasn't reordered in 30+ days and call them directly. |

---

## Tech Stack

### Frontend
- Plain HTML, CSS, JavaScript — no framework
- GSAP + ScrollTrigger for animations
- Inter font (Google Fonts)
- Squircle design system with `corner-shape: squircle`

### Backend
- **FastAPI** — Python web framework
- **SQLite** — database (file-based, zero setup)
- **SQLAlchemy** — ORM for database interactions
- **JWT (python-jose)** — stateless authentication tokens
- **bcrypt (passlib)** — secure password hashing

---

## Project Structure

```
medease/
│
├── frontend/
│   ├── index.html              # Landing page
│   ├── login.html              # Login page
│   ├── signup.html             # Two-step signup
│   ├── forgot-pass.html        # Forgot password (email OTP)
│   ├── reset-pass.html         # Reset password
│   │
│   ├── css/
│   │   ├── style.css           # Main stylesheet
│   │   └── auth.css            # Auth pages stylesheet
│   │
│   ├── js/
│   │   └── script.js           # All frontend JS + GSAP animations
│   │
│   └── icons/                  # SVG icons for product definition section
│
└── backend/
    ├── main.py                 # FastAPI app + all API routes
    ├── database.py             # SQLite connection setup
    ├── models.py               # Database table definitions
    ├── schemas.py              # Pydantic request/response shapes
    ├── auth.py                 # JWT + bcrypt logic
    ├── requirements.txt        # Python dependencies
    └── medease.db              # SQLite database (auto-created on first run)
```

---

## Getting Started

### Prerequisites
- Python 3.10 or higher
- A modern web browser

### Backend Setup

**1. Clone the repository**
```bash
git clone https://github.com/your-username/medease.git
cd medease/backend
```

**2. Create and activate a virtual environment**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac / Linux
python -m venv venv
source venv/bin/activate
```

**3. Install dependencies**
```bash
pip install -r requirements.txt
```

**4. Generate a secret key**

Open `auth.py` and replace the `SECRET_KEY` value with a real random string:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```
Paste the output into `auth.py` line 15.

**5. Run the server**
```bash
uvicorn main:app --reload
```

The API is now running at `http://127.0.0.1:8000`

**6. Explore the API docs**

FastAPI generates interactive documentation automatically. Open your browser and go to:
```
http://127.0.0.1:8000/docs
```

### Frontend Setup

No build step needed. Just open `frontend/index.html` in your browser, or serve it with any static file server:

```bash
# Using Python's built-in server
cd frontend
python -m http.server 5500
```

Then open `http://localhost:5500` in your browser.

> **Note:** The frontend currently points API calls to `http://127.0.0.1:8000`. Make sure the backend server is running before testing auth pages.

---

## API Endpoints

### Auth

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/auth/signup` | No | Register a new user |
| `POST` | `/auth/login` | No | Log in, returns JWT token |
| `GET` | `/auth/me` | Yes | Get current user profile |
| `PATCH` | `/auth/me` | Yes | Update name or pharmacy name |

### Health

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API health check |

### Signup Request Body
```json
{
  "pharmacy_name": "Khandelwal Pharmacy",
  "name": "Rohan Khandelwal",
  "email": "rohan@pharmacy.com",
  "password": "SecurePass123",
  "role": "owner"
}
```

### Login Request Body
```json
{
  "email": "rohan@pharmacy.com",
  "password": "SecurePass123"
}
```

### Token Response
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "pharmacy_name": "Khandelwal Pharmacy",
    "name": "Rohan Khandelwal",
    "email": "rohan@pharmacy.com",
    "role": "owner",
    "created_at": "2026-03-15T10:30:00"
  }
}
```

---

## Authentication Flow

```
User fills signup form
        ↓
POST /auth/signup
        ↓
Server hashes password with bcrypt
        ↓
User saved to SQLite database
        ↓
Server creates JWT token (valid 7 days)
        ↓
Token returned to browser
        ↓
Browser stores token in localStorage
        ↓
Every future API request sends:
Authorization: Bearer <token>
```

---

## User Roles

MedEase supports three roles with different access levels:

| Role | Access |
|---|---|
| `owner` | Full access — analytics, reports, all settings |
| `pharmacist` | Billing, inventory, expiry alerts |
| `staff` | Billing and stock lookup only |

---

## Roadmap

- [x] Landing page with GSAP animations
- [x] Dashboard mockup with tabbed interface
- [x] Auth pages — login, signup (2-step), forgot password, reset password
- [x] Backend — FastAPI + JWT + bcrypt + SQLite
- [ ] Connect frontend auth forms to backend API
- [ ] Email OTP for password reset
- [ ] Inventory module
- [ ] POS billing module
- [ ] Expiry alerts module
- [ ] Supplier management module
- [ ] Sales reports module
- [ ] Demand forecasting module
- [ ] Role-based access control on all routes

---

## Design Decisions

**Why plain HTML/CSS/JS?**
Keeps the project accessible to anyone who wants to learn from it, avoids build tool complexity, and loads fast with no framework overhead.

**Why SQLite?**
Zero configuration for a project at this stage. The entire database is a single file. Migrating to PostgreSQL later requires changing one line in `database.py`.

**Why JWT instead of sessions?**
Stateless — the server doesn't need to store session data. Works well for future mobile app or multi-server deployment without any changes.

**Why bcrypt?**
Industry standard for password hashing. Intentionally slow to brute-force. Even if the database is leaked, passwords cannot be recovered.

---

## Screenshots

> Screenshots will be added once the core modules are complete.

---

## Contributing

This is a final year project. Suggestions and feedback are welcome via GitHub Issues.

---

## License

MIT License — free to use, modify and distribute.

---

## Author

**Raj Thakre**
Built as a university project — a free pharmacy management system for Indian medical stores.

---

*MedEase — Free forever. No subscription. No credit card.*
