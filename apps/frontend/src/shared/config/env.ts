const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8000';
const maxFileSizeMb = Number(import.meta.env.VITE_MAX_FILE_SIZE_MB || '100');

export const env = {
  apiBaseUrl,
  maxFileSizeMb,
  maxFileSizeBytes: maxFileSizeMb * 1024 * 1024,
};

