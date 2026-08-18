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

  const planGrMap = {
    'KONSTRUKSI': {}, 'MS CAPEX': {}, 'MS OPEX': {}, 'PROVISIONING': {},
    'SDI': {}, 'KELOLA NTE': {}, 'DISMANTLING': {}
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
    if (branchAsli === "MTR" || branchAsli.includes("MATARAM") || branchAsli === "NTB") branchKey = "mataram";
    else if (branchAsli === "KPG" || branchAsli.includes("KUPANG") || branchAsli === "NTT") branchKey = "kupang";

    // 2. Ekstraksi Tahun Umum
    let tahunAsli = String(getVal(item, ["TAHUN"]) || "").trim();
    if (tahunAsli && tahunAsli !== "undefined") {
        if (tahunAsli.endsWith(".0")) tahunAsli = tahunAsli.replace(".0", "");
        availableYears.add(tahunAsli);
    }

    // 3. EKSTRAKSI NILAI DPP
    let nilaiRaw = getVal(item, ["NILAI DPP"]);
    if (nilaiRaw === undefined || nilaiRaw === null || String(nilaiRaw).trim() === "") nilaiRaw = 0; 
    const nilaiDPP = typeof nilaiRaw === "number" ? nilaiRaw : parseFloat(String(nilaiRaw).replace(/\./g, "").replace(/,/g, ".")) || 0;
    
    // 4. EKSTRAKSI JENIS PEKERJAAN
    const jenisPekerjaan = String(getVal(item, ["JENIS PEKERJAAN", "JENIS PEKE"]) || "").trim().toUpperCase();

    // 5. EKSTRAKSI TAHUN PLAN GR & BULAN PLAN GR DARI KOLOM MASING-MASING
    const keys = Object.keys(item);
    
    // Tarik TAHUN PLAN GR
    const tpgKey = keys.find(k => k.toUpperCase().includes("TAHUN PLAN GR"));
    let tahunPlanGrStr = tpgKey && item[tpgKey] ? String(item[tpgKey]).trim() : "";
    if (!tahunPlanGrStr || tahunPlanGrStr === "-" || tahunPlanGrStr.includes("KOSONG")) {
        tahunPlanGrStr = tahunAsli || "TIDAK ADA TAHUN";
    } else if (tahunPlanGrStr.endsWith(".0")) {
        tahunPlanGrStr = tahunPlanGrStr.replace(".0", "");
    }
    if (tahunPlanGrStr !== "TIDAK ADA TAHUN") availableYears.add(tahunPlanGrStr);

    // Tarik BULAN PLAN GR
    const bpgKey = keys.find(k => {
      const upperK = k.toUpperCase();
      return upperK.includes("PLAN GR") && !upperK.includes("TAHUN");
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

    // --- LOGIKA UTAMA PLAN GR (GABUNGAN TAHUN DAN BULAN) ---
    const planGrKey = `${tahunPlanGrStr}_${bulanPlanGrStr}`; // Contoh hasil: "2026_JANUARI"
    const jpMap = jenisPekerjaan || "TIDAK ADA JENIS PEKERJAAN";
    
    if (!planGrMap[jpMap]) planGrMap[jpMap] = {};
    if (!planGrMap[jpMap][planGrKey]) planGrMap[jpMap][planGrKey] = initData();
    
    if (branchKey) {
      if (selectedBranch === "ALL" || selectedBranch === branchKey.toUpperCase()) {
        planGrMap[jpMap][planGrKey][branchKey].count++;
        planGrMap[jpMap][planGrKey][branchKey].nilaiDPP += nilaiDPP;
      }
    }

    // ==========================================================
    // FILTER GLOBAL UNTUK DASHBOARD SISANYA
    // ==========================================================
    if (selectedBranch !== "ALL" && branchKey !== "" && selectedBranch !== branchKey.toUpperCase()) return;
    if (selectedYear !== "ALL" && tahunAsli !== "" && tahunAsli !== "undefined" && tahunAsli !== selectedYear) return;

    // 6. EKSTRAKSI STATUS BERKAS & MITRA UNTUK TABEL LAINNYA
    const statusBerkas = String(getVal(item, ["STATUS BERKAS", "STATUS BERKAS 1", "STATUS TAGIHAN", "STATUS BEKE", "STATUS BEI"]) || "TIDAK ADA STATUS").trim().toUpperCase();
    const namaMitra = String(getVal(item, ["NAMA MITRA", "MITRA", "VENDOR"]) || "TIDAK ADA NAMA MITRA").trim().toUpperCase();

    totalCount++;
    totalValue += nilaiDPP;

    if (statusBerkas.includes("CASH BANK")) { cashBankCount++; cashBankValue += nilaiDPP; } 
    else if (statusBerkas.includes("CANCEL")) { cancelCount++; cancelValue += nilaiDPP; } 
    else if (dokOgpStatuses.some(s => statusBerkas.includes(s))) { dokOgpCount++; dokOgpValue += nilaiDPP; }

    if (nokDokStatuses.some(s => statusBerkas.includes(s))) nokDokValue += nilaiDPP;
    else if (openDokStatuses.some(s => statusBerkas.includes(s))) openDokValue += nilaiDPP;

    if (branchKey) {
        if (!mitraMap[namaMitra]) mitraMap[namaMitra] = {};
        if (!mitraMap[namaMitra][statusBerkas]) mitraMap[namaMitra][statusBerkas] = { count: 0, nilaiDPP: 0 };
        mitraMap[namaMitra][statusBerkas].count++;
        mitraMap[namaMitra][statusBerkas].nilaiDPP += nilaiDPP;

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