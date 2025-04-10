import { Client, Databases } from "appwrite";


const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);


export const appwriteDatabases = new Databases(client);
