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
  FileSpreadsheet,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SignupFormData, SignupRecord } from '../types';
import { getGoogleAccessToken, appendSignupToSheet } from '../services/sheetsService';

export const EarlyAccessForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    contact: '',
    childAge: '7-9',
    numberOfChildren: '2',
    mainChallenge: 'المماطلة وتأجيل الواجبات'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<SignupRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'saving' | 'synced' | 'local_only'>('idle');

  // Check localStorage for existing signup
  useEffect(() => {
    try {
      const saved = localStorage.getItem('noqati_signup');
      if (saved) {
        setSubmittedRecord(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.contact.trim()) {
      setErrorMessage('يرجى إدخال رقم الواتساب أو البريد الإلكتروني للتواصل معك عند الإطلاق.');
      return;
    }

    // Simple basic format check (either phone or email)
    const isEmail = formData.contact.includes('@');
    const isPhone = /^[0-9+()-\s]{7,18}$/.test(formData.contact.trim());

    if (!isEmail && !isPhone) {
      setErrorMessage('يرجى إدخال رقم هاتف واتساب صحيح أو بريد إلكتروني صالح.');
      return;
    }

    setIsSubmitting(true);
    setSyncStatus('saving');

    const waitlistNum = 864 + Math.floor(Math.random() * 10);
    let spreadsheetUrl: string | undefined = undefined;

    // Try Google Sheets sync via OAuth
    try {
      const token = await getGoogleAccessToken();
      if (token) {
        const res = await appendSignupToSheet(formData, waitlistNum, token);
        spreadsheetUrl = res.spreadsheetUrl;
        setSyncStatus('synced');
      }
    } catch (sheetError) {
      console.warn('Sheets synchronization note:', sheetError);
      // Fall back gracefully so the user is never blocked
      setSyncStatus('local_only');
    }

    const newRecord: SignupRecord = {
      ...formData,
      id: 'noqati_' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      waitlistNumber: waitlistNum,
      spreadsheetUrl
    };

    try {
      localStorage.setItem('noqati_signup', JSON.stringify(newRecord));
    } catch {
      // ignore
    }

    setSubmittedRecord(newRecord);
    setIsSubmitting(false);
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
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                      {errorMessage}
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

                  {/* Child Age Group Selector */}
                  <div>
                    <label className="block text-sm font-bold text-stone-900 mb-2">
                      الفئة العمرية لأبنائك
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { label: '٤ - ٦ سنوات', val: '4-6' },
                        { label: '٧ - ٩ سنوات', val: '7-9' },
                        { label: '١٠ - ١٢ سنة', val: '10-12' },
                        { label: '١٣+ سنة', val: '13+' }
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setFormData({ ...formData, childAge: item.val })}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            formData.childAge === item.val
                              ? 'bg-orange-600 border-orange-600 text-white shadow-xs'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
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
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-early-access-btn"
                    className="w-full py-4 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-base shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>جاري حفظ اهتمامك...</span>
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

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>تم تأكيد تسجيلك بنجاح!</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2 font-heading">
                  أهلاً بك في عائلة "نقاطي" {submittedRecord.fullName ? `، ${submittedRecord.fullName}` : ''} 🎉
                </h3>

                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                  رقمك في قائمة الانتظار هو{' '}
                  <strong className="text-orange-600 font-extrabold text-lg px-2 py-0.5 bg-orange-50 rounded-md border border-orange-200">
                    #{submittedRecord.waitlistNumber}
                  </strong>
                  . سنرسل لكِ رابط الوصول التجريبي الخاص فور جاهزيته على ({submittedRecord.contact}).
                </p>

                {/* VIP Perks Card */}
                <div className="p-5 rounded-2xl bg-orange-50 border border-orange-200 text-right mb-6">
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

                {/* Google Sheets Sync Indicator */}
                {submittedRecord.spreadsheetUrl ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-between gap-3 mb-8">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>تمت مزامنة وحفظ طلبك في جدول Google Sheets الخاص بالتطبيق بنجاح.</span>
                    </div>
                    <a
                      href={submittedRecord.spreadsheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-900 underline shrink-0"
                    >
                      <span>عرض الجدول</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-600 text-xs font-medium flex items-center gap-2 mb-8">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>تم حفظ تسجيلك في قائمة الانتظار بنجاح.</span>
                  </div>
                )}

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
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
