import api from './axios';

export const getMyOrganizations =
  async () => {
    const response =
      await api.get(
        '/organizations/my',
      );

    return response.data;
  };

export const createOrganization =
  async (data: {
    name: string;
    description?: string;
  }) => {
    const response =
      await api.post(
        '/organizations',
        data,
      );

    return response.data;
  };

export const getOrganizationDetail =
  async (id: string) => {
    const response =
      await api.get(
        `/organizations/${id}`,
      );

    return response.data;
  };

export const getOrganizationMembers =
  async (id: string) => {
    const response =
      await api.get(
        `/organizations/${id}/members`,
      );

    return response.data;
  };