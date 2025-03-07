# MediConnect

## About

MediConnect is a modern healthcare platform designed to connect patients with healthcare providers efficiently and securely. The platform facilitates seamless communication, appointment scheduling, and medical record management.

## Getting Started

**Local Development**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/Anup697028/MediConnect.git

# Step 2: Navigate to the project directory.
cd MediConnect

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy this project using any hosting platform that supports Node.js applications, such as:

- Vercel
- Netlify
- DigitalOcean
- Heroku

Follow the platform-specific deployment instructions for a React application.

## Firebase Integration

MediConnect uses Firebase as its database and backend solution. To set up Firebase for this project, follow these steps:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on "Add project" and follow the prompts to create a new Firebase project.
3. Once your project is created, navigate to the "Project settings".
4. Under the "General" tab, you will find your Firebase configuration settings. Copy these settings as you will need them in your application.
5. Install Firebase in your project:
   ```sh
   npm install firebase
   ```
6. Initialize Firebase in your application by adding the following code to your main application file:

   ```javascript
   import { initializeApp } from "firebase/app";

   const firebaseConfig = {
     // Your Firebase configuration settings here
   };

   const app = initializeApp(firebaseConfig);
   ```

This integration allows you to utilize Firebase's real-time database, authentication, and other backend services effectively.

## Repository Links

- [MediConnect GitHub Repository](https://github.com/Anup697028/MediConnect.git)
