# Portfolio Website - Flask

This project is a personal portfolio website that demonstrates my projects, skills, and goals, providing a platform to introduce myself to potential employers or collaborators. The website has basic functionalities including a login page, home page, contact page, and projects page. The application uses Flask for the backend and includes HTML templates, CSS and Javascript for styling.

## Table of Contents

* Overview
* Pages
* Features
* Installation
* Usage
* Folder Structure
* Dependencies
* Contributing
* Contact

## Overview

This portfolio website is designed to display information about your professional experience, projects, and goals in a visually appealing manner. The website includes an about page, projects page, contact form, and user authentication system (registration, login, and logout).

## Pages

### Home Page (/)

Welcome page with an introduction to the software developer.

### About Page (/about)

Information about the software developer, including skills and background.

### Contact Page (/contact)

Contact form for users to get in touch.

### Projects Page (/projects)

List of projects with descriptions and technologies used.

### Login Page (/login)

Simple login form with username and password fields.

## Skills Page (/skills)

 visualisation on “Skills” page using Javascript

## Register Page (/register)

User authentication with fields to gather user’s details.

## Features

* User Authentication: Users can register, log in, and log out

* Responsive Design: The website is responsive and works well on various devices

* Dynamic Content: Pages such as "Projects" and "About" are dynamically generated using Flask

* Interactive Elements: Includes a flip effect for sections on the About page

* Random Background Colors: The home page features random background color changes at random intervals

* Error Handling: Custom error pages for 404 and 500 errors

## Installation

* Python 3.x
* Virtualenv

## Clone the Repository

git clone <https://github.com/your-username/your-repository-name.git>
cd your-repository-name - e.g cd render which is a folder in local env

## Create a Virtual Environment

python3 -m venv venv
Source venv/bin/activate  # On Windows use `venv\Scripts\activate`

## Install Dependencies

pip install -r requirements.txt

## Set Up Environment Variables

* Create a .env file in the root directory of the project and add your secret key: SECRET_KEY=yumyumsugar_1

SECRET_KEY=your_secret_key_here

Run the Application easily using flask run

flask run

Visit <http://127.0.0.1:5000/> in your web browser to view the site.

## Usage

* Home Page: Displays a welcome message and links to various sections of the website

* About Page: Contains flip cards that reveal information about you when clicked

* Projects Page: Lists the projects you’ve worked on, including descriptions and links to more details

* Contact Page: Provides a form where visitors can send you a message

* User Authentication: Users can register, log in, and log out using the authentication system

## Folder Structure

Githerd.render.io/
│
├── app.py
│
├── main.py
├── requirements.txt
├── .env
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── contact.js
│   │   ├── flip.js
│   │   ├── login.js
│   │   ├── projects.js
│   │   ├── randomcolor.js
│   │   ├── register.js
│   │   ├── submit.js
│   │   └── skills.js
│   └── images/
│       └── logo.png
└── templates/
   ├── base.html
   ├── home.html
   ├── about.html
   ├── projects.html
   ├── contact.html
   ├── login.html
   ├── register.html
   ├── 404.html
   └── 500.html

## Dependencies

* blinker==1.8.2
* click==8.1.7
* Flask==3.0.3
* Flask-Login==0.6.3
* gunicorn==23.0.0
* itsdangerous==2.2.0
* Jinja2==3.1.4
* MarkupSafe==2.1.5
* packaging==24.1
* python-dotenv==1.0.1
* Werkzeug==3.0.3

## Contributing

This is an assignment so no contributing allowed.

## Contact

If you have any questions or suggestions, feel free to reach out:

* Name:Kareemat
* Email: <kmat.adebisi@gmail.com>
* GitHub:Githerd
