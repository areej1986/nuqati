import React from 'react';
import { PARENT_PAIN_POINTS, NOQATI_SOLUTION_POINTS } from '../data/landingData';
import { AlertCircle, CheckCircle2, RefreshCw, VolumeX, Sparkles, ArrowDown } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="problem" className="py-20 bg-white border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold mb-4">
            <AlertCircle className="w-3.5 h-3.5 text-stone-500" />
            <span>المعاناة اليومية في كل بيت</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4 font-heading">
            هل تعبتِ من تكرار نفس الطلبات كل يوم؟
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            بين الواجبات المدرسية، ترتيب الغرفة، وتنظيف الأسنان... يتحول يومك إلى سلسلة لا تنتهي من الملاحقة والتذكير المرهق لك ولأعصابك.
          </p>
        </div>

        {/* Contrast Grid: The Struggle vs The Calm */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column (The Painful Old Routine) */}
          <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200/90 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-stone-300" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-sm">
                    ✕
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 font-heading">
                    الروتين المعتاد المرهق
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-stone-200/70 text-stone-600">
                  قبل نقاطي
                </span>
              </div>

              <div className="space-y-4 mb-8">
                {PARENT_PAIN_POINTS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs text-right"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-stone-400 mt-2 shrink-0" />
                      <div>
                        <h4 className="text-base font-bold text-stone-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-stone-600 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom summary of struggle */}
            <div className="p-4 rounded-xl bg-stone-200/60 border border-stone-300/60 text-right">
              <p className="text-xs sm:text-sm text-stone-700 font-medium">
                ⚡ <strong>النتيجة:</strong> طاقة مهدورة، مشاعر إحباط، وتوتر مستمر في البيت بدون نتائج حقيقية.
              </p>
            </div>
          </div>

          {/* Right Column (The Solution with Noqati) */}
          <div className="bg-gradient-to-b from-orange-50/70 via-amber-50/40 to-white rounded-2xl p-6 sm:p-8 border-2 border-orange-300 shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-orange-500" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    ✓
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 font-heading">
                    يوم هادئ ومحفز مع "نقاطي"
                  </h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-orange-100 text-orange-800 border border-orange-200">
                  التربية بالتحفيز
                </span>
              </div>

              <div className="space-y-4 mb-8">
                {NOQATI_SOLUTION_POINTS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-orange-200/80 shadow-2xs text-right"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-stone-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-stone-600 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom summary of peace */}
            <div className="p-4 rounded-xl bg-orange-100/70 border border-orange-200 text-right">
              <p className="text-xs sm:text-sm text-orange-950 font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
                <span>
                  <strong>النتيجة:</strong> بيت هادئ بدون صراخ، وطفل فخور بمسؤولياته وينتظر مكافأته بحماس!
                </span>
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
