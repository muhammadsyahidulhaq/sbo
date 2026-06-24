import api from './axios';

export const createInvite =
  async (
    organizationId: string,
    email: string,
  ) => {
    const res =
      await api.post(
        `/organizations/${organizationId}/invites`,
        { email },
      );

    return res.data;
  };

export const validateInvite = async (
  token: string,
) => {
  const response = await api.get(
    `/invites/${token}`,
  );

  return response.data;
};

export const joinOrganization = async (
  token: string,
) => {
  const response = await api.post(
    `/invites/${token}/join`,
  );

  return response.data;
};

export const acceptInvite = async (id: string) => {
  const res = await api.post(
    `/organizations/invites/${id}/accept`,
  );

  return res.data;
};