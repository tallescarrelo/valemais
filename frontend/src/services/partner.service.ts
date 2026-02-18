import { api } from './api';

export const partnerService = {
  async getProfile() {
    return api.get<any>('/partner/profile');
  },

  async updateProfile(data: any) {
    return api.put<any>('/partner/profile', data);
  },

  async getQrCode() {
    return api.get<any>('/partner/qrcode');
  },

  async getValidations(page = 1, limit = 10) {
    return api.get<any>(`/partner/validations?page=${page}&limit=${limit}`);
  },

  async getStats() {
    return api.get<any>('/partner/stats');
  },
};
