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
    "JANUARI '26", "FEBRUARI '26", "MARET '26", "APRIL '26", "MEI '26", "JUNI '26", 
    "JULI '26", "AGUSTUS '26", "SEPTEMBER '26", "OKTOBER '26", "NOVEMBER '26", "DESEMBER '26"
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
    }

    // 2. Ekstraksi Tahun Umum
    let tahunAsli = String(getVal(item, ["TAHUN"]) || "").trim();
    if (tahunAsli && tahunAsli !== "undefined") availableYears.add(tahunAsli);

    // 3. EKSTRAKSI NILAI DPP
    let nilaiRaw = getVal(item, ["NILAI DPP"]);
    if (nilaiRaw === undefined || nilaiRaw === null || String(nilaiRaw).trim() === "") {
      nilaiRaw = 0; 
    }
    const nilaiDPP = typeof nilaiRaw === "number" 
      ? nilaiRaw 
      : parseFloat(String(nilaiRaw).replace(/\./g, "").replace(/,/g, ".")) || 0;
    
    // 4. EKSTRAKSI JENIS PEKERJAAN
    const jenisPekerjaan = String(getVal(item, ["JENIS PEKERJAAN", "JENIS PEKE"]) || "").trim().toUpperCase();

    // 5. EKSTRAKSI BULAN PLAN GR (Kolom Y)
    const keys = Object.keys(item);
    const bpgKey = keys.find(k => {
      const upperK = k.toUpperCase();
      return upperK.includes("PLAN GR") || upperK.includes("PAN GR") || upperK.includes("BULAN PLAN");
    });
    
    const rawBulanPlanGr = bpgKey ? String(item[bpgKey]).trim().toUpperCase() : "";
    let bulanPlanGrStr = "TIDAK ADA BULAN";
    
    if (rawBulanPlanGr && rawBulanPlanGr !== "-" && !rawBulanPlanGr.includes("KOSONG")) {
      if (rawBulanPlanGr.includes("JAN") && rawBulanPlanGr.includes("26")) bulanPlanGrStr = "JANUARI '26";
      else if (rawBulanPlanGr.includes("FEB") && rawBulanPlanGr.includes("26")) bulanPlanGrStr = "FEBRUARI '26";
      else if (rawBulanPlanGr.includes("MAR") && rawBulanPlanGr.includes("26")) bulanPlanGrStr = "MARET '26";
      else if (rawBulanPlanGr.includes("APR") && rawBulanPlanGr.includes("26")) bulanPlanGrStr = "APRIL '26";
      else if ((rawBulanPlanGr.includes("MEI") || rawBulanPlanGr.includes("MAY")) && rawBulanPlanGr.includes("26")) bulanPlanGrStr = "MEI '26";
      else if (rawBulanPlanGr.includes("JUN") && rawBulanPlanGr.includes("26")) bulanPlanGrStr = "JUNI '26";
      else if (rawBulanPlanGr.includes("JUL") && rawBulanPlanGr.includes("26")) bulanPlanGrStr = "JULI '26";
      else if ((rawBulanPlanGr.includes("AGU") || rawBulanPlanGr.includes("AUG")) && rawBulanPlanGr.includes("26")) bulanPlanGrStr = "AGUSTUS '26";
      else if (rawBulanPlanGr.includes("SEP") && rawBulanPlanGr.includes("26")) bulanPlanGrStr = "SEPTEMBER '26";
      else if ((rawBulanPlanGr.includes("OKT") || rawBulanPlanGr.includes("OCT")) && rawBulanPlanGr.includes("26")) bulanPlanGrStr = "OKTOBER '26";
      else if (rawBulanPlanGr.includes("NOV") && rawBulanPlanGr.includes("26")) bulanPlanGrStr = "NOVEMBER '26";
      else if ((rawBulanPlanGr.includes("DES") || rawBulanPlanGr.includes("DEC")) && rawBulanPlanGr.includes("26")) bulanPlanGrStr = "DESEMBER '26";
    }

    // --- LOGIKA UTAMA PLAN GR ---
    const jpMap = jenisPekerjaan || "TIDAK ADA JENIS PEKERJAAN";
    if (!planGrMap[jpMap]) planGrMap[jpMap] = initPlanGrData();
    
    if (planGrMap[jpMap][bulanPlanGrStr] && branchKey) {
      if (selectedBranch === "ALL" || selectedBranch === branchKey.toUpperCase()) {
        planGrMap[jpMap][bulanPlanGrStr][branchKey].count++;
        planGrMap[jpMap][bulanPlanGrStr][branchKey].nilaiDPP += nilaiDPP;
      }
    }

    // ==========================================================
    // FILTER GLOBAL (DIPERBAIKI AGAR TIDAK MENENDANG DATA KOSONG)
    // ==========================================================
    if (selectedBranch !== "ALL" && branchKey !== "" && selectedBranch !== branchKey.toUpperCase()) return;
    if (selectedYear !== "ALL" && tahunAsli !== "" && tahunAsli !== "undefined" && tahunAsli !== selectedYear) return;

    // 6. EKSTRAKSI STATUS BERKAS & MITRA UNTUK TABEL LAINNYA
    const statusBerkas = String(getVal(item, ["STATUS BERKAS", "STATUS BERKAS 1", "STATUS TAGIHAN", "STATUS BEKE", "STATUS BEI"]) || "TIDAK ADA STATUS").trim().toUpperCase();
    const namaMitra = String(getVal(item, ["NAMA MITRA", "MITRA", "VENDOR"]) || "TIDAK ADA NAMA MITRA").trim().toUpperCase();

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

    if (branchKey) {
        // MAPPING MITRA
        if (!mitraMap[namaMitra]) mitraMap[namaMitra] = {};
        if (!mitraMap[namaMitra][statusBerkas]) mitraMap[namaMitra][statusBerkas] = { count: 0, nilaiDPP: 0 };
        mitraMap[namaMitra][statusBerkas].count++;
        mitraMap[namaMitra][statusBerkas].nilaiDPP += nilaiDPP;

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
    }
  });

  return {
    metrics: { totalValue, totalCount, cashBankValue, cashBankCount, dokOgpValue, dokOgpCount, cancelValue, cancelCount, nokDokValue, openDokValue },
    tables: { planGrMap, docBranchMap, docAreaMap, prio1Map, prio2Map, mitraMap },
    availableYears: Array.from(availableYears).sort(),
    availableMonths: availableMonths
  };
}