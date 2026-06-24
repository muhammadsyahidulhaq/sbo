import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { register } from '../../api/auth.service';

import toast from 'react-hot-toast';

import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  UserPlus,
} from 'lucide-react';

import { motion } from 'framer-motion';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] =
    useState('');
  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
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

        toast.success(
          'Registrasi berhasil 🎉',
        );

        navigate('/');
      } catch (error: any) {
        console.error(error);

        toast.error(
          error?.response?.data
            ?.message ||
            'Registrasi gagal',
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-[#0f172a] text-slate-200">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[100px]" />

        <div className="absolute -bottom-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[100px]" />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-indigo-200">
            Register
          </h1>

          <p className="text-slate-400 mt-2">
            Buat akun baru untuk
            melanjutkan
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col gap-5">
            {/* Nama */}
            <div>
              <label className="text-sm font-semibold text-slate-300 mb-2 block">
                Nama Lengkap
              </label>

              <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3.5 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/20 transition-all">
                <User className="w-5 h-5 text-slate-500" />

                <input
                  type="text"
                  placeholder="Masukkan nama"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value,
                    )
                  }
                  className="w-full bg-transparent outline-none text-slate-100 placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-slate-300 mb-2 block">
                Email
              </label>

              <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3.5 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/20 transition-all">
                <Mail className="w-5 h-5 text-slate-500" />

                <input
                  type="email"
                  placeholder="Masukkan email"
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
              <label className="text-sm font-semibold text-slate-300 mb-2 block">
                Password
              </label>

              <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3.5 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/20 transition-all">
                <Lock className="w-5 h-5 text-slate-500" />

                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  placeholder="Masukkan password"
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
              onClick={
                handleRegister
              }
              disabled={loading}
              className="mt-2 w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl py-4 font-bold shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Register
                  <UserPlus className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Login */}
            <div className="pt-5 mt-2 border-t border-slate-700 text-center">
              <p className="text-slate-400 text-sm">
                Sudah punya akun?
                <Link
                  to="/"
                  className="text-violet-400 hover:text-violet-300 font-semibold ml-2 transition-colors"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}