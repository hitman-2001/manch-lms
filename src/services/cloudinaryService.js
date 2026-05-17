// ============================================================
// Cloudinary Service — Direct Browser Upload (No Backend)
// ============================================================
// SETUP STEPS:
// 1. Go to https://cloudinary.com → Create free account
// 2. Dashboard → copy your "Cloud name"
// 3. Settings → Upload → Add upload preset:
//    - Signing mode: Unsigned
//    - Folder: manch-lms (optional)
//    - Copy the preset name
// 4. Replace CLOUD_NAME and UPLOAD_PRESET below
// ============================================================

// 🔥 Using environment variables from .env
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// ─── Validation ────────────────────────────────────────────

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const ALLOWED_MATERIAL_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

/**
 * Validate a file before upload (type + size check).
 * @param {File} file
 * @param {'image'|'material'} type
 * @returns {{ valid: boolean, error: string|null }}
 */
export const validateFile = (file, type = "image") => {
  const maxSizes = { image: 40, material: 40 }; // MB (40MB limit)
  const allowedTypes =
    type === "image" ? ALLOWED_IMAGE_TYPES : ALLOWED_MATERIAL_TYPES;
  const maxMB = maxSizes[type];

  if (!file) return { valid: false, error: "No file selected." };

  if (!allowedTypes.includes(file.type)) {
    const readable =
      type === "image" ? "JPG, PNG, WebP, or GIF" : "PDF, JPG, PNG, or WebP";
    return { valid: false, error: `Invalid file type. Allowed: ${readable}` };
  }

  const sizeMB = file.size / (1024 * 1024);
  const isPdf = file.type === "application/pdf";
  const limitMB = isPdf ? 15 : maxMB;
  if (sizeMB > limitMB) {
    return {
      valid: false,
      error: `File too large. Max ${limitMB}MB${isPdf ? " for PDF files" : ""}. (Current: ${sizeMB.toFixed(1)}MB)`,
    };
  }

  return { valid: true, error: null };
};

/**
 * Client-side image compression using Canvas.
 * Resizes to max 1920px width/height and reduces quality.
 */
const compressImage = async (file) => {
  if (!file.type.startsWith("image/")) return file;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          "image/jpeg",
          0.8,
        );
      };
    };
  });
};

/**
 * Upload a file directly to Cloudinary from the browser.
 * Uses XHR for real progress tracking.
 */
export const uploadToCloudinary = async (file, onProgress = null) => {
  // Compress images before upload to save bandwidth and stay under limits
  const fileToUpload = file.type.startsWith("image/")
    ? await compressImage(file)
    : file;

  return new Promise((resolve, reject) => {
    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("upload_preset", UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();

    // Progress tracking
    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data.secure_url);
        } catch {
          reject(new Error("Invalid response from Cloudinary."));
        }
      } else {
        try {
          const err = JSON.parse(xhr.responseText);
          reject(
            new Error(
              err?.error?.message ||
                "Upload failed. Check your cloud name and upload preset.",
            ),
          );
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    });

    xhr.addEventListener("error", () => {
      reject(
        new Error(
          "Network error during upload. Check your internet connection.",
        ),
      );
    });

    xhr.addEventListener("abort", () => {
      reject(new Error("Upload was cancelled."));
    });

    xhr.open("POST", uploadUrl);
    xhr.send(formData);
  });
};
