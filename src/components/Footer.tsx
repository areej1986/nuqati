import React from 'react';
import { Sparkles, Heart, Shield, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800 text-right">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight font-heading">
                نِقاطي
              </span>
            </div>
            
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              منصة وتطبيق رقمي ذكي يساعد الوالدين على بناء عادات مستدامة لأطفالهم من خلال مهام مجدولة، نقاط تحفيزية، ومكافآت قيّمة بدون جدال أو صراخ.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-stone-800 border border-stone-700 text-xs text-stone-300">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>مبني على أسس التربية الإيجابية الحديثة</span>
            </div>
          </div>

          {/* Quick Navigation (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              أقسام الصفحة
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <a href="#problem" className="hover:text-orange-400 transition-colors">
                  المعاناة والحل
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-orange-400 transition-colors">
                  كيف يعمل نقاطي؟
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-orange-400 transition-colors">
                  المميزات الرئيسية
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-orange-400 transition-colors">
                  معاينة حية للنظام
                </a>
              </li>
              <li>
                <a href="#early-access" className="hover:text-orange-400 transition-colors">
                  قائمة الانتظار والوصول المبكر
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-orange-400 transition-colors">
                  الأسئلة الشائعة
                </a>
              </li>
            </ul>
          </div>

          {/* Early Access Action (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              الوصول المبكر
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              احجزي مقعدك الآن لتكوني أول من يجرب التطبيق مع اشتراك ٣ أشهر مجانية.
            </p>
            <a
              href="#early-access"
              className="inline-block w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs text-center transition-colors shadow-sm cursor-pointer"
            >
              سجلي اهتمامك الآن
            </a>
          </div>

        </div>

        {/* Bottom copyright & scroll-to-top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1">
            <span>صُنع بحب</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-1" />
            <span>لدعم الأمهات والآباء في كل مكان © {new Date().getFullYear()} نقاطي.</span>
          </div>

          <button
            onClick={scrollToTop}
            id="scroll-to-top-btn"
            className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>العودة للأعلى</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
