import axios from "axios";

const API_URL =
  "https://script.google.com/macros/s/AKfycby8VQ8OIzLkPTpPFGXyttP0eLyLoA8bSccUGxpJ35uwtwL9oCLFrhCtje0cLREq5Tzx4g/exec";
/**
 * ============================================================
 * GET DASHBOARD DATA
 * ============================================================
 *
 * Hanya mengambil DATA MENTAH dari Google Apps Script.
 *
 * JANGAN menggunakan:
 *
 * ?summary=true
 *
 * karena endpoint tersebut menghasilkan 404.
 */
export const getDashboardData = async () => {
  try {
    console.log("================================");
    console.log("GET DASHBOARD DATA");
    console.log("API URL:", API_URL);
    console.log("================================");

    const res = await axios.get(API_URL);

    console.log("========== API DEBUG ==========");
    console.log("API STATUS:", res.status);
    console.log("API DATA:", res.data);

    if (Array.isArray(res.data)) {
      console.log(
        "API TOTAL DATA:",
        res.data.length
      );

      const branches = [
        ...new Set(
          res.data
            .map((item) =>
              String(
                item?.BRANCH ?? ""
              )
                .trim()
                .toUpperCase()
            )
            .filter(Boolean)
        ),
      ];

      console.log(
        "API BRANCH:",
        branches
      );

      console.log(
        "SAMPLE DATA:",
        res.data.slice(0, 5)
      );
    }

    console.log("================================");

    return res.data;
  } catch (error) {
    console.error(
      "================================"
    );

    console.error(
      "ERROR GET DASHBOARD DATA"
    );

    console.error(
      "STATUS:",
      error.response?.status
    );

    console.error(
      "DATA:",
      error.response?.data
    );

    console.error(
      "MESSAGE:",
      error.message
    );

    console.error(
      "================================"
    );

    throw error;
  }
};

/**
 * ============================================================
 * LOG VERIFIKASI / DATA SKRIPSI
 * ============================================================
 *
 * Mengirimkan hasil verifikasi (akurasi OCR & PSNR) ke Google
 * Sheets via Apps Script endpoint. Digunakan untuk mengumpulkan
 * data evaluasi skripsi (sebelum vs sesudah penajaman Real-ESRGAN).
 */
export const logVerificationResult = async (payload) => {
  try {
    const res = await axios({
      method: "post",
      url: API_URL,
      headers: {
        "Content-Type": "text/plain;charset=utf-8", // dibutuhkan utk CORS Apps Script
      },
      data: JSON.stringify({ action: "logVerification", ...payload }),
    });
    return res.data;
  } catch (error) {
    console.error("ERROR LOG VERIFICATION:", error);
    throw error;
  }
};

/**
 * ============================================================
 * API URL
 * ============================================================
 *
 * Bisa digunakan untuk debugging jika diperlukan.
 */
export const getApiUrl = () => {
  return API_URL;
};

/**
 * ============================================================
 * DEFAULT EXPORT
 * ============================================================
 */

export default {
  getDashboardData,
  getApiUrl,
  logVerificationResult,
};
