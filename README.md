# GetYourActivity (PFF)

GetYourActivity is an activities management system developed as a final training project (Projet Fin Formation) by Abdel ghani El kamraoui. The platform allows users to discover, create, and manage a variety of activities, connecting participants and organizers in a secure and user-friendly environment.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Main Entities](#main-entities)
- [User Roles](#user-roles)
- [Setup & Installation](#setup--installation)
  - [Backend (Laravel)](#backend-laravel)
  - [Frontend (React)](#frontend-react)
- [Usage](#usage)
- [Author](#author)
- [License](#license)

---

## Project Overview
GetYourActivity is a web application for managing and discovering activities. It provides a platform for participants to find and join activities, and for organizers to create and manage their own events. The system includes an admin interface for managing users and organizers.

## Features
- User registration and authentication (participant, organizer, admin)
- Browse, search, and filter activities
- Organizers can create, edit, and delete activities
- Participants can join (register for) activities
- Admin dashboard for managing users and organizers
- Profile management for both participants and organizers
- Notifications for important actions (e.g., registration, role changes)
- Secure and responsive design

## Architecture
- **Backend:** Laravel 10 (PHP 8.1+), RESTful API, MySQL
- **Frontend:** React 18, React Router, Axios, Bootstrap 5

## Main Entities
- **Participant:** Registers, browses, and joins activities
- **Organisateur (Organizer):** Creates and manages activities
- **Activite (Activity):** Event with details (title, description, date, location, etc.)
- **Admin:** Manages users and organizers

## User Roles
- **Participant:** Default role after registration. Can join activities and request to become an organizer.
- **Organisateur:** Can create and manage activities. Participants can request this role.
- **Admin:** Has full control over users and organizers. (Default admin: `akam9353@gmail.com`)

## Setup & Installation

### Backend (Laravel)
1. **Install dependencies:**
   ```bash
   cd backend
   composer install
   npm install
   ```
2. **Environment setup:**
   - Copy `.env.example` to `.env` and configure your database and mail settings.
   - Generate application key:
     ```bash
     php artisan key:generate
     ```
3. **Run migrations:**
   ```bash
   php artisan migrate
   ```
4. **(Optional) Seed database:**
   ```bash
   php artisan db:seed
   ```
5. **Start the backend server:**
   ```bash
   php artisan serve
   ```

### Frontend (React)
1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
2. **Start the frontend server:**
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000)

## Usage
- Access the frontend at [http://localhost:3000](http://localhost:3000)
- The backend API runs at [http://localhost:8000](http://localhost:8000) by default
- Register as a participant, then you can browse and join activities
- To become an organizer, submit a request from your profile
- Admin can log in with the default admin email and manage users/organizers
