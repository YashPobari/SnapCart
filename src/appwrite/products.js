import { Databases } from "appwrite";
import { client } from "./config";

const databases = new Databases(client);

export const getProducts = async () => {
  try {
    const res = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      "67f5235600204dc6ce0e" // Replace with your actual collection ID
    );
    return res.documents;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
