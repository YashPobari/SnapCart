import { Client, Account, ID } from "appwrite";


const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL) 
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); 

const account = new Account(client);

// Sign Up
export const signUp = async ({ email, password, name }) => {
  try {
    return await account.create(ID.unique(), email, password, name);
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

// Login 
export const login = async ({ email, password }) => {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Current Logged-In User
export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    console.error("No user session found:", error);
    return null;
  }
};

// Logout 
export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
