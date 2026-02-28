export type Role = 'CLIENT' | 'PARTNER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email?: string;
  cpf?: string;
  role: Role;
  cardCode?: string;
  partnerId?: string;
  partnerName?: string;
  status?: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  data: {
    user: User;
    tokens: Tokens;
  };
}

export interface RegisterPayload {
  name: string;
  cpf: string;
  phone: string;
  password: string;
  birthDate?: string;
  acceptTerms: true;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
}
