import { useState } from 'react';
import { api } from '../../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      console.log(response.data);

      localStorage.setItem(
        'token',
        response.data.access_token,
      );

      alert('Login berhasil');
    } catch (error) {
      console.error(error);
      alert('Login gagal');
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}