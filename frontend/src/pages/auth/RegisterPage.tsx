import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { register } from '../../api/auth.service';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const handleRegister =
    async () => {
      try {
        setLoading(true);

        await register(
          name,
          email,
          password,
        );

        alert(
          'Registrasi berhasil',
        );

        navigate('/');
      } catch (error) {
        console.error(error);

        alert(
          'Registrasi gagal',
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
      <h1>Register</h1>

      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value,
          )
        }
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value,
          )
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value,
          )
        }
      />

      <br />
      <br />

      <button
        onClick={handleRegister}
        disabled={loading}
      >
        {loading
          ? 'Loading...'
          : 'Register'}
      </button>

      <br />
      <br />

      <Link to="/">
        Sudah punya akun?
        Login
      </Link>
    </div>
  );
}