import { SignupFormData } from '../types';

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

export async function saveRegistrationToGoogleSheets(
  formData: SignupFormData
): Promise<{
  success: boolean;
  spreadsheetUrl: string;
  spreadsheetId: string;
}> {
  if (!APPS_SCRIPT_URL) {
    throw new Error('رابط Google Apps Script غير موجود.');
  }

  const payload = {
    name: formData.fullName?.trim() || '',
    contact: formData.contact?.trim() || '',
    childAges:
      formData.childAges && formData.childAges.length > 0
        ? formData.childAges.join('، ')
        : formData.childAge?.trim() || '',
    challenge:
      formData.mainChallenge === 'مشكلة أخرى'
        ? formData.customChallenge?.trim()
          ? `مشكلة أخرى: ${formData.customChallenge.trim()}`
          : 'مشكلة أخرى'
        : formData.mainChallenge || '',
  };

  const response = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`فشل إرسال التسجيل. HTTP ${response.status}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'تعذر حفظ التسجيل.');
  }

  return {
    success: true,
    spreadsheetUrl: '',
    spreadsheetId: '',
  };
}
