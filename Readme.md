cat << 'EOF' > README.md
# 🧾 MERN Stack Dynamic Form with PDF & API Integration

This project is a full-featured MERN stack (MongoDB, Express, React, Node.js) application that includes a user data collection form with 14 fields, cascading dropdowns, CRUD functionality, PDF generation, API integration for age prediction, and e-signature support.

## 🚀 Features

- ✅ **14+ Form Fields** with validation
- 🔗 **Three Cascading Dropdowns** (Country → State → City)
- 🔍 **Real-time Age Prediction** via [Agify API](https://api.agify.io)
- 🖊️ **E-signature capture** using Canvas
- 📄 **PDF Generation** with all form data and signature
- 🗃️ **CRUD Operations** on user entries
- 🔁 **REST API** backend using Express.js
- 🌐 **Fully responsive UI** built with React

## 📋 Form Fields

1. Full Name *(Required, 2–50 chars)*
2. Email *(Required, valid format)*
3. Phone Number *(Required, 10-digit)*
4. Date of Birth *(Required, must be 18+ years)*
5. Gender *(Required: Male, Female, Other)*
6. Age *(Predicted from name using Agify API)*
7. Address Line 1 *(Required, max 100 chars)*
8. Address Line 2 *(Optional, max 100 chars)*
9. Country *(Required, triggers State dropdown)*
10. State/Province *(Required, triggers City dropdown)*
11. City *(Required)*
12. Zip Code *(Required, 5–6 alphanumeric chars)*
13. Occupation *(Required: Student, Engineer, Doctor, Other)*
14. Annual Income *(Optional, positive number)*
15. Signature *(Required, drawn on canvas)*

### 🧠 Cascading Dropdown Logic

- Selecting a **Country** filters **States**
- Selecting a **State** filters **Cities**

#### Example:
India → Maharashtra → Mumbai


## 🧰 Technologies Used

- **Frontend**: React.js, Axios, HTML5 Canvas
- **Backend**: Node.js, Express.js, MongoDB
- **PDF Generation**: `pdf-lib` / `jspdf` (choose your implementation)
- **API Integration**: [Agify.io](https://api.agify.io)
- **Signature**: Canvas-based image capture

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/ashish842a/mern_stack.git
cd mern_stack

2. Install server dependencies
cd backend
npm install

3. Install frontend dependencies
cd ../frontend
npm install

4. Run both servers
Open two terminal windows or tabs:

Backend:
cd backend
npm start

Frontend:
cd frontend
npm start

🔁 API Endpoints
Method	Endpoint	Description
POST	/api/users	Submit form data
GET	/api/users	Fetch all users
PUT	/api/users/:id	Update user data
DELETE	/api/users/:id	Delete user entry

🖨️ PDF Output
Includes all 14 fields + e-signature

Signature is embedded as an image

Exported PDF is downloadable after submission

🔗 External API Integration
Agify API: Estimates user's age based on the first name

https://api.agify.io/?name={name}

❗Validation
Error messages are displayed below each field if validation fails, such as:

"Email is invalid"

"City is required"

"Signature is required"

🤝 Contribution
Contributions are welcome! Feel free to fork the repo and submit a PR.

Fork the repository

Create your feature branch (git checkout -b feature/awesome-feature)

Commit your changes (git commit -m 'Add awesome feature')

Push to the branch (git push origin feature/awesome-feature)

Open a Pull Request

📄 License
This project is open-source and available under the MIT License.

🛠️ Built with passion using the MERN stack.

### ✅ How to Use:

1. Copy the entire Bash script above.
2. Paste it into your terminal inside the root directory of your project.
3. Run it: it will generate a full `README.md` file with all relevant project details.

Let me know if you want a Markdown version instead of a Bash script!




