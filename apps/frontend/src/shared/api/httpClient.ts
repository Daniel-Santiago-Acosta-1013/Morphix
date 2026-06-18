import { env } from '../config/env';
import { getStoredUserId } from '../lib/userSession';

export async function httpRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': getStoredUserId(),
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const payload = await response.json();
      message = payload.detail || payload.message || message;
    } catch {
      // Keep the generic HTTP message for non-JSON errors.
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

