import { api } from './api';

export const clientService = {
  async getProfile() {
    return api.get<any>('/client/profile');
  },

  async updateProfile(data: { name: string; phone: string }) {
    return api.put<any>('/client/profile', data);
  },

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    return api.put<any>('/client/change-password', data);
  },

  async getCard() {
    return api.get<any>('/client/card');
  },

  async getSubscription() {
    return api.get<any>('/client/subscription');
  },

  async cancelSubscription() {
    return api.post<any>('/client/subscription/cancel');
  },

  async getPayments(page = 1, limit = 10) {
    return api.get<any>(`/client/payments?page=${page}&limit=${limit}`);
  },

  async getValidations(page = 1, limit = 10) {
    return api.get<any>(`/client/validations?page=${page}&limit=${limit}`);
  },
};
