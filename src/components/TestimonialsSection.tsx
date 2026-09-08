import React from 'react';
import { TESTIMONIALS } from '../data/landingData';
import { Star, Quote, CheckCircle2, HeartHandshake } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/70 border border-amber-200 text-amber-900 text-xs font-semibold mb-4">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
            <span>تجارب أولياء الأمور في مرحلة الاختبار الأولي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4 font-heading">
            ماذا يقول الآباء والأمهات عن فكرة "نقاطي"؟
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            استمعنا لمئات الأمهات والآباء أثناء تصميم نقاطي لنضمن حلاً عملياً يلامس واقع كل أسرة.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between text-right"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Highlight Quote */}
                <h4 className="text-sm font-bold text-orange-700 mb-3 bg-orange-50/70 p-2 rounded-lg inline-block border border-orange-100">
                  "{item.highlight}"
                </h4>

                <p className="text-sm text-stone-700 leading-relaxed mb-6">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center">
                  {item.avatarText}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-stone-900">{item.author}</h5>
                  <span className="text-xs text-stone-500">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
