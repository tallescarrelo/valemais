export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 20,
  MAX_PER_PAGE: 100,
} as const;

export const RESET_PASSWORD_EXPIRES_HOURS = 2;

export const PARTNER_CATEGORIES_LABELS: Record<string, string> = {
  FOOD: 'Alimentacao',
  HEALTH: 'Saude',
  BEAUTY: 'Beleza',
  SERVICES: 'Servicos',
  EDUCATION: 'Educacao',
  ENTERTAINMENT: 'Entretenimento',
  FASHION: 'Moda',
  AUTOMOTIVE: 'Automotivo',
  TECHNOLOGY: 'Tecnologia',
  OTHER: 'Outros',
};
