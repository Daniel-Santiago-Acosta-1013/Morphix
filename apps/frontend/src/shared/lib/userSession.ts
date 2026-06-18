const USER_ID_STORAGE_KEY = 'morphix.userId';

export function getStoredUserId(): string {
  const existing = window.localStorage.getItem(USER_ID_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const generated = `user_${crypto.randomUUID()}`;
  window.localStorage.setItem(USER_ID_STORAGE_KEY, generated);
  return generated;
}

