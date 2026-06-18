export function normalizeExtension(name: string): string {
  const last = name.split('.').pop();
  return last?.toLowerCase() === 'jpeg' ? 'jpg' : last?.toLowerCase() || '';
}

