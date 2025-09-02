import React, { useMemo, useState } from "react";
import "./App.css"; // Link your CSS file

const I18N = {
  en: {
    appTitle: "PM Internship Recommender",
    intro: "Answer a few quick questions. We’ll show 3–5 internships that fit you best.",
    education: "Education",
    skills: "Skills",
    sector: "Sector",
    location: "Location",
    mode: "Mode",
    any: "Any",
    remote: "Remote",
    onsite: "On-site",
    hybrid: "Hybrid",
    pickSkills: "Tap to select your skills",
    choose: "Choose",
    addSkill: "Add custom skill",
    placeholderSkill: "e.g., Python",
    find: "Find internships",
    clear: "Clear",
    results: "Top Matches",
    noResults: "No results yet. Add skills or change filters.",
    stipend: "Stipend",
    apply: "View details",
    language: "Language",
    sampleNotice: "Demo data only — replace with live portal data.",
    eduLevels: ["10th Pass","12th Pass","Diploma","UG (Any)","UG (CS/IT)","PG"],
  },
  hi: {
    appTitle: "पीएम इंटर्नशिप सिफारिश",
    intro: "कुछ आसान सवालों के जवाब दें। हम आपके लिए 3–5 उपयुक्त इंटर्नशिप दिखाएँगे।",
    education: "शिक्षा",
    skills: "कौशल",
    sector: "क्षेत्र",
    location: "स्थान",
    mode: "कार्य शैली",
    any: "कोई भी",
    remote: "रिमोट",
    onsite: "ऑन-साइट",
    hybrid: "हाइब्रिड",
    pickSkills: "कौशल चुनने के लिए टैप करें",
    choose: "चुनें",
    addSkill: "अपना कौशल जोड़ें",
    placeholderSkill: "जैसे, Python",
    find: "इंटर्नशिप खोजें",
    clear: "रीसेट",
    results: "सर्वोत्तम विकल्प",
    noResults: "अभी परिणाम नहीं। कौशल जोड़ें या फ़िल्टर बदलें।",
    stipend: "स्टाइपेंड",
    apply: "विवरण देखें",
    language: "भाषा",
    sampleNotice: "डेमो डेटा — कृपया पोर्टल के लाइव डेटा से बदलें।",
    eduLevels: ["10वीं पास","12वीं पास","डिप्लोमा","स्नातक (कोई भी)","स्नातक (CS/IT)","स्नातकोत्तर"],
  },
};

// Sample dataset
const INTERNSHIPS = [
  { id:1, title:"Data Entry Intern", sector:"Administration", org:"District Collectorate", location:{state:"UP", city:"Kanpur"}, skills:["MS Office","Typing","Excel"], mode:"On-site", stipend:"₹5,000" },
  { id:2, title:"Community Outreach Intern", sector:"Social Welfare", org:"MoRD", location:{state:"MP", city:"Bhopal"}, skills:["Hindi","Communication","Field Work"], mode:"Hybrid", stipend:"₹6,000" },
  { id:3, title:"IT Support Intern", sector:"IT & eGov", org:"NIC", location:{state:"DL", city:"New Delhi"}, skills:["Networking","Hardware","Helpdesk"], mode:"On-site", stipend:"₹8,000" },
  { id:4, title:"Frontend Intern", sector:"IT & eGov", org:"State IT Cell", location:{state:"MH", city:"Mumbai"}, skills:["HTML","CSS","JavaScript"], mode:"Hybrid", stipend:"₹10,000" },
  { id:5, title:"Agriculture Extension Intern", sector:"Agriculture", org:"Krishi Vibhag", location:{state:"BR", city:"Patna"}, skills:["Field Work","Hindi","Data Collection"], mode:"On-site", stipend:"₹7,000" },
  { id:6, title:"Content & Social Media Intern", sector:"Information & Culture", org:"PIB", location:{state:"DL", city:"New Delhi"}, skills:["English","Content Writing","Canva"], mode:"Remote", stipend:"₹6,500" },
  { id:7, title:"Accounts Intern", sector:"Finance", org:"CAG Office", location:{state:"WB", city:"Kolkata"}, skills:["Tally","Excel","Bookkeeping"], mode:"On-site", stipend:"₹9,000" },
  { id:8, title:"GIS Mapping Intern", sector:"Urban Development", org:"Smart City SPV", location:{state:"RJ", city:"Jaipur"}, skills:["GIS","QGIS","Survey"], mode:"Hybrid", stipend:"₹9,500" },
  { id:9, title:"Backend Intern", sector:"IT & eGov", org:"NIC", location:{state:"KA", city:"Bengaluru"}, skills:["Python","FastAPI","SQL"], mode:"Remote", stipend:"₹12,000" },
  { id:10, title:"Healthcare Admin Intern", sector:"Health", org:"District Hospital", location:{state:"TN", city:"Chennai"}, skills:["MS Office","Communication","Records"], mode:"On-site", stipend:"₹6,500" },
];

const DEFAULT_SKILLS = ["MS Office","Excel","Typing","Communication","Hindi","English","Field Work","HTML","CSS","JavaScript","Python","SQL","FastAPI","Networking","Hardware","Helpdesk","Content Writing","Canva","Tally","Bookkeeping","GIS","QGIS","Survey","Data Collection"];

function scoreInternship(candidate, internship) {
  let score = 0;
  const skillOverlap = internship.skills.filter(s => candidate.skills.includes(s)).length;
  score += skillOverlap * 3;
  if(candidate.sector && internship.sector === candidate.sector) score += 4;
  if(candidate.mode && candidate.mode !== "Any") {
    if(internship.mode.toLowerCase() === candidate.mode.toLowerCase()) score +=2;
  }
  if(candidate.state) {
    if(internship.location.state === candidate.state) score += 3;
  } else {
    if(internship.mode === "Remote") score +=2;
  }
  if(candidate.education) {
    const edu = candidate.education.toLowerCase();
    if(edu.includes("cs") || edu.includes("it")) if(internship.sector.startsWith("IT")) score +=2;
    if(edu.includes("10") || edu.includes("12")) {
      if(["Administration","Social Welfare","Health"].includes(internship.sector)) score +=1;
    }
  }
  return score;
}

function Chip({ active, label, onClick }) {
  return (
    <button className={`chip ${active ? "active" : ""}`} onClick={onClick}>{label}</button>
  );
}

function Field({ label, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
    </div>
  );
}

function ResultCard({ i18n, item }) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3>{item.title}</h3>
          <p>{item.org} • {item.sector}</p>
        </div>
        <span className="mode-badge">{item.mode}</span>
      </div>
      <div className="card-details">
        <div>📍 {item.location.city}, {item.location.state}</div>
        <div>💰 {i18n.stipend}: {item.stipend}</div>
      </div>
      <div className="card-skills">
        {item.skills.slice(0,5).map(s => <span key={s} className="skill-badge">{s}</span>)}
      </div>
      <button className="primary-btn">{i18n.apply} →</button>
    </div>
  );
}

export default function PMInternshipRecommender() {
  const [lang, setLang] = useState("en");
  const i18n = I18N[lang];

  const [education, setEducation] = useState("");
  const [sector, setSector] = useState("");
  const [state, setState] = useState("");
  const [mode, setMode] = useState("Any");
  const [skills, setSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const [results, setResults] = useState([]);

  const SECTORS = useMemo(() => Array.from(new Set(INTERNSHIPS.map(x=>x.sector))), []);
  const STATES = useMemo(() => Array.from(new Set(INTERNSHIPS.map(x=>x.location.state))).sort(), []);

  function toggleSkill(s) { setSkills(prev => prev.includes(s) ? prev.filter(x=>x!==s) : [...prev,s]); }
  function addCustomSkill() { const s = customSkill.trim(); if(!s) return; if(!skills.includes(s)) setSkills(prev => [...prev,s]); setCustomSkill(""); }
  function clearAll() { setEducation(""); setSector(""); setState(""); setMode("Any"); setSkills([]); setResults([]); }
  function runMatch() {
    const candidate = { education, sector, state, mode, skills };
    const ranked = INTERNSHIPS.map(item=>({item,score:scoreInternship(candidate,item)}))
      .sort((a,b)=>b.score-a.score)
      .filter(x=>x.score>0)
      .slice(0,5)
      .map(x=>x.item);
    setResults(ranked);
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <div>
          <h1>{i18n.appTitle}</h1>
          <p>{i18n.intro}</p>
        </div>
        <div>
          <label htmlFor="lang-select">{i18n.language}</label>
          <select id="lang-select" value={lang} onChange={e=>setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
      </div>

      <div className="form-container">
        <Field label={i18n.education}>
          <select value={education} onChange={e=>setEducation(e.target.value)}>
            <option value="">{i18n.choose}</option>
            {i18n.eduLevels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
          </select>
        </Field>

        <Field label={i18n.sector}>
          <select value={sector} onChange={e=>setSector(e.target.value)}>
            <option value="">{i18n.any}</option>
            {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>

        <Field label={i18n.location}>
          <select value={state} onChange={e=>setState(e.target.value)}>
            <option value="">{i18n.any}</option>
            {STATES.map(st => <option key={st} value={st}>{st}</option>)}
          </select>
        </Field>

        <Field label={i18n.mode}>
          <select value={mode} onChange={e=>setMode(e.target.value)}>
            <option>{i18n.any}</option>
            <option>{i18n.remote}</option>
            <option>{i18n.onsite}</option>
            <option>{i18n.hybrid}</option>
          </select>
        </Field>

        <Field label={`${i18n.skills} · ${i18n.pickSkills}`}>
          <div className="chips-container">
            {DEFAULT_SKILLS.map(s => <Chip key={s} label={s} active={skills.includes(s)} onClick={()=>toggleSkill(s)} />)}
          </div>
          <div className="custom-skill">
            <input type="text" value={customSkill} onChange={e=>setCustomSkill(e.target.value)} placeholder={i18n.placeholderSkill}/>
            <button onClick={addCustomSkill}>{i18n.addSkill}</button>
          </div>
        </Field>

        <div className="actions">
          <button className="primary-btn" onClick={runMatch}>{i18n.find}</button>
          <button className="secondary-btn" onClick={clearAll}>{i18n.clear}</button>
        </div>

        <p className="notice">{i18n.sampleNotice}</p>
      </div>

      <div className="results-container">
        <h2>{i18n.results}</h2>
        {results.length===0 ? (
          <div className="no-results">{i18n.noResults}</div>
        ) : (
          results.map(item => <ResultCard key={item.id} i18n={i18n} item={item} />)
        )}
      </div>

      <footer>© {new Date().getFullYear()} PM Internship Prototype • Built for low bandwidth, mobile-first use.</footer>
    </div>
  );
}
