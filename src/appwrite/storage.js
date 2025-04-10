import { storage } from "./config";

export const getImagePreview = (fileId) => {
  return storage.getFilePreview(
    import.meta.env.VITE_APPWRITE_BUCKET_ID,
    fileId
  ).href;
};
