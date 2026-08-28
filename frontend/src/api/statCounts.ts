const STORAGE_KEY_SISWA = "total_siswa";
const STORAGE_KEY_GURU = "total_guru";
const STORAGE_KEY_IMAGE_SISWA = "custom_image_siswa";
const STORAGE_KEY_IMAGE_GURU = "custom_image_guru";

const DEFAULT_SISWA = "1279";
const DEFAULT_GURU = "88";

export const getTotalSiswa = (): number => {
  const stored = localStorage.getItem(STORAGE_KEY_SISWA);
  if (!stored) return parseInt(DEFAULT_SISWA, 10);
  const num = parseInt(stored, 10);
  return isNaN(num) ? parseInt(DEFAULT_SISWA, 10) : num;
};

export const setTotalSiswa = (val: number): void => {
  const validVal = Math.max(0, val);
  localStorage.setItem(STORAGE_KEY_SISWA, validVal.toString());
  window.dispatchEvent(new Event("stat_counts_updated"));
};

export const getTotalGuru = (): number => {
  const stored = localStorage.getItem(STORAGE_KEY_GURU);
  if (!stored) return parseInt(DEFAULT_GURU, 10);
  const num = parseInt(stored, 10);
  return isNaN(num) ? parseInt(DEFAULT_GURU, 10) : num;
};

export const setTotalGuru = (val: number): void => {
  const validVal = Math.max(0, val);
  localStorage.setItem(STORAGE_KEY_GURU, validVal.toString());
  window.dispatchEvent(new Event("stat_counts_updated"));
};

export const getImageSiswa = (): string | null => {
  return localStorage.getItem(STORAGE_KEY_IMAGE_SISWA);
};

export const setImageSiswa = (url: string | null): void => {
  if (url) {
    localStorage.setItem(STORAGE_KEY_IMAGE_SISWA, url);
  } else {
    localStorage.removeItem(STORAGE_KEY_IMAGE_SISWA);
  }
  window.dispatchEvent(new Event("stat_counts_updated"));
};

export const getImageGuru = (): string | null => {
  return localStorage.getItem(STORAGE_KEY_IMAGE_GURU);
};

export const setImageGuru = (url: string | null): void => {
  if (url) {
    localStorage.setItem(STORAGE_KEY_IMAGE_GURU, url);
  } else {
    localStorage.removeItem(STORAGE_KEY_IMAGE_GURU);
  }
  window.dispatchEvent(new Event("stat_counts_updated"));
};
