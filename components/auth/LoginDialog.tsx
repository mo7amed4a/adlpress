"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/components/Providers";

export default function LoginDialog({
  onSwitchToSignup,
  onSwitchToForgot,
  onClose,
}: {
  onSwitchToSignup: () => void;
  onSwitchToForgot?: () => void;
  onClose?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { setIsLoggedIn } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("البريد الإلكتروني وكلمة المرور مطلوبان");
      return;
    }
    if (password.length < 8) {
      setError("يجب أن تكون كلمة المرور 8 أحرف على الأقل");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("يرجى إدخال عنوان بريد إلكتروني صالح");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await login({ login: email, password });
      if (data.token) {
        if (data.user && (data.user._id || data.user.id)) {
          localStorage.setItem("userId", data.user._id || data.user.id);
        }
        if (data.user?.username) {
          localStorage.setItem("username", data.user.username);
        }
        setIsLoggedIn(true);
        window.dispatchEvent(new Event("authStateChanged"));
        toast({
          title: "تم تسجيل الدخول بنجاح!",
          description: "سيتم تحويلك للصفحة المطلوبة.",
        });

        if (onClose) onClose();

        setEmail("");
        setPassword("");
        setError(null);

        const returnUrl = localStorage.getItem("returnUrl") || "/";
        localStorage.removeItem("returnUrl");
        router.refresh();
        router.push(returnUrl);
      }
    } catch (err: any) {
      setError(err.message || "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      localStorage.setItem("returnUrl", "/account");
      import("@/lib/api").then((mod) => mod.initiateGoogleAuth());
    } catch (err: any) {
      setError(err.message || "حدث خطأ في تسجيل الدخول بواسطة Google");
      setGoogleLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-md mx-auto bg-white rounded-3xl px-6 py-10 shadow-md flex flex-col gap-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-800">تسجيل الدخول</h2>
        <p className="text-sm text-gray-500 mt-1">مرحبًا بعودتك! الرجاء إدخال بياناتك.</p>
      </div>

      {/* البريد الإلكتروني */}
      <div>
        <label htmlFor="email-login" className="block text-sm font-medium text-gray-700 mb-1">
          البريد الإلكتروني
        </label>
        <Input
          id="email-login"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-700 placeholder-gray-400 transition-all"

        />
      </div>

      {/* كلمة المرور */}
      <div>
        <label htmlFor="password-login" className="block text-sm font-medium text-gray-700 mb-1">
          كلمة المرور
        </label>
        <Input
          id="password-login"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11 rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-700 placeholder-gray-400 transition-all"

        />
        <div className="text-left mt-2">
          <button
            type="button"
            onClick={onSwitchToForgot}
            className="text-sm text-blue-600 hover:underline"
          >
            هل نسيت كلمة السر؟
          </button>
        </div>
      </div>

      {/* رسالة الخطأ */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* زر الدخول */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-11 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm rounded-xl"
      >
        {loading ? "جارٍ الدخول..." : "تسجيل الدخول"}
      </Button>

      {/* فاصل */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="text-sm text-gray-400">أو</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* زر Google */}
      <Button
        type="button"
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        variant="outline"
        className="w-full h-11 text-sm border border-gray-300 hover:bg-gray-50 rounded-xl"
      >
        <div className="flex items-center justify-center gap-2">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>      {googleLoading ? "جارٍ التوجيه..." : "تسجيل الدخول بواسطة Google"}
        </div>
      </Button>

      {/* رابط التسجيل */}
      <p className="text-center text-sm text-gray-600 mt-2">
        ليس لديك حساب؟{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-blue-600 font-medium hover:underline"
        >
          إنشاء حساب
        </button>
      </p>
    </form>

  );
}
