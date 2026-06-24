import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getMe, login } from '../../api/auth.service';
import { getMyOrganizations } from '../../api/organization.service';

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response =
        await login(
          email,
          password,
        );

      localStorage.setItem(
        'token',
        response.access_token,
      );

          const me = await getMe();

      const organizations =
        await getMyOrganizations();

      if (
        organizations.length === 0
      ) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);

      alert(
        'Email atau password salah',
      );
    } finally {
      setLoading(false);
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
        onClick={handleLogin}
        disabled={loading}
      >
        {loading
          ? 'Loading...'
          : 'Login'}
      </button>

      <br />
      <br />

      <Link to="/register">
        Belum punya akun?
        Register
      </Link>
    </div>
    
  );
  
}