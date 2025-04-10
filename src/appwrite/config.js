// src/appwrite/config.js

import { Client, Account, Databases, Storage } from "appwrite";

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL) // Appwrite API endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Appwrite Project ID

// Export initialized services
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage };
