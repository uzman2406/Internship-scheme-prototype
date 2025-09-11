🎯 AI-Based Internship Recommendation Engine – PM Internship Scheme Prototype

This project is a prototype for the Smart India Hackathon (SIH) problem statement 25034, which aims to build an AI-based recommendation engine for the PM Internship Scheme. The system helps students and first-time applicants discover the most relevant internships based on their profile, academic background, interests, and location.

✨ Features

📌 Personalized Recommendations – Suggests 3–5 most relevant internships (not overwhelming lists).

🎓 Profile-Based Matching – Uses education, skills, sector interests, and location preferences.

📱 Mobile-Friendly UI – Built with ReactJS + Bootstrap, optimized for low digital literacy users.

🌐 Multi-Language Ready – Can be extended with regional language support.

⚡ Lightweight AI Engine – Rule-based / ML-light backend in Django for scalability.

🛠 Seamless Integration – Easy to plug into the existing PM Internship Scheme portal.

🏗️ Tech Stack
Frontend

⚛️ React.js

🎨 Bootstrap 5

Backend

🐍 Django (REST Framework)

🔎 Recommendation Engine (Rule-based / ML-light)

Others

SQLite / PostgreSQL (Database)

Git & GitHub for version control

📂 Project Structure
Internship-scheme-prototype/
│── backend/            # Django backend
│   ├── internship/     # Core Django app
│   ├── manage.py
│   └── requirements.txt
│
│── frontend/           # ReactJS frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
│
│── .gitignore
│── README.md

🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/uzman2406/Internship-scheme-prototype.git
cd Internship-scheme-prototype

2️⃣ Setup Backend (Django)
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

3️⃣ Setup Frontend (ReactJS)
cd frontend
npm install
npm start

4️⃣ Access App

Frontend: http://localhost:3000

Backend API: http://localhost:8000/api/

📌 Future Scope

🤖 Smarter ML Models for recommendation

🗣️ Regional language support (Hindi, Bengali, Tamil, etc.)

🌍 Offline-first capability for rural/low-network areas

🧩 Integration with PM Internship Portal

🤝 Contributing

Fork the repo

Create a new branch (feature-xyz)

Commit your changes

Push to your fork and create a Pull Request
