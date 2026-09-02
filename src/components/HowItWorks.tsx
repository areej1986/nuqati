import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/landingData';
import { CheckSquare, Sparkles, Gift, ArrowLeft, Lightbulb } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'CheckSquare':
        return <CheckSquare className="w-6 h-6 text-orange-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-600" />;
      case 'Gift':
        return <Gift className="w-6 h-6 text-emerald-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-orange-600" />;
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100/70 border border-orange-200 text-orange-800 text-xs font-semibold mb-4">
            <span>البساطة والفاعلية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4 font-heading">
            كيف يعمل "نقاطي" في ٣ خطوات سهلة؟
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            نظام متكامل ومجرب يعتمد على علم النفس السلوكي والتحفيز الإيجابي لبناء العادات الحميدة.
          </p>
        </div>

        {/* 3 Step Cards with Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative group"
            >
              {/* Step Number Top Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getIcon(step.iconName)}
                </div>
                <span className="text-3xl font-extrabold text-stone-300 font-heading">
                  {step.number}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6 text-right">
                <h3 className="text-xl font-bold text-stone-900 mb-1 font-heading">
                  {step.title}
                </h3>
                <span className="text-xs font-semibold text-orange-600 block mb-3">
                  {step.subtitle}
                </span>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Real World Example Box */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-right mt-auto">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 mb-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>تطبيق عملي:</span>
                </div>
                <p className="text-xs text-stone-600">
                  {step.example}
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* Summary Flow Ribbon */}
        <div className="mt-12 bg-white rounded-2xl p-5 border border-stone-200 shadow-xs max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-4 text-center sm:text-right">
          <div className="flex items-center gap-2 text-stone-800 font-bold text-sm sm:text-base">
            <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs">١</span>
            <span>حددي المهمة</span>
          </div>
          <ArrowLeft className="w-4 h-4 text-stone-400 rotate-90 sm:rotate-0" />
          <div className="flex items-center gap-2 text-stone-800 font-bold text-sm sm:text-base">
            <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs">٢</span>
            <span>طفلك ينجزها</span>
          </div>
          <ArrowLeft className="w-4 h-4 text-stone-400 rotate-90 sm:rotate-0" />
          <div className="flex items-center gap-2 text-stone-800 font-bold text-sm sm:text-base">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">٣</span>
            <span>يحصل على نقاط ومكافآت</span>
          </div>
        </div>

      </div>
    </section>
  );
};
