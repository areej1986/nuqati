import React, { useState } from 'react';
import { FAQ_LIST } from '../data/landingData';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-white border-t border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
            <span>إجابات واضحة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4 font-heading">
            الأسئلة الأكثر شيوعاً
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            كل ما يدور في ذهنك عن آلية عمل تطبيق "نقاطي" وكيف يساعد أسرتك.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_LIST.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden text-right ${
                  isOpen
                    ? 'bg-[#FAF8F5] border-orange-300 shadow-xs'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  id={`faq-btn-${faq.id}`}
                  className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-stone-900 focus:outline-hidden cursor-pointer"
                >
                  <span className="font-heading">{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-orange-100 text-orange-700 rotate-180' : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-0 text-sm sm:text-base text-stone-600 leading-relaxed border-t border-stone-200/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Direct contact hint */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-stone-50 border border-stone-200/70 max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-stone-800 font-bold text-sm mb-1">
            <MessageSquare className="w-4 h-4 text-orange-600" />
            <span>لديك استفسار أو اقتراح خاص؟</span>
          </div>
          <p className="text-xs text-stone-600 mb-3">
            يسعدنا جداً سماع رأيك والميزات التي تتمنين وجودها في التطبيق.
          </p>
          <a
            href="#early-access"
            className="text-xs font-bold text-orange-600 hover:text-orange-700 underline underline-offset-4"
          >
            سجلي اهتمامك واكتبي ملاحظتك في النموذج ↑
          </a>
        </div>

      </div>
    </section>
  );
};
