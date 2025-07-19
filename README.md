# AdlPress - متجر إلكتروني متكامل

## المميزات الرئيسية:

### 🔐 نظام المصادقة المتقدم
- ✅ تسجيل الدخول وإنشاء الحساب التقليدي
- ✅ **تسجيل الدخول بواسطة Google OAuth** (جديد!)
- ✅ فحص صحة التوكن
- ✅ حفظ الصفحة المطلوبة للعودة إليها

### 🛒 نظام السلة والفوترة
- ✅ إضافة المنتجات للسلة
- ✅ تعديل الكميات وحذف المنتجات
- ✅ فحص تسجيل الدخول قبل الفوترة
- ✅ صفحة فوترة متكاملة
- ✅ صفحة تأكيد الطلب
- ✅ عرض طلبات المستخدم

### 🎨 واجهة مستخدم حديثة
- ✅ تصميم متجاوب (Responsive)
- ✅ دعم اللغة العربية
- ✅ واجهة مستخدم بديهية
- ✅ رسائل تنبيه واضحة

## الإصلاحات المنجزة:

### 1. **إصلاح خطأ 400 في تسجيل الدخول**
- إصلاح البيانات المرسلة للسيرفر (`passwoard` بدلاً من `password`)
- تحسين معالجة الأخطاء

### 2. **إضافة Google OAuth**
- أزرار تسجيل الدخول بواسطة Google
- صفحة callback لمعالجة الاستجابة
- صفحة redirect للتوجيه
- معالجة كاملة للتدفق

### 3. **تحسين نظام الفوترة**
- فحص تسجيل الدخول قبل عرض صفحة الفوترة
- حفظ الصفحة المطلوبة للعودة إليها
- توجيه تلقائي بعد تسجيل الدخول

### 4. **تحسين تجربة المستخدم**
- رسائل تحميل واضحة
- معالجة الأخطاء بشكل مناسب
- توجيه ذكي للصفحات

## التدفق الكامل للتسوق:

1. **تصفح المنتجات** → إضافة للسلة
2. **الضغط على "إتمام الشراء"** → فحص تسجيل الدخول
3. **إذا غير مسجل** → توجيه لصفحة تسجيل الدخول
4. **تسجيل الدخول** (تقليدي أو Google) → العودة لصفحة الفوترة
5. **إدخال بيانات الفوترة** → إرسال الطلب
6. **صفحة تأكيد** → عرض تفاصيل الطلب
7. **عرض الطلبات** → من صفحة الحساب

## الملفات المهمة:

### المصادقة:
- `components/auth/LoginDialog.tsx` - تسجيل الدخول
- `components/auth/SignupDialog.tsx` - إنشاء الحساب
- `app/(pages)/auth/callback/page.tsx` - معالجة Google OAuth
- `lib/api.ts` - API functions

### السلة والفوترة:
- `components/cart/CartBox.tsx` - سلة المشتريات
- `app/(pages)/(cart)/checkout/page.tsx` - صفحة الفوترة
- `app/(pages)/(cart)/checkout/last/page.tsx` - تأكيد الطلب
- `app/(pages)/account/purchases/page.tsx` - طلبات المستخدم

## إعداد Google OAuth:

### 1. Google Cloud Console:
- إنشاء مشروع جديد
- تفعيل Google+ API
- إنشاء OAuth 2.0 credentials
- إضافة redirect URIs

### 2. متغيرات البيئة:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://adl-express-node.vercel.app/api/vi/auth/google/callback
JWT_SECRET=your_jwt_secret
```

## التشغيل:

```bash
# تثبيت التبعيات
npm install

# تشغيل في وضع التطوير
npm run dev

# بناء للإنتاج
npm run build
```

## التقنيات المستخدمة:

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context
- **Authentication**: JWT, Google OAuth
- **HTTP Client**: Axios

## ملاحظات مهمة:

1. **مشكلة redirect_uri_mismatch**: تأكد من إعداد Google OAuth بشكل صحيح
2. **الأمان**: استخدام HTTPS في الإنتاج
3. **التجربة**: معالجة الأخطاء بشكل مناسب

## الدعم:

للمساعدة أو الإبلاغ عن مشاكل، يرجى التواصل مع فريق التطوير.
