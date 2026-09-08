import React, { useState } from 'react';
import { Sparkles, ArrowLeft, CheckCircle2, Star, ShieldCheck, HeartHandshake, Award, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onCtaClick: () => void;
  onExploreDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick, onExploreDemo }) => {
  const [completedDemoTask, setCompletedDemoTask] = useState(false);
  const [demoPoints, setDemoPoints] = useState(140);

  const toggleDemoTask = () => {
    if (!completedDemoTask) {
      setCompletedDemoTask(true);
      setDemoPoints((prev) => prev + 25);
    } else {
      setCompletedDemoTask(false);
      setDemoPoints((prev) => prev - 25);
    }
  };

  return (
    <section id="hero-section" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background ambient decorative shapes */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-amber-100/40 via-orange-100/30 to-amber-50/20 blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-orange-200/20 blur-2xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Copy (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col text-right">
            
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-800 text-xs sm:text-sm font-medium mb-6 shadow-2xs"
            >
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span>الوصول المبكر مفتوح الآن لأول ١٠٠٠ عائلة</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.25] sm:leading-[1.2] mb-6 font-heading"
            >
              خلّي طفلك ينجز مهامه <br className="hidden sm:inline" />
              <span className="relative text-orange-600 inline-block">
                بدون ما تظلين تلاحقينه.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-orange-200 -z-10"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9.5C60 3 180 2 299 9.5"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Supporting Explanation */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-stone-600 leading-relaxed max-w-2xl mb-8 font-normal"
            >
              حوّلي المسؤوليات اليومية (المذاكرة، ترتيب الغرفة، النظافة الشخصية) إلى لعبة محببة لطفلك:
              <strong className="text-stone-800 font-semibold mx-1">مهام واضحة</strong> ينجزها بحماس،
              <strong className="text-stone-800 font-semibold mx-1">نقاط يجمعها</strong> في حصالته،
              و<strong className="text-stone-800 font-semibold mx-1">مكافآت قيّمة</strong> يستبدلها بدون صراخ أو تهديد.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
            >
              <button
                onClick={onCtaClick}
                id="hero-primary-cta"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>أريد تجربة نقاطي</span>
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreDemo}
                id="hero-secondary-cta"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-semibold text-base transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 text-orange-600 fill-orange-600" />
                <span>شاهدي كيف يعمل النظام</span>
              </button>
            </motion.div>

            {/* Social Proof & Guarantees */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-stone-600 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block">+٨٥٠ عائلة</span>
                  <span>في قائمة الانتظار</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block">٠ صراخ</span>
                  <span>١٠٠٪ تحفيز إيجابي</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block">مجاني بالكامل</span>
                  <span>للمنضمين مبكراً</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Interactive Visual Card Mockup (5 cols on desktop) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-md bg-white rounded-2xl border border-stone-200/90 shadow-xl p-6 relative overflow-hidden"
            >
              {/* Header inside mockup */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-sm border border-orange-200">
                    سارة
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-stone-900">سارة (٧ سنوات)</h2>
                    <span className="text-xs text-stone-500">مستوى: بطلة الالتزام 🌟</span>
                  </div>
                </div>

                {/* Points Pill Counter */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-bold text-sm shadow-2xs">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500 animate-spin-slow" />
                  <span>{demoPoints} نقطة</span>
                </div>
              </div>

              {/* Progress towards next reward */}
              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/70 mb-5">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-stone-700 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-orange-600" />
                    الهدف الحالي: نزهة الدراجات 🚲
                  </span>
                  <span className="text-stone-500 font-medium">{demoPoints} / ١٦٠ نقطة</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (demoPoints / 160) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-1.5 text-right">
                  {160 - demoPoints > 0
                    ? `متبقي ${160 - demoPoints} نقطة فقط وتفتح المكافأة!`
                    : '🎉 مبروك! حققت سارة هدف المكافأة!'}
                </p>
              </div>

              {/* Interactive Task Cards */}
              <div className="space-y-2.5 mb-5">
                <div className="text-xs font-bold text-stone-400 uppercase tracking-wider text-right mb-2">
                  مهام اليوم (جربي الضغط عليها):
                </div>

                {/* Static completed task */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50/70 border border-stone-200/60 opacity-80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm text-stone-500 line-through">
                      ترتيب السرير عند الاستيقاظ
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    +١٥ تمّت
                  </span>
                </div>

                {/* Interactive Task */}
                <button
                  type="button"
                  onClick={toggleDemoTask}
                  id="hero-demo-interactive-task"
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-right cursor-pointer ${
                    completedDemoTask
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
                      : 'bg-white border-orange-200 hover:border-orange-400 hover:shadow-xs text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                        completedDemoTask
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-orange-400 bg-white'
                      }`}
                    >
                      {completedDemoTask && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <span
                        className={`text-xs sm:text-sm font-semibold block ${
                          completedDemoTask ? 'line-through text-stone-500' : 'text-stone-800'
                        }`}
                      >
                        قراءة قصة قبل النوم (١٥ دقيقة)
                      </span>
                      <span className="text-[11px] text-stone-400">مهمة يومية محفزة</span>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-md transition-colors ${
                      completedDemoTask
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-orange-50 text-orange-700'
                    }`}
                  >
                    {completedDemoTask ? 'تم اعتمادها!' : '+٢٥ نقطة'}
                  </span>
                </button>

                {/* Pending task */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-stone-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md border-2 border-stone-300 bg-white" />
                    <span className="text-xs sm:text-sm text-stone-700 font-medium">
                      حل واجب الرياضيات بدون تأجيل
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                    +٣٠ نقطة
                  </span>
                </div>
              </div>

              {/* Bottom Micro Banner */}
              <div className="bg-amber-50/80 rounded-xl p-3 border border-amber-200/60 flex items-center gap-2.5 text-right">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <p className="text-[11px] text-amber-900 font-medium">
                  النتيجة: سارة تنجز مهامها وهي فخورة بنقاطها دون الحاجة لإعادة التذكير ٥ مرات!
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
