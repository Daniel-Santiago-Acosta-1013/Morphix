interface RuntimeConfigPayload {
  apiBaseUrl?: string;
  api_base_url?: string;
  maxFileSizeMb?: number | string;
  max_file_size_mb?: number | string;
}

interface RuntimeConfig {
  apiBaseUrl: string;
  maxFileSizeMb: number;
}

const DEFAULT_CONFIG: RuntimeConfig = {
  apiBaseUrl: 'http://localhost:8000',
  maxFileSizeMb: 100,
};

let runtimeConfig = DEFAULT_CONFIG;

function normalizeRuntimeConfig(payload: RuntimeConfigPayload): RuntimeConfig {
  const apiBaseUrl = payload.apiBaseUrl || payload.api_base_url || DEFAULT_CONFIG.apiBaseUrl;
  const maxFileSizeMb = Number(payload.maxFileSizeMb ?? payload.max_file_size_mb ?? DEFAULT_CONFIG.maxFileSizeMb);

  return {
    apiBaseUrl: apiBaseUrl.replace(/\/$/, ''),
    maxFileSizeMb: Number.isFinite(maxFileSizeMb) && maxFileSizeMb > 0 ? maxFileSizeMb : DEFAULT_CONFIG.maxFileSizeMb,
  };
}

export async function loadRuntimeConfig(): Promise<void> {
  try {
    const response = await fetch('/runtime-config.json', { cache: 'no-store' });
    if (!response.ok) return;
    const payload = (await response.json()) as RuntimeConfigPayload;
    runtimeConfig = normalizeRuntimeConfig(payload);
  } catch {
    runtimeConfig = DEFAULT_CONFIG;
  }
}

export const env = {
  get apiBaseUrl() {
    return runtimeConfig.apiBaseUrl;
  },
  get maxFileSizeMb() {
    return runtimeConfig.maxFileSizeMb;
  },
  get maxFileSizeBytes() {
    return runtimeConfig.maxFileSizeMb * 1024 * 1024;
  },
};
