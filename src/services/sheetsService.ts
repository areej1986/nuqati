/**
 * Google Sheets Service for saving early-access waitlist signups.
 * Handles OAuth authentication client-side with Google Identity Services (GIS),
 * automatically locates or creates the "نقاطي - تسجيلات الوصول المبكر" spreadsheet,
 * and appends new registration rows directly to the sheet.
 */

import { SignupFormData } from '../types';

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initTokenClient: (config: {
            client_id?: string;
            scope: string;
            callback: (response: { access_token?: string; error?: string }) => void;
            error_callback?: (err: unknown) => void;
          }) => {
            requestAccessToken: (overrideConfig?: { prompt?: string }) => void;
          };
        };
      };
    };
  }
}

const SPREADSHEET_TITLE = 'نقاطي - تسجيلات الوصول المبكر';
const SHEET_STORAGE_KEY = 'noqati_sheet_id';

/**
 * Ensures Google Identity Services (GSI) script is loaded
 */
export function loadGsiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.oauth2) {
      resolve();
      return;
    }

    const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', (e) => reject(e));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
}

/**
 * Requests OAuth access token for Google Spreadsheets
 */
export async function getGoogleAccessToken(): Promise<string> {
  await loadGsiScript();

  return new Promise((resolve, reject) => {
    try {
      if (!window.google?.accounts?.oauth2) {
        reject(new Error('Google OAuth client is not available in window.google'));
        return;
      }

      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        callback: (resp) => {
          if (resp.error) {
            reject(new Error(resp.error));
          } else if (resp.access_token) {
            resolve(resp.access_token);
          } else {
            reject(new Error('No access token received from Google Auth'));
          }
        },
        error_callback: (err) => {
          reject(err);
        }
      });

      tokenClient.requestAccessToken({ prompt: '' });
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Creates or gets the Google Spreadsheet ID for storing registrations
 */
export async function getOrCreateSpreadsheet(accessToken: string): Promise<string> {
  const cachedId = localStorage.getItem(SHEET_STORAGE_KEY);
  if (cachedId) {
    // Verify it still exists and is accessible
    try {
      const verifyRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${cachedId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (verifyRes.ok) {
        return cachedId;
      }
    } catch {
      // If cached ID is invalid, continue to create a new one
    }
  }

  // Create new spreadsheet with RTL and clean Arabic headers
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: SPREADSHEET_TITLE,
        locale: 'ar_SA',
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
                    { userEnteredValue: { stringValue: 'رقم التسجيل' } },
                    { userEnteredValue: { stringValue: 'تاريخ ووقت التسجيل' } },
                    { userEnteredValue: { stringValue: 'رقم الواتساب أو البريد' } },
                    { userEnteredValue: { stringValue: 'اسم الوالد/الوالدة' } },
                    { userEnteredValue: { stringValue: 'الفئة العمرية للطفل' } },
                    { userEnteredValue: { stringValue: 'أكبر تحدٍ يواجه الأسرة' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`فشل إنشاء جدول البيانات: ${errorText}`);
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;
  if (spreadsheetId) {
    localStorage.setItem(SHEET_STORAGE_KEY, spreadsheetId);
  }
  return spreadsheetId;
}

/**
 * Appends a new signup record row to the Google Spreadsheet
 */
export async function appendSignupToSheet(
  formData: SignupFormData,
  waitlistNumber: number,
  accessToken: string
): Promise<{ success: boolean; spreadsheetUrl: string }> {
  const spreadsheetId = await getOrCreateSpreadsheet(accessToken);

  const formattedDate = new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(new Date());

  const rowValues = [
    `#${waitlistNumber}`,
    formattedDate,
    formData.contact.trim(),
    formData.fullName?.trim() || 'غير محدد',
    formData.childAge || 'غير محدد',
    formData.mainChallenge || 'غير محدد',
  ];

  const appendRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/التسجيلات!A:F:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [rowValues],
      }),
    }
  );

  if (!appendRes.ok) {
    const errorText = await appendRes.text();
    throw new Error(`فشل في حفظ البيانات في Google Sheets: ${errorText}`);
  }

  return {
    success: true,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
  };
}
