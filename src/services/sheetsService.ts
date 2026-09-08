import type { SignupFormData } from '../types';
import { supabase } from '../lib/supabase';

export interface SaveRegistrationResult {
  success: boolean;
}

export async function saveRegistration(
  formData: SignupFormData
): Promise<SaveRegistrationResult> {
  // تجهيز أعمار الأطفال
  const childAgesArray =
    Array.isArray(formData.childAges) && formData.childAges.length > 0
      ? formData.childAges
      : formData.childAge
        ? [formData.childAge]
        : [];

  const childAges = childAgesArray.join('، ');

  // تجهيز التحدي
  const isCustomChallenge =
    formData.mainChallenge === 'مشكلة أخرى';

  const challenge = isCustomChallenge
    ? formData.customChallenge?.trim()
      ? `مشكلة أخرى: ${formData.customChallenge.trim()}`
      : 'مشكلة أخرى'
    : (formData.mainChallenge || '').trim();

  // التحقق من البيانات المطلوبة
  // الاسم اختياري، لذلك لا نتحقق منه هنا
  if (!formData.contact?.trim()) {
    throw new Error('وسيلة التواصل مطلوبة.');
  }

  if (!childAges) {
    throw new Error('أعمار الأطفال مطلوبة.');
  }

  if (!challenge) {
    throw new Error('التحدي الرئيسي مطلوب.');
  }

  console.log('[Noqati] جاري حفظ التسجيل في Supabase...', {
    name: formData.fullName || '',
    contact: formData.contact,
    childAges,
    challenge,
  });

  const { error } = await supabase
    .from('registrations')
    .insert({
      name: formData.fullName?.trim() || '',
      contact: formData.contact.trim(),
      child_ages: childAges,
      challenge,
    });

  if (error) {
    console.error('[Noqati] خطأ Supabase:', error);

    throw new Error(
      error.message || 'تعذر حفظ التسجيل. يرجى المحاولة مرة أخرى.'
    );
  }

  console.log('[Noqati] تم حفظ التسجيل بنجاح في Supabase.');

  return {
    success: true,
  };
}