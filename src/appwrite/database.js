// src/appwrite/database.js

import { Client, Databases } from "appwrite";

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// Initialize and export the Databases instance
export const appwriteDatabases = new Databases(client);
