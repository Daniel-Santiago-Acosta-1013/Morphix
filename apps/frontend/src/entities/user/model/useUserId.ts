import { useMemo } from 'react';
import { getStoredUserId } from '../../../shared/lib/userSession';

export function useUserId(): string {
  return useMemo(() => getStoredUserId(), []);
}

