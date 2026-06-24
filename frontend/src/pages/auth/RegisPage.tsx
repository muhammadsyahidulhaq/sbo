import { registerUser } from "../../services/auth.service";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  UserPlus,
  Sparkles,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { RegisterFormData } from "../../types";

export default function RegisPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch("password");

 const onSubmit = async (data: RegisterFormData) => {
  console.log("FORM SUBMIT");
  console.log(data);

  setLoading(true);

  try {
    await registerUser(
      data.name,
      data.email,
      data.password
    );

    console.log("REGISTER SUCCESS");

    toast.success("Register berhasil!");

    navigate("/");
  } catch (error: any) {
    console.error("REGISTER ERROR", error);

    toast.error(
      error.response?.data?.message ||
      "Register gagal"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-[#0f172a] text-slate-200">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[100px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10 flex flex-col gap-8"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-500/30">
          </div>

          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-indigo-200">
              Register
            </h1>
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-slate-300">
                You're Fullname
              </label>

              <div className="mt-2 flex items-center gap-3 bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3">
                <User className="w-5 h-5 text-slate-500" />

                <input
                  {...register("name", {
                    required: "Full name is required",
                  })}
                  className="w-full bg-transparent outline-none"
                  placeholder="Budi Santoso"
                />
              </div>

              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-slate-300">
                Email
              </label>

              <div className="mt-2 flex items-center gap-3 bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3">
                <Mail className="w-5 h-5 text-slate-500" />

                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="w-full bg-transparent outline-none"
                  placeholder="Budi@gmail.com"
                />
              </div>

              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-slate-300">
                Password
              </label>

              <div className="mt-2 flex items-center gap-3 bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3">
                <Lock className="w-5 h-5 text-slate-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full bg-transparent outline-none"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-semibold text-slate-300">
                Confirm Password
              </label>

              <div className="mt-2 flex items-center gap-3 bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3">
                <Lock className="w-5 h-5 text-slate-500" />

                <input
                  type={showConfirm ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="w-full bg-transparent outline-none"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                <i class="bi bi-person-plus-fill"></i>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?
              <Link
                to="/"
                className="text-violet-400 font-semibold hover:text-violet-300 ml-2"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}