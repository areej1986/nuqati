import React from 'react';
import { FEATURES_LIST } from '../data/landingData';
import {
  ListChecks,
  Coins,
  Award,
  ShieldCheck,
  Flame,
  Users,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const getFeatureIcon = (name: string) => {
    switch (name) {
      case 'ListChecks':
        return <ListChecks className="w-5 h-5 text-orange-600" />;
      case 'Coins':
        return <Coins className="w-5 h-5 text-amber-600" />;
      case 'Award':
        return <Award className="w-5 h-5 text-emerald-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-red-600" />;
      case 'Users':
        return <Users className="w-5 h-5 text-purple-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-orange-600" />;
    }
  };

  return (
    <section id="features" className="py-20 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مميزات عملية صُممت للآباء والأمهات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4 font-heading">
            كل ما تحتاجينه لإدارة مسؤوليات أبنائك بكل هدوء
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            تخلصي من الفوضى والجدال اليومي من خلال نظام رقمي متكامل يجمع بين البساطة والانضباط الذاتي.
          </p>
        </div>

        {/* Feature Grid (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_LIST.map((feat) => (
            <div
              key={feat.id}
              className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-7 border border-stone-200/80 hover:border-orange-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between text-right group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 shadow-2xs flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getFeatureIcon(feat.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                    {feat.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-stone-900 mb-2 font-heading">
                  {feat.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {/* Bottom subtle accent line */}
              <div className="pt-5 mt-4 border-t border-stone-200/60 flex items-center gap-1.5 text-xs font-medium text-orange-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                <span>مصمم لراحة بال الوالدين</span>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-right">
            <h4 className="text-lg font-bold text-stone-900 font-heading mb-1">
              💡 هل تعلمين؟
            </h4>
            <p className="text-sm text-stone-700 max-w-2xl leading-relaxed">
              الدراسات التربوية تثبت أن التعزيز الإيجابي الفوري (مثل النقاط) يزيد من التزام الأطفال بالمسؤوليات بنسبة تتجاوز ٧٠٪ مقارنة بأسلوب الترهيب أو الخصم.
            </p>
          </div>
          <a
            href="#early-access"
            className="shrink-0 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-sm transition-colors cursor-pointer"
          >
            احجزي مكانك الآن
          </a>
        </div>

      </div>
    </section>
  );
};
