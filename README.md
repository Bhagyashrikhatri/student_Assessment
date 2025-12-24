# Student Speaking Assessment Report

A simple web application to display student speaking assessment scores with visual charts and descriptive feedback.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Running

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd student-assessment-report
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start
```

4. **Open in browser**
Navigate to: `http://localhost:3000`

## 📁 Project Structure

```
student-assessment-report/
├── server.js           # Express backend server
├── data.json          # Student assessment data storage
├── package.json       # Project dependencies
├── public/
│   ├── index.html     # Main report page
│   ├── style.css      # Styling
│   └── script.js      # Frontend logic
└── README.md
```

## 💾 Where Scores Are Stored

Scores are stored in **`data.json`** file with the following structure:

```json
{
  "studentId": "STU001",
  "studentName": "John Doe",
  "testDate": "2024-12-20",
  "overallScore": 7.5,
  "skills": {
    "pronunciation": 8.0,
    "fluency": 7.5,
    "vocabulary": 7.0,
    "grammar": 7.5
  }
}
```

You can modify the scores directly in `data.json` and refresh the page to see updated results.

## 🧠 How Feedback Logic Works

The feedback system uses **conditional score ranges** to generate descriptive messages:

### Overall Feedback
- **Score ≥ 8.0**: "Excellent performance! You demonstrate exceptional speaking abilities with strong control across all areas."
- **Score 7.0 - 7.9**: "Very good performance! You show strong speaking skills with minor areas for improvement."
- **Score 6.0 - 6.9**: "Good performance with noticeable competence, though some inaccuracies are present."
- **Score 5.0 - 5.9**: "Moderate performance. You can communicate but need significant improvement."
- **Score < 5.0**: "Needs improvement. Focus on building fundamental speaking skills."

### Skill-Specific Feedback
Each skill (Pronunciation, Fluency, Vocabulary, Grammar) has tailored feedback:

**Example for Pronunciation:**
- **≥ 8.0**: "Excellent pronunciation with clear and accurate articulation."
- **7.0 - 7.9**: "Very good pronunciation with occasional minor errors."
- **6.0 - 6.9**: "Good pronunciation but some sounds need improvement."
- **5.0 - 5.9**: "Pronunciation needs work; some words are unclear."
- **< 5.0**: "Significant pronunciation challenges affecting clarity."

The same pattern applies to Fluency, Vocabulary, and Grammar with appropriate descriptions.

## 🎨 Features

### ✅ Implemented Features
- Overall score display (out of 9)
- Skill-wise scores (Pronunciation, Fluency, Vocabulary, Grammar)
- Visual charts using Chart.js:
  - Radar chart for skill comparison
  - Bar chart for individual skills
- Dynamic feedback based on score ranges
- Responsive design
- Clean, professional UI

### 📊 Visual Components
- **Radar Chart**: Shows all skills in a comparative view
- **Bar Chart**: Displays individual skill scores
- **Progress Bars**: CSS-based visual indicators
- **Score Cards**: Color-coded based on performance level

## 🔧 API Endpoints

### GET `/api/student-report`
Returns the student assessment data.

**Response:**
```json
{
  "studentId": "STU001",
  "studentName": "John Doe",
  "testDate": "2024-12-20",
  "overallScore": 7.5,
  "skills": {
    "pronunciation": 8.0,
    "fluency": 7.5,
    "vocabulary": 7.0,
    "grammar": 7.5
  }
}
```

## 🎯 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js with Express.js
- **Charts**: Chart.js (v4.4.0)
- **Data Storage**: JSON file

## 🧪 Testing the Application

1. **Default View**: Load the page to see sample student data
2. **Modify Scores**: Edit `data.json` with different scores (0-9 range)
3. **Refresh**: Reload the page to see updated scores and feedback
4. **Test Ranges**: Try different score ranges to verify feedback logic

## 📝 Notes

- This is a **functional prototype**, not production-ready
- No authentication or database required
- Supports scores from 0 to 9
- Feedback updates automatically based on score changes
- Mobile-responsive design

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change port in server.js or kill existing process
lsof -ti:3000 | xargs kill
```

**Dependencies not installing:**
```bash
npm cache clean --force
npm install
```

## 📧 Support

For questions or issues, please contact the development team.

---

**Assignment Submission**: Full Stack Development – Student Assessment Report Page
