import { api } from './api';
import type { AuthResponse, LoginPayload, RegisterPayload } from '@/types/auth';

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    return api.post<AuthResponse>('/auth/login', payload);
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    return api.post<AuthResponse>('/auth/register', payload);
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  async forgotPassword(email: string) {
    return api.post<{ data: { message: string } }>('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, password: string) {
    return api.post<{ data: { message: string } }>('/auth/reset-password', { token, password });
  },

  async refreshTokens() {
    return api.refreshTokens();
  },
};
