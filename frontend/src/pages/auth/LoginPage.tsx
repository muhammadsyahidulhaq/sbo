import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../../api/auth.service';
import { getMyOrganizations } from '../../api/organization.service';

import toast from 'react-hot-toast';

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

import { motion } from 'framer-motion';

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
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

      const organizations =
        await getMyOrganizations();

      toast.success(
        'Login berhasil 🎉',
      );

      if (
        organizations.length === 0
      ) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data
          ?.message ||
          'Email atau password salah',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px]" />

        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>

          <h1 className="mt-5 text-4xl font-extrabold bg-gradient-to-r from-indigo-200 to-violet-200 bg-clip-text text-transparent">
            Welcome Back
          </h1>

          <p className="text-slate-400 mt-2">
            Sign in to continue your
            journey.
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-800/70 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Alamat Email
              </label>

              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all">
                <Mail className="w-5 h-5 text-slate-500" />

                <input
                  type="email"
                  placeholder="Masukan email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value,
                    )
                  }
                  className="w-full bg-transparent outline-none text-slate-100 placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Password
              </label>

              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all">
                <Lock className="w-5 h-5 text-slate-500" />

                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value,
                    )
                  }
                  className="w-full bg-transparent outline-none text-slate-100 placeholder:text-slate-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword,
                    )
                  }
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-indigo-500/25 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative py-3">
              <div className="border-t border-slate-700" />
            </div>

            {/* Register */}
            <div className="text-center">
              <p className="text-slate-400 text-sm">
                Belum punya akun?

                <Link
                  to="/register"
                  className="ml-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}