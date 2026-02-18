import { api } from './api';

export const adminService = {
  async getDashboard() {
    return api.get<any>('/admin/dashboard');
  },

  // Plans
  async listPlans() {
    return api.get<any>('/admin/plans');
  },

  async getPlan(id: string) {
    return api.get<any>(`/admin/plans/${id}`);
  },

  async createPlan(data: any) {
    return api.post<any>('/admin/plans', data);
  },

  async updatePlan(id: string, data: any) {
    return api.put<any>(`/admin/plans/${id}`, data);
  },

  async togglePlan(id: string) {
    return api.patch<any>(`/admin/plans/${id}/toggle`);
  },

  // Clients
  async listClients(page = 1, limit = 10) {
    return api.get<any>(`/admin/clients?page=${page}&limit=${limit}`);
  },

  async getClient(id: string) {
    return api.get<any>(`/admin/clients/${id}`);
  },

  async updateClientStatus(id: string, status: string) {
    return api.patch<any>(`/admin/clients/${id}/status`, { status });
  },

  // Partners
  async listPartners(page = 1, limit = 10) {
    return api.get<any>(`/admin/partners?page=${page}&limit=${limit}`);
  },

  async getPartner(id: string) {
    return api.get<any>(`/admin/partners/${id}`);
  },

  async approvePartner(id: string) {
    return api.patch<any>(`/admin/partners/${id}/approve`);
  },

  async rejectPartner(id: string) {
    return api.patch<any>(`/admin/partners/${id}/reject`);
  },

  async updatePartnerStatus(id: string, status: string) {
    return api.patch<any>(`/admin/partners/${id}/status`, { status });
  },

  // Validations
  async listValidations(page = 1, limit = 10) {
    return api.get<any>(`/admin/validations?page=${page}&limit=${limit}`);
  },

  // Payments
  async listPayments(page = 1, limit = 10) {
    return api.get<any>(`/admin/payments?page=${page}&limit=${limit}`);
  },
};
