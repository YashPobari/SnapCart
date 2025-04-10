import { Client, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const storage = new Storage(client);

export const getImagePreview = (fileId) => {
  return storage.getFilePreview(
    import.meta.env.VITE_APPWRITE_BUCKET_ID,
    fileId
  ).href;
};

export { storage };
