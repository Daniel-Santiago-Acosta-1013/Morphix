import { env } from '../config/env';
import { getStoredUserId } from '../lib/userSession';

export async function httpRequest<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${env.apiBaseUrl}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': getStoredUserId(),
        ...(init?.headers ?? {}),
      },
    });
  } catch {
    throw new Error('No se pudo conectar con el servicio. Inténtalo de nuevo en unos minutos.');
  }

  if (!response.ok) {
    let message = `La solicitud no se pudo completar. Código ${response.status}.`;
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
