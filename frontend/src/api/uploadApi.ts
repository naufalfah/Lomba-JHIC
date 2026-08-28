import axiosInstance from "./axios";

/**
 * Resizes and compresses an image File into a compact Base64 Data URL string.
 * Used as a fallback when backend upload fails or is offline.
 */
const fileToCompressedDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) {
        return reject(new Error("Gagal membaca file gambar"));
      }

      if (file.type === "image/svg+xml" || file.type === "image/gif") {
        return resolve(result);
      }

      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
          resolve(compressedDataUrl);
        } else {
          resolve(result);
        }
      };
      img.onerror = () => resolve(result);
      img.src = result;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosInstance.post<{ url: string }>("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data && response.data.url) {
      return response.data.url;
    }
  } catch (error) {
    console.warn("Backend upload failed or server offline. Using local base64 fallback:", error);
  }

  // Fallback: Return compressed base64 Data URL so upload never breaks
  return await fileToCompressedDataUrl(file);
};

/**
 * Normalizes an image URL/path so it always works in both dev (Vite proxy) and production.
 * - base64 data URLs are returned as-is.
 * - Absolute URLs pointing to localhost backend (e.g. http://localhost:8080/uploads/foo.jpg)
 *   are converted to a relative path (/uploads/foo.jpg) so the Vite proxy can forward them.
 * - Relative paths (/uploads/foo.jpg) are returned as-is.
 */
export const getImageUrl = (path: string | undefined | null): string => {
  if (!path) return "";
  // Already a data URL (base64)
  if (path.startsWith("data:")) return path;
  // Absolute URL pointing to backend localhost — strip the origin part
  // so it becomes a relative path that the Vite proxy can forward.
  try {
    const parsed = new URL(path);
    if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
      return parsed.pathname;
    }
  } catch {
    // Not an absolute URL — fall through
  }
  return path;
};
