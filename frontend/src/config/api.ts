/**
 * Configuracao de API - Deteccao automatica de ambiente
 * REGRA: Nunca usar URLs hardcoded. Sempre importar API_URL daqui.
 */

const getApiUrl = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  if (import.meta.env.PROD || window.location.hostname !== 'localhost') {
    return 'https://api.valemaisvantagens.com.br';
  }

  return 'http://localhost:3333';
};

export const API_URL = getApiUrl();
export const API_BASE = `${API_URL}/api/v1`;
