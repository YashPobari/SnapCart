// src/appwrite/products.js

import { Databases } from "appwrite";
import { client } from "./config";

// Initialize database instance
const databases = new Databases(client);

// Fetch products from Appwrite database
export const getProducts = async () => {
  try {
    const res = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_PRODUCTS // Use env var for flexibility
    );
    return res.documents;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
