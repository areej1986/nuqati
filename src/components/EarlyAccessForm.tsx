import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Gift,
  ShieldCheck,
  Share2,
  Users,
  Star,
  Flame,
  MessageCircle,
  Copy,
  Check,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SignupFormData, SignupRecord } from '../types';
import { saveRegistrationToGoogleSheets } from '../services/sheetsService';

const AGE_CATEGORIES = [
  '٤–٦ سنوات',
  '٧–٩ سنوات',
  '١٠–١٢ سنة',
  '١٣+ سنة'
];

export const EarlyAccessForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    contact: '',
    mainChallenge: 'المماطلة وتأجيل الواجبات',
    customChallenge: ''
  });
  const [selectedAges, setSelectedAges] = useState<string[]>(['٧–٩ سنوات']);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<SignupRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleAgeCategory = (category: string) => {
    setSelectedAges((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Check localStorage for existing signup
  useEffect(() => {
    try {
      const saved = localStorage.getItem('noqati_signup');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.id || parsed?.contact) {
          setSubmittedRecord(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    console.log('[Noqati 1/5] تم الضغط على زر التسجيل واستدعاء handleSubmit. البيانات:', formData, 'الفئات العمرية:', selectedAges);

    if (!formData.contact.trim()) {
      setErrorMessage('يرجى إدخال رقم الواتساب أو البريد الإلكتروني للتواصل معك عند الإطلاق.');
      console.warn('[Noqati 1/5] حقل وسيلة التواصل فارغ.');
      return;
    }

    // Simple basic format check (either phone or email)
    const isEmail = formData.contact.includes('@');
    const isPhone = /^[0-9+()-\s]{7,18}$/.test(formData.contact.trim());

    if (!isEmail && !isPhone) {
      setErrorMessage('يرجى إدخال رقم هاتف واتساب صحيح أو بريد إلكتروني صالح.');
      console.warn('[Noqati 1/5] صيغة وسيلة التواصل غير صحيحة:', formData.contact);
      return;
    }

    if (selectedAges.length === 0) {
      setErrorMessage('يرجى اختيار فئة عمرية واحدة على الأقل لأطفالك.');
      return;
    }

    if (formData.mainChallenge === 'مشكلة أخرى' && !formData.customChallenge?.trim()) {
      setErrorMessage('يرجى كتابة المشكلة التي تواجهينها في الخانة المخصصة.');
      return;
    }

    setIsSubmitting(true);

    const submissionData: SignupFormData = {
      ...formData,
      childAge: selectedAges.join('، '),
      childAges: selectedAges,
    };

    try {
      // Write actual registration directly to Google Sheets API
      const result = await saveRegistrationToGoogleSheets(submissionData);
      console.log('[Noqati] اكتملت عملية الحفظ بنجاح تام! رابط الجدول:', result.spreadsheetUrl);

      const newRecord: SignupRecord = {
        ...submissionData,
        id: 'noqati_' + Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        spreadsheetUrl: result.spreadsheetUrl
      };

      try {
        localStorage.setItem('noqati_signup', JSON.stringify(newRecord));
      } catch {
        // ignore
      }

      setSubmittedRecord(newRecord);
    } catch (sheetError: unknown) {
      console.error('[Noqati خطأ] فشل في Google Sheets أثناء إرسال النموذج:', sheetError);
      const errMsg = sheetError instanceof Error ? sheetError.message : String(sheetError);
      setErrorMessage(`تعذر إكمال الحفظ في Google Sheets: ${errMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const shareWhatsAppMessage = () => {
    const text = encodeURIComponent(
      `وجدت فكرة تطبيق مميزة اسمها "نقاطي" لتحفيز الأطفال على إنجاز مهامهم اليومية بدون صراخ وبنظام نقاط ومكافآت ذكي 🌟 سجلت بقائمة الانتظار وحبيت أشاركها معك:\n${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="early-access" className="py-20 bg-gradient-to-b from-stone-50 via-orange-50/30 to-amber-50/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container Card */}
        <div className="bg-white rounded-3xl border-2 border-orange-200/90 shadow-xl p-6 sm:p-10 lg:p-12 text-right relative overflow-hidden">
          {/* Top highlight glow */}
          <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />
          
          <AnimatePresence mode="wait">
            {!submittedRecord ? (
              <motion.div
                key="signup-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Form Header */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold mb-3">
                    <Gift className="w-3.5 h-3.5 text-orange-600" />
                    <span>متاح لأول ١٠٠٠ عائلة فقط</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3 font-heading">
                    سجلي اهتمامك واحصلي على وصول مبكر مجاني
                  </h2>
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                    انضمي لقائمة الانتظار لتكوني من أوائل العائلات التي تجرب تطبيق "نقاطي"، مع <strong>اشتراك تجريبي VIP مجاناً لمدة ٣ أشهر</strong> عند الإطلاق.
                  </p>
                </div>

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200 text-red-800 text-sm font-medium flex items-start gap-3 text-right">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div className="flex-1 leading-relaxed">
                        <span className="font-bold block mb-0.5">تنبيه في التسجيل:</span>
                        <span>{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  {/* Contact Input (Required) */}
                  <div>
                    <label htmlFor="contact-input" className="block text-sm font-bold text-stone-900 mb-2">
                      رقم الواتساب أو البريد الإلكتروني <span className="text-orange-600">*</span>
                    </label>
                    <input
                      id="contact-input"
                      type="text"
                      placeholder="05XXXXXXXX أو name@email.com"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-stone-50 border border-stone-300 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-stone-900 text-sm font-medium outline-hidden transition-all text-right placeholder:text-stone-400"
                    />
                    <span className="text-[11px] text-stone-500 mt-1 block">
                      لن نرسل أي رسائل مزعجة؛ سنخبرك فور توفر التطبيق للتجربة.
                    </span>
                  </div>

                  {/* Parent Name (Optional) */}
                  <div>
                    <label htmlFor="name-input" className="block text-sm font-bold text-stone-900 mb-2">
                      اسمك الكريم (اختياري)
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      placeholder="مثال: أم سارة أو أبو محمد"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-stone-50 border border-stone-300 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-stone-900 text-sm font-medium outline-hidden transition-all text-right placeholder:text-stone-400"
                    />
                  </div>

                  {/* Child Age Group Selector (Multiple Checkboxes) */}
                  <div>
                    <div className="mb-2">
                      <label className="block text-sm font-bold text-stone-900">
                        ما الفئات العمرية لأطفالك؟ <span className="text-red-500">*</span>
                      </label>
                      <span className="block text-xs text-stone-500 font-medium mt-0.5">
                        يمكنك اختيار أكثر من فئة
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {AGE_CATEGORIES.map((category) => {
                        const isChecked = selectedAges.includes(category);
                        return (
                          <button
                            key={category}
                            type="button"
                            onClick={() => toggleAgeCategory(category)}
                            className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                              isChecked
                                ? 'bg-orange-600 border-orange-600 text-white shadow-xs'
                                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                                isChecked
                                  ? 'bg-white text-orange-600 border-white'
                                  : 'border-stone-300 bg-white text-transparent'
                              }`}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                            <span className="truncate">{category}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Main Parenting Challenge (Helps validate specific features) */}
                  <div>
                    <label htmlFor="challenge-select" className="block text-sm font-bold text-stone-900 mb-2">
                      أكبر تحدٍ يواجهك في روتين أطفالك اليومي؟ (اختياري)
                    </label>
                    <select
                      id="challenge-select"
                      value={formData.mainChallenge}
                      onChange={(e) => setFormData({ ...formData, mainChallenge: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-stone-50 border border-stone-300 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-stone-900 text-sm font-medium outline-hidden transition-all text-right cursor-pointer"
                    >
                      <option value="المماطلة وتأجيل الواجبات">المماطلة وتأجيل الواجبات والمذاكرة</option>
                      <option value="ترتيب الغرفة والألعاب">عدم ترتيب الغرفة والألعاب إلا بعد صراخ</option>
                      <option value="كثرة وقت الشاشات">صعوبة سحب الأجهزة اللوحية والشاشات</option>
                      <option value="العناد والجدال المستمر">العناد والجدال عند طلب أي مهمة روتينية</option>
                      <option value="النظافة والنوم المبكر">تأخير النوم وروتين النظافة وتفريش الأسنان</option>
                      <option value="مشكلة أخرى">مشكلة أخرى</option>
                    </select>

                    {formData.mainChallenge === 'مشكلة أخرى' && (
                      <div className="mt-3">
                        <label htmlFor="custom-challenge-input" className="block text-sm font-bold text-stone-900 mb-1.5">
                          ما المشكلة التي تواجهينها؟ <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="custom-challenge-input"
                          type="text"
                          required
                          value={formData.customChallenge || ''}
                          onChange={(e) => setFormData({ ...formData, customChallenge: e.target.value })}
                          placeholder="اكتبي المشكلة باختصار..."
                          className="w-full px-4 py-3.5 rounded-xl bg-stone-50 border border-stone-300 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-stone-900 text-sm font-medium outline-hidden transition-all text-right placeholder:text-stone-400"
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-early-access-btn"
                    className="w-full py-4 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-base shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>جاري تسجيل اهتمامك...</span>
                      </span>
                    ) : (
                      <>
                        <span>انضمي لقائمة الانتظار مجاناً</span>
                        <ArrowLeft className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {/* Guarantee & Privacy note */}
                  <div className="flex items-center justify-center gap-2 text-xs text-stone-500 text-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>خصوصيتك مضمونة ١٠٠٪ ولن نشارك بياناتك مع أي طرف ثالث.</span>
                  </div>

                </form>
              </motion.div>
            ) : (
              
              /* Confirmation / Success State */
              <motion.div
                key="signup-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 max-w-xl mx-auto"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-3 font-heading">
                  🎉 تم تسجيل اهتمامك بنجاح!
                </h3>

                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                  شكرًا لانضمامك إلى نقاطي. سنخبرك فور توفر التطبيق للتجربة.
                </p>

                {/* VIP Perks Card */}
                <div className="p-5 rounded-2xl bg-orange-50 border border-orange-200 text-right mb-8">
                  <h4 className="text-sm font-bold text-orange-900 mb-2 flex items-center gap-2">
                    <Gift className="w-4 h-4 text-orange-600" />
                    مزايا العضوية المبكرة المضمونة لك:
                  </h4>
                  <ul className="text-xs text-stone-700 space-y-1.5">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>تجربة مجانية كاملة ومميزة (VIP) لمدة ٣ أشهر.</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>قوالب مهام وجداول تربوية حصرية قابلة للطباعة فورياً.</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>أولوية التواصل مع فريق التطوير لطلب أي ميزة تفضلينها.</span>
                    </li>
                  </ul>
                </div>

                {/* Social Sharing Actions */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-stone-700 block">
                    شاركي الفكرة مع أمهات وصديقات يعانين من نفس التحدي:
                  </span>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={shareWhatsAppMessage}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>مشاركة عبر واتساب</span>
                    </button>

                    <button
                      onClick={handleCopyLink}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 font-bold text-sm transition-colors cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedLink ? 'تم نسخ الرابط!' : 'نسخ رابط الصفحة'}</span>
                    </button>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem('noqati_signup');
                        setSubmittedRecord(null);
                        setSelectedAges(['٧–٩ سنوات']);
                        setFormData({
                          fullName: '',
                          contact: '',
                          mainChallenge: 'المماطلة وتأجيل الواجبات',
                          customChallenge: ''
                        });
                      }}
                      className="text-xs font-medium text-stone-400 hover:text-stone-700 underline transition-colors cursor-pointer"
                    >
                      تسجيل اهتمام لطفل آخر أو برقم جديد
                    </button>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
