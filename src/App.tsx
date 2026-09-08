/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { HowItWorks } from './components/HowItWorks';
import { ProductDemo } from './components/ProductDemo';
import { FeaturesSection } from './components/FeaturesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { EarlyAccessForm } from './components/EarlyAccessForm';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToEarlyAccess = () => {
    const el = document.getElementById('early-access');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDemo = () => {
    const el = document.getElementById('demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col selection:bg-orange-100 selection:text-orange-900">
      {/* Top sticky Navbar */}
      <Navbar onCtaClick={scrollToEarlyAccess} />

      {/* Main Landing Page Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onCtaClick={scrollToEarlyAccess}
          onExploreDemo={scrollToDemo}
        />

        {/* 2. Problem vs Solution Section */}
        <ProblemSection />

        {/* 3. How It Works (3 Steps) */}
        <HowItWorks />

        {/* 4. Interactive Live Product Demo (Parent & Child Views) */}
        <ProductDemo />

        {/* 5. Core Features Bento Section */}
        <FeaturesSection />

        {/* 6. Testimonials & Early Parent Feedback */}
        <TestimonialsSection />

        {/* 7. Early Access CTA & Signup Form */}
        <EarlyAccessForm />

        {/* 8. FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

