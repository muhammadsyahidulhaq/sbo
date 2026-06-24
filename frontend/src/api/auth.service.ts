import api from './axios';


export const getMe = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};
export const login = async (
  email: string,
  password: string,
) => {
  const response =
    await api.post('/auth/login', {
      email,
      password,
    });

  return response.data;
};

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const response =
    await api.post('/auth/register', {
      name,
      email,
      password,
    });

  return response.data;
};

export const me = async () => {
  const response =
    await api.get('/auth/me');

  return response.data;
};