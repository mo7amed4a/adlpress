"use client";

import { useState } from "react";
import { register, initiateGoogleAuth } from "@/lib/api";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupDialog({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("جميع الحقول مطلوبة");
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
    if (!termsAccepted) {
      setError("يجب أن توافق على شروط الخدمة وسياسة الخصوصية");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await register({ username, email, password });
      setError(null);
      // إظهار رسالة نجاح
      alert("تم إنشاء الحساب بنجاح! سيتم تحويلك لتسجيل الدخول.");
      // تحويل المستخدم لصفحة تسجيل الدخول
      onSwitchToLogin();
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || "حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setError(null);
    
    try {
      initiateGoogleAuth();
    } catch (err: any) {
      console.error('Google signup error:', err);
      setError(err.message || "حدث خطأ في التسجيل بواسطة Google");
      setGoogleLoading(false);
    }
  };

  return (
<form
  onSubmit={handleSignup}
  className="w-full max-w-md mx-auto bg-white rounded-3xl px-6 py-10 shadow-md flex flex-col gap-6"
>
  <div className="text-center">
    <h2 className="text-2xl font-bold text-blue-800">إنشاء حساب جديد</h2>
    <p className="text-sm text-gray-500 mt-1">ابدأ رحلتك معنا الآن!</p>
  </div>

  {/* اسم المستخدم */}
  <div>
    <label htmlFor="username-signup" className="block text-sm font-medium text-gray-700 mb-1">
      اسم المستخدم
    </label>
   <Input
  id="username-signup"
  placeholder="أدخل اسم المستخدم"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  className="h-11 rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-700 placeholder-gray-400 transition-all"
/>

  </div>

  {/* البريد الإلكتروني */}
  <div>
    <label htmlFor="email-signup" className="block text-sm font-medium text-gray-700 mb-1">
      البريد الإلكتروني
    </label>
    <Input
      id="email-signup"
      type="email"
      placeholder="example@email.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="h-11 rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-700 placeholder-gray-400 transition-all"

    />
  </div>

  {/* كلمة المرور */}
  <div>
    <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700 mb-1">
      كلمة المرور
    </label>
    <Input
      id="password-signup"
      type="password"
      placeholder="••••••••"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="h-11 rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-700 placeholder-gray-400 transition-all"

    />
  </div>

  {/* الموافقة على الشروط */}
  <div className="flex items-start gap-2 text-sm text-gray-600">
    <Checkbox
      id="terms"
      checked={termsAccepted}
      onCheckedChange={(checked) => setTermsAccepted(!!checked)}
      className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
    />
    <label htmlFor="terms">
      أوافق على{" "}
      <a href="#" className="text-blue-600 underline">شروط الاستخدام</a> و{" "}
      <a href="#" className="text-blue-600 underline">سياسة الخصوصية</a>.
    </label>
  </div>

  {/* رسالة الخطأ */}
  {error && <p className="text-sm text-red-500">{error}</p>}

  {/* زر التسجيل */}
  <Button
    type="submit"
    disabled={loading || !termsAccepted}
    className="w-full h-11 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm rounded-xl"
  >
    {loading ? "جارٍ إنشاء الحساب..." : "إنشاء حساب"}
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
          onClick={handleGoogleSignup}
          disabled={googleLoading}
          variant="outline"
    className="w-full h-11 text-sm border border-gray-300 hover:bg-gray-50 rounded-xl"
        >
          <div className="flex items-center justify-center gap-3">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {googleLoading ? "جارٍ التوجيه..." : "إنشاء حساب بواسطة Google"}
          </div>
        </Button>

  {/* رابط تسجيل الدخول */}
  <p className="text-center text-sm text-gray-600 mt-2">
    لديك حساب؟{" "}
    <button
      type="button"
      onClick={onSwitchToLogin}
      className="text-blue-600 font-medium hover:underline"
    >
      تسجيل الدخول
    </button>
  </p>
</form>

  );
}