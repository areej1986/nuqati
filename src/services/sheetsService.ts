/**
 * Google Sheets Service for Noqati App.
 * Handles OAuth authentication with Google Sheets scope via Firebase Auth,
 * creates or verifies a real Google Spreadsheet in the user's Google Drive,
 * and appends registration records directly via Google Sheets API v4.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { SignupFormData } from '../types';

export const SPREADSHEET_TITLE = 'نقاطي - تسجيلات قائمة الانتظار المبكرة';
export const SHEET_STORAGE_KEY = 'noqati_spreadsheet_id';

// In-memory token storage (per workspace integration security guidelines)
let memoryAccessToken: string | null = null;

function getFirebaseAuth() {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  return getAuth(app);
}

/**
 * Requests OAuth access token with Google Sheets scope using Firebase Auth.
 * Includes a timeout safeguard so the UI never hangs indefinitely.
 */
export async function getGoogleAccessToken(forcePrompt = false): Promise<string> {
  if (!forcePrompt && memoryAccessToken) {
    console.log('[Noqati 3/5] استخدام Access Token المخزن في الذاكرة.');
    return memoryAccessToken;
  }

  console.log('[Noqati 3/5] بدء طلب تفويض Google عبر Firebase Auth signInWithPopup (forcePrompt =', forcePrompt, ')...');

  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/spreadsheets');
  
  if (forcePrompt) {
    provider.setCustomParameters({ prompt: 'select_account' });
  }

  try {
    const authPromise = signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential?.accessToken) {
        throw new Error('لم يتم استخراج Google OAuth Access Token من نتيجة التفويض.');
      }
      return credential.accessToken;
    });

    // 45s safety timeout to ensure the UI never hangs if popup is stuck
    const timeoutPromise = new Promise<string>((_, reject) => {
      setTimeout(() => {
        reject(
          new Error('انتهت مهلة انتظار تفويض Google (45 ثانية). يرجى التأكد من السماح بالنوافذ المنبثقة (Popups) وإعادة المحاولة.')
        );
      }, 45000);
    });

    const token = await Promise.race([authPromise, timeoutPromise]);
    memoryAccessToken = token;

    console.log('[Noqati 3/5] تم استلام Access Token بنجاح! يبدأ بـ:', token.substring(0, 10) + '...');
    return token;
  } catch (err: unknown) {
    console.error('[Noqati 3/5] فشل الحصول على Access Token من Google:', err);
    
    // Format Firebase Auth errors into actionable Arabic descriptions
    if (typeof err === 'object' && err !== null && 'code' in err) {
      const fbErr = err as { code: string; message: string };
      if (fbErr.code === 'auth/popup-closed-by-user') {
        throw new Error('تم إغلاق نافذة موافقة Google قبل إكمال التفويض. يرجى النقر على زر التسجيل مرة أخرى والموافقة على الصلاحية لحفظ البيانات في Google Sheets.');
      }
      if (fbErr.code === 'auth/popup-blocked') {
        throw new Error('تم حظر النافذة المنبثقة بواسطة المتصفح. يرجى السماح بالنوافذ المنبثقة (Popups) لهذا الموقع ثم إعادة المحاولة.');
      }
      if (fbErr.code === 'auth/cancelled-popup-request') {
        throw new Error('تم إلغاء طلب التفويض لوجود نافذة أخرى قيد الفتح. يرجى إعادة المحاولة.');
      }
      throw new Error(`خطأ في مصادقة Google (${fbErr.code}): ${fbErr.message}`);
    }

    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(msg || 'تعذر استكمال المصادقة مع Google');
  }
}

/**
 * Creates or retrieves a verified Google Spreadsheet ID.
 * If cached, verifies it exists and is accessible.
 * If not found, creates a new real Spreadsheet in the user's Google Drive.
 */
export async function getOrCreateSpreadsheet(
  accessToken: string
): Promise<{ spreadsheetId: string; tabName: string }> {
  const cachedId = localStorage.getItem(SHEET_STORAGE_KEY);
  if (cachedId) {
    console.log('[Noqati 4/5] فحص جدول البيانات المخزن سابقاً بالمعرف:', cachedId);
    try {
      const verifyRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${cachedId}?fields=spreadsheetId,sheets.properties`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log('[Noqati 4/5] استجابة فحص الجدول السابق - HTTP Status:', verifyRes.status, verifyRes.statusText);

      if (verifyRes.ok) {
        const sheetData = await verifyRes.json();
        const tabName = sheetData.sheets?.[0]?.properties?.title || 'التسجيلات';
        console.log('[Noqati 4/5] تم تأكيد وجود الجدول بنجاح:', cachedId, 'اسم الورقة:', tabName);
        return { spreadsheetId: cachedId, tabName };
      } else if (verifyRes.status === 401) {
        console.error('[Noqati 4/5] رمز الوصول منتهي الصلاحية (401) أثناء فحص الجدول');
        throw new Error('401 UNAUTHENTICATED: انتهت صلاحية رمز الوصول لـ Google Sheets');
      } else if (verifyRes.status === 404 || verifyRes.status === 403) {
        console.warn('[Noqati 4/5] الجدول السابق غير متاح (404/403)، سيتم إنشاء جدول جديد.');
        localStorage.removeItem(SHEET_STORAGE_KEY);
      }
    } catch (verifyErr) {
      const errMsg = verifyErr instanceof Error ? verifyErr.message : String(verifyErr);
      if (errMsg.includes('401')) {
        throw verifyErr;
      }
      console.warn('[Noqati 4/5] تعذر التحقق من الجدول المخزن، سيتم إنشاء جدول جديد:', errMsg);
    }
  }

  // Create a real new spreadsheet in the user's Google Sheets account
  console.log('[Noqati 4/5] جاري إنشاء جدول Google Sheets حقيقي عبر POST https://sheets.googleapis.com/v4/spreadsheets...');
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: SPREADSHEET_TITLE,
      },
      sheets: [
        {
          properties: {
            title: 'التسجيلات',
            rightToLeft: true,
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'الاسم' } },
                    { userEnteredValue: { stringValue: 'رقم الواتساب أو البريد الإلكتروني' } },
                    { userEnteredValue: { stringValue: 'عمر الطفل' } },
                    { userEnteredValue: { stringValue: 'أكبر تحدي' } },
                    { userEnteredValue: { stringValue: 'تاريخ ووقت التسجيل' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  });

  console.log('[Noqati 4/5] استجابة إنشاء الجدول - HTTP Status:', createRes.status, createRes.statusText);

  if (!createRes.ok) {
    const errorBody = await createRes.text();
    console.error('[Noqati 4/5] فشل إنشاء الجدول! كود الخطأ:', createRes.status, 'نص الاستجابة:', errorBody);
    let parsedMessage = errorBody;
    try {
      const json = JSON.parse(errorBody);
      parsedMessage = json.error?.message || errorBody;
    } catch {
      // ignore
    }
    throw new Error(`تعذر إنشاء جدول Google Sheets (${createRes.status}): ${parsedMessage}`);
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId as string;
  const tabName = sheetData.sheets?.[0]?.properties?.title || 'التسجيلات';

  console.log('[Noqati 4/5] تم إنشاء جدول Google Sheets بنجاح! ID:', spreadsheetId);

  try {
    localStorage.setItem(SHEET_STORAGE_KEY, spreadsheetId);
  } catch {
    // ignore
  }

  return { spreadsheetId, tabName };
}

/**
 * Appends a new signup record row to the real Google Spreadsheet using Google Sheets API v4.
 */
export async function appendSignupToSheet(
  formData: SignupFormData,
  accessToken: string
): Promise<{ success: boolean; spreadsheetUrl: string; spreadsheetId: string }> {
  let { spreadsheetId, tabName } = await getOrCreateSpreadsheet(accessToken);

  // Formatted Arabic date & time (e.g. 4 سبتمبر 2026، 06:15 م)
  const formattedDate = new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(new Date());

  // Child ages display: joined clearly if multiple (e.g. "٤–٦ سنوات، ١٠–١٢ سنة")
  const ageDisplay =
    formData.childAge?.trim() ||
    (formData.childAges && formData.childAges.length > 0
      ? formData.childAges.join('، ')
      : 'غير محدد');

  // Challenge display: if "مشكلة أخرى", save the custom text clearly
  const challengeDisplay =
    formData.mainChallenge === 'مشكلة أخرى'
      ? formData.customChallenge?.trim()
        ? `مشكلة أخرى: ${formData.customChallenge.trim()}`
        : 'مشكلة أخرى'
      : formData.mainChallenge || 'غير محدد';

  // Row values mapped exactly to requested columns:
  // الاسم، رقم الواتساب أو البريد الإلكتروني، عمر الطفل، أكبر تحدي، وتاريخ ووقت التسجيل
  const rowValues = [
    formData.fullName?.trim() || 'ولي أمر',
    formData.contact.trim(),
    ageDisplay,
    challengeDisplay,
    formattedDate,
  ];

  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  console.log('[Noqati 5/5] جاري إرسال طلب إضافة الصف POST إلى:', appendUrl);
  console.log('[Noqati 5/5] قيم الصف المرسلة:', rowValues);

  let appendRes = await fetch(appendUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range: tabName,
      majorDimension: 'ROWS',
      values: [rowValues],
    }),
  });

  console.log('[Noqati 5/5] استجابة إضافة الصف - HTTP Status:', appendRes.status, appendRes.statusText);

  // If 404 or 400 (e.g. old sheet was removed), recreate sheet and retry once
  if (appendRes.status === 404) {
    console.warn('[Noqati 5/5] تم استلام 404، جاري إعادة إنشاء الجدول وإعادة محاولة الإضافة...');
    localStorage.removeItem(SHEET_STORAGE_KEY);
    const fresh = await getOrCreateSpreadsheet(accessToken);
    spreadsheetId = fresh.spreadsheetId;
    tabName = fresh.tabName;

    const retryUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    appendRes = await fetch(retryUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range: tabName,
        majorDimension: 'ROWS',
        values: [rowValues],
      }),
    });
    console.log('[Noqati 5/5] استجابة إعادة المحاولة - HTTP Status:', appendRes.status, appendRes.statusText);
  }

  if (!appendRes.ok) {
    const errorBody = await appendRes.text();
    console.error('[Noqati 5/5] فشل إضافة الصف! استجابة Google API:', errorBody);
    let parsedMessage = errorBody;
    try {
      const json = JSON.parse(errorBody);
      parsedMessage = json.error?.message || errorBody;
    } catch {
      // ignore
    }
    throw new Error(`خطأ في Google Sheets API أثناء كتابة الصف (${appendRes.status}): ${parsedMessage}`);
  }

  const responseJson = await appendRes.json();
  console.log('[Noqati 5/5] تم إضافة الصف بنجاح إلى جدول Google Sheets!', responseJson);

  return {
    success: true,
    spreadsheetId,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
  };
}

/**
 * Main entry function called upon clicking "انضمي لقائمة الانتظار مجاناً".
 * Authenticates with Google, writes the row, and returns the spreadsheet URL.
 */
export async function saveRegistrationToGoogleSheets(
  formData: SignupFormData
): Promise<{ success: boolean; spreadsheetUrl: string; spreadsheetId: string }> {
  console.log('[Noqati 2/5] استدعاء saveRegistrationToGoogleSheets');

  let token = await getGoogleAccessToken(false);

  try {
    return await appendSignupToSheet(formData, token);
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.warn('[Noqati] خطأ أثناء الحفظ:', errMsg);

    // If token expired, clear cache and re-prompt user
    if (errMsg.includes('401') || errMsg.includes('UNAUTHENTICATED') || errMsg.includes('ACCESS_TOKEN_EXPIRED')) {
      console.log('[Noqati] انتهت صلاحية Access Token، جاري طلب تفويض جديد...');
      memoryAccessToken = null;
      token = await getGoogleAccessToken(true);
      return await appendSignupToSheet(formData, token);
    }
    throw err;
  }
}
