# PM Internship Recommender (Frontend Prototype)

A **mobile-first, lightweight, interactive React app** to help users find suitable PM internships based on their skills, education, location, and mode preference.

## Features

- Fully **responsive and mobile-first** design.
- **Rule-based scoring engine** to rank internships.
- **Multi-language support**: English & Hindi (i18n ready).
- **Custom skill input** for personalized recommendations.
- **Creative UI**: glassmorphism cards, gradient buttons, hover animations, skill icons.
- **Demo dataset** included; easy to replace with live API data.

## Tech Stack

- **Frontend:** React.js, HTML5, CSS3
- **Optional Backend (Future):** FastAPI or Django
- **Icons/Assets:** SVG images for skills, locations, and stipend

## How to Run (Frontend Only)

1. Clone the repository:

```bash
git clone https://github.com/uzman2406/PM-Internship-Recommender.git
cd PM-Internship-Recommender
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Open the app in your browser at http://localhost:3000.

Folder Structure
bash
Copy code
/public
  /icons       # Optional SVG skill icons
/src
  /components  # React components (Card, Field, Chip)
  App.js       # Main React app
  styles.css   # Custom creative CSS