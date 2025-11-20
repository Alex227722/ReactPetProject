const BASE = import.meta.env.BASE_URL ?? '/';

export const assetPath = (relativePath: string) => {
  const normalizedBase = BASE.endsWith('/') ? BASE : `${BASE}/`;
  return `${normalizedBase}${relativePath.replace(/^\/+/, '')}`;
};
