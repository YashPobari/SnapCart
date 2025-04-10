// src/appwrite/auth.js
import { Client, Account, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL) // e.g. https://cloud.appwrite.io/v1
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // your project ID

const account = new Account(client);

export const signUp = async ({ email, password, name }) => {
  try {
    const user = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });
    return session;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    console.error("User not logged in", error);
    return null;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Logout failed", error);
  }
};
