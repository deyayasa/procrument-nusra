export function formatNumberDot(num) {
  if (!num && num !== 0) return "0";
  const rounded = Math.round(Number(num) || 0);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function getDashboardSummary(data = [], selectedBranch = "ALL", selectedYear = "ALL", selectedMonth = "ALL") {
  let totalValue = 0, totalCount = 0;
  let cashBankValue = 0, cashBankCount = 0;
  let dokOgpValue = 0, dokOgpCount = 0;
  let cancelValue = 0, cancelCount = 0;
  let nokDokValue = 0, openDokValue = 0;

  const initData = () => ({ mataram: { count: 0, nilaiDPP: 0 }, kupang: { count: 0, nilaiDPP: 0 } });
  const availableMonths = [
    "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", 
    "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"
  ];
  const availableYears = new Set();

  const initPlanGrData = () => {
    const obj = {};
    availableMonths.forEach(m => { obj[m] = initData(); });
    obj["TIDAK ADA BULAN"] = initData(); 
    return obj;
  };

  const planGrMap = {
    'KONSTRUKSI': initPlanGrData(),
    'MS CAPEX': initPlanGrData(),
    'MS OPEX': initPlanGrData(),
    'PROVISIONING': initPlanGrData(),
    'SDI': initPlanGrData(),
    'KELOLA NTE': initPlanGrData(),
    'DISMANTLING': initPlanGrData()
  };

  const mitraMap = {}; 
  const docBranchMap = {
    'PEMBERKASAN MITRA': initData(), 'VERIFIKASI PROC BRANCH': initData(), 'REVISI PROC BRANCH': initData(),
    'SIRKULER TTD BRANCH': initData(), 'VERIFIKASI PROC REG': initData(), 'REVISI PROC REG': initData(), 'SIRKULER TTD REG': initData()
  };
  const docAreaMap = {
    'VERIFIKASI PROC AREA': initData(), 'REVISI PROC AREA': initData(), 'SIRKULER TTD AREA': initData(),
    'VERIFIKASI FINANCE AREA': initData(), 'REVISI FINANCE AREA': initData(), 'PROSES FINANCE HO': initData()
  };
  const prio1Map = {
    'VERIFIKASI PROC BRANCH': initData(), 'REVISI PROC BRANCH': initData(), 'SIRKULER TTD BRANCH': initData(),
    'VERIFIKASI PROC REG': initData(), 'REVISI PROC REG': initData(), 'SIRKULER TTD REG': initData(),
    'VERIFIKASI PROC AREA': initData(), 'REVISI PROC AREA': initData(), 'SIRKULER TTD AREA': initData(),
    'VERIFIKASI FINANCE AREA': initData(), 'REVISI FINANCE AREA': initData(), 'PROSES FINANCE HO': initData()
  };
  const prio2Map = {
    'PEKERJAAN OGP': initData(), 'OGP REKON': initData(), 'PEMBERKASAN MITRA': initData()
  };

  const dokOgpStatuses = [
    'OGP REKON', 'PEKERJAAN OGP', 'PEMBERKASAN MITRA', 'SIRKULER TTD BRANCH',
    'SIRKULER TTD REG', 'REVISI PROC BRANCH', 'REVISI PROC REG', 'VERIFIKASI PROC BRANCH',
    'VERIFIKASI PROC REG', 'PROSES FINANCE HO', 'REVISI PROC AREA', 'VERIFIKASI FINANCE AREA',
    'VERIFIKASI PROC AREA'
  ];

  const nokDokStatuses = ['OGP REKON', 'PEKERJAAN OGP'];
  const openDokStatuses = [
    'PEMBERKASAN MITRA', 'SIRKULER TTD BRANCH', 'SIRKULER TTD REG', 
    'REVISI PROC BRANCH', 'REVISI PROC REG', 'VERIFIKASI PROC BRANCH', 
    'VERIFIKASI PROC REG', 'PROSES FINANCE HO', 'REVISI PROC AREA', 
    'VERIFIKASI FINANCE AREA', 'VERIFIKASI PROC AREA'
  ];

  const safeData = Array.isArray(data) ? data : [];

  const getVal = (item, possibleKeys) => {
    const keys = Object.keys(item);
    for (let pk of possibleKeys) {
      const foundKey = keys.find(k => k.trim().toUpperCase() === pk.toUpperCase());
      if (foundKey) return item[foundKey];
    }
    return undefined;
  };

  safeData.forEach(item => {
    if (!item) return;

    // 1. Ekstraksi Branch 
    const branchAsli = String(getVal(item, ["BRANCH", "WITEL", "AREA", "LOKASI"]) || "").trim().toUpperCase();
    let branchKey = "";
    if (branchAsli === "MTR" || branchAsli.includes("MATARAM") || branchAsli === "NTB") {
      branchKey = "mataram";
    } else if (branchAsli === "KPG" || branchAsli.includes("KUPANG") || branchAsli === "NTT") {
      branchKey = "kupang";
    } else {
      return; 
    }

    // 2. Ekstraksi Tahun
    let tahunAsli = String(getVal(item, ["TAHUN"]) || "").trim();
    
    // 3. Ekstraksi Bulan Umum (Untuk metrik/chart lain)
    let bulanStr = "";
    const rawBulan = String(getVal(item, ["PERIODE", "BULAN", "BULAN TAGIHAN"]) || "").trim().toUpperCase();
    const rawTgl = String(getVal(item, ["TANGGAL", "DATE", "TGL TAGIHAN"]) || "").trim();

    if (rawBulan) {
      if (rawBulan.includes("JAN")) bulanStr = "JANUARI";
      else if (rawBulan.includes("FEB")) bulanStr = "FEBRUARI";
      else if (rawBulan.includes("MAR")) bulanStr = "MARET";
      else if (rawBulan.includes("APR")) bulanStr = "APRIL";
      else if (rawBulan.includes("MEI") || rawBulan.includes("MAY")) bulanStr = "MEI";
      else if (rawBulan.includes("JUN")) bulanStr = "JUNI";
      else if (rawBulan.includes("JUL")) bulanStr = "JULI";
      else if (rawBulan.includes("AGU") || rawBulan.includes("AUG")) bulanStr = "AGUSTUS";
      else if (rawBulan.includes("SEP")) bulanStr = "SEPTEMBER";
      else if (rawBulan.includes("OKT") || rawBulan.includes("OCT")) bulanStr = "OKTOBER";
      else if (rawBulan.includes("NOV")) bulanStr = "NOVEMBER";
      else if (rawBulan.includes("DES") || rawBulan.includes("DEC")) bulanStr = "DESEMBER";
      else if (!isNaN(rawBulan)) {
        const mNum = parseInt(rawBulan, 10);
        if (mNum >= 1 && mNum <= 12) bulanStr = availableMonths[mNum - 1];
      }
    }

    if (!bulanStr && rawTgl) {
      const parts = rawTgl.split(/[-/]/);
      if (parts.length === 3) {
        let mIdx = -1;
        if (parts[0].length === 4) {
          mIdx = parseInt(parts[1], 10) - 1;
          if (!tahunAsli) tahunAsli = parts[0];
        } else {
          mIdx = parseInt(parts[1], 10) - 1;
          if (!tahunAsli && parts[2].length === 4) tahunAsli = parts[2];
        }
        if (mIdx >= 0 && mIdx <= 11) bulanStr = availableMonths[mIdx];
      }
    }

    if (!bulanStr) bulanStr = "TIDAK ADA BULAN"; 
    if (tahunAsli && tahunAsli !== "undefined") availableYears.add(tahunAsli);

    // GLOBAL FILTER
    if (selectedBranch !== "ALL" && selectedBranch !== branchKey.toUpperCase()) return;
    if (selectedYear !== "ALL" && tahunAsli !== selectedYear) return;

    // 4. EKSTRAKSI NILAI DPP
    let nilaiRaw = getVal(item, ["NILAI DPP"]);
    if (nilaiRaw === undefined || nilaiRaw === null || String(nilaiRaw).trim() === "") {
      nilaiRaw = 0; 
    }

    const nilaiDPP = typeof nilaiRaw === "number" 
      ? nilaiRaw 
      : parseFloat(String(nilaiRaw).replace(/\./g, "").replace(/,/g, ".")) || 0;
    
    // 5. EKSTRAKSI STATUS BERKAS, JENIS PEKERJAAN & MITRA
    const statusBerkas = String(getVal(item, ["STATUS BERKAS", "STATUS BERKAS 1", "STATUS TAGIHAN", "STATUS BEKE", "STATUS BEI"]) || "TIDAK ADA STATUS").trim().toUpperCase();
    const jenisPekerjaan = String(getVal(item, ["JENIS PEKERJAAN", "JENIS PEKE"]) || "").trim().toUpperCase();
    const namaMitra = String(getVal(item, ["NAMA MITRA", "MITRA", "VENDOR"]) || "TIDAK ADA NAMA MITRA").trim().toUpperCase();

    // --- KHUSUS PLAN GR: EKSTRAKSI DARI KOLOM BULAN PLAN GR (Kolom Y) ---
    const keys = Object.keys(item);
    const bpgKey = keys.find(k => {
      const upperK = k.toUpperCase();
      return upperK.includes("PLAN GR") || upperK.includes("PAN GR") || upperK.includes("BULAN PLAN");
    });
    
    const rawBulanPlanGr = bpgKey ? String(item[bpgKey]).trim().toUpperCase() : "";
    let bulanPlanGrStr = "TIDAK ADA BULAN";
    
    if (rawBulanPlanGr && rawBulanPlanGr !== "-" && !rawBulanPlanGr.includes("KOSONG")) {
      if (rawBulanPlanGr.includes("JAN")) bulanPlanGrStr = "JANUARI";
      else if (rawBulanPlanGr.includes("FEB")) bulanPlanGrStr = "FEBRUARI";
      else if (rawBulanPlanGr.includes("MAR")) bulanPlanGrStr = "MARET";
      else if (rawBulanPlanGr.includes("APR")) bulanPlanGrStr = "APRIL";
      else if (rawBulanPlanGr.includes("MEI") || rawBulanPlanGr.includes("MAY")) bulanPlanGrStr = "MEI";
      else if (rawBulanPlanGr.includes("JUN")) bulanPlanGrStr = "JUNI";
      else if (rawBulanPlanGr.includes("JUL")) bulanPlanGrStr = "JULI";
      else if (rawBulanPlanGr.includes("AGU") || rawBulanPlanGr.includes("AUG")) bulanPlanGrStr = "AGUSTUS";
      else if (rawBulanPlanGr.includes("SEP")) bulanPlanGrStr = "SEPTEMBER";
      else if (rawBulanPlanGr.includes("OKT") || rawBulanPlanGr.includes("OCT")) bulanPlanGrStr = "OKTOBER";
      else if (rawBulanPlanGr.includes("NOV")) bulanPlanGrStr = "NOVEMBER";
      else if (rawBulanPlanGr.includes("DES") || rawBulanPlanGr.includes("DEC")) bulanPlanGrStr = "DESEMBER";
    }

    totalCount++;
    totalValue += nilaiDPP;

    // LOGIKA DONUT CHART
    if (statusBerkas.includes("CASH BANK")) {
      cashBankCount++;
      cashBankValue += nilaiDPP;
    } else if (statusBerkas.includes("CANCEL")) {
      cancelCount++;
      cancelValue += nilaiDPP;
    } else if (dokOgpStatuses.some(s => statusBerkas.includes(s))) {
      dokOgpCount++;
      dokOgpValue += nilaiDPP;
    }

    // LOGIKA BAR CHART
    if (nokDokStatuses.some(s => statusBerkas.includes(s))) {
      nokDokValue += nilaiDPP;
    } else if (openDokStatuses.some(s => statusBerkas.includes(s))) {
      openDokValue += nilaiDPP;
    }

    // MAPPING MITRA
    if (!mitraMap[namaMitra]) mitraMap[namaMitra] = {};
    if (!mitraMap[namaMitra][statusBerkas]) mitraMap[namaMitra][statusBerkas] = { count: 0, nilaiDPP: 0 };
    mitraMap[namaMitra][statusBerkas].count++;
    mitraMap[namaMitra][statusBerkas].nilaiDPP += nilaiDPP;

    // --- MAPPING PLAN GR KHUSUS BERDASARKAN BULAN PLAN GR (Kolom Y) ---
    if (jenisPekerjaan) {
      if (!planGrMap[jenisPekerjaan]) planGrMap[jenisPekerjaan] = initPlanGrData();
      if (planGrMap[jenisPekerjaan][bulanPlanGrStr]) {
        planGrMap[jenisPekerjaan][bulanPlanGrStr][branchKey].count++;
        planGrMap[jenisPekerjaan][bulanPlanGrStr][branchKey].nilaiDPP += nilaiDPP;
      }
    }

    // MAPPING TABEL DOKUMEN & PRIORITAS
    const matchKey = (mapObj) => {
      for (let key in mapObj) {
        if (statusBerkas === key || statusBerkas.includes(key)) {
          mapObj[key][branchKey].count++;
          mapObj[key][branchKey].nilaiDPP += nilaiDPP;
          break;
        }
      }
    };

    matchKey(docBranchMap);
    matchKey(docAreaMap);
    matchKey(prio1Map);
    matchKey(prio2Map);
  });

  return {
    metrics: { totalValue, totalCount, cashBankValue, cashBankCount, dokOgpValue, dokOgpCount, cancelValue, cancelCount, nokDokValue, openDokValue },
    tables: { planGrMap, docBranchMap, docAreaMap, prio1Map, prio2Map, mitraMap },
    availableYears: Array.from(availableYears).sort(),
    availableMonths: availableMonths
  };
}