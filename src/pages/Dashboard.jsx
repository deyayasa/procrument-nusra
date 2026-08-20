import React, { useState } from 'react';
import useDashboard from "../hooks/useDashboard.js"; 
import { formatNumberDot } from "../utils/dashboardCalculations.js"; 

const Dashboard = () => {
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedPlanGrYear, setSelectedPlanGrYear] = useState('ALL');
  const [selectedMonth, setSelectedMonth] = useState('ALL');
  
  const { summary, loading, error } = useDashboard(selectedBranch, selectedYear, selectedMonth);

  const metrics = summary?.metrics || {};
  const tables = summary?.tables || {};
  const availableYears = summary?.availableYears || [];
  
  const availableMonths = [
    "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", 
    "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"
  ];

  const {
    totalValue = 0, totalCount = 0,
    cashBankValue = 0, cashBankCount = 0,
    dokOgpValue = 0, dokOgpCount = 0,
    cancelValue = 0, cancelCount = 0,
    nokDokValue = 0, openDokValue = 0
  } = metrics;

  // Donut Percentage
  const chartTotal = cashBankValue + dokOgpValue + cancelValue;
  const pctCash = chartTotal > 0 ? (cashBankValue / chartTotal) * 100 : 0;
  const pctOgp = chartTotal > 0 ? (dokOgpValue / chartTotal) * 100 : 0;
  const pctCancel = chartTotal > 0 ? (cancelValue / chartTotal) * 100 : 0;
  
  const endCash = pctCash;
  const endOgp = endCash + pctOgp;

  const barTotalOpen = nokDokValue + openDokValue; 
  const barNokDok = nokDokValue; 
  const barOpenDok = openDokValue; 
  const pctNokDok = barTotalOpen > 0 ? (barNokDok / barTotalOpen) * 100 : 0;
  const pctOpenDok = barTotalOpen > 0 ? (barOpenDok / barTotalOpen) * 100 : 0;

  const showMtr = selectedBranch === 'ALL' || selectedBranch === 'MATARAM';
  const showKpg = selectedBranch === 'ALL' || selectedBranch === 'KUPANG';
  const showFls = selectedBranch === 'ALL' || selectedBranch === 'FLORES';

  const renderDynamicTableRows = (mapData) => {
    let grandMtrC = 0, grandMtrV = 0;
    let grandKpgC = 0, grandKpgV = 0;
    let grandFlsC = 0, grandFlsV = 0;
    const safeMap = mapData || {};
    
    const rows = Object.keys(safeMap).map((status, idx) => {
      const item = safeMap[status] || { 
        mataram: { count: 0, nilaiDPP: 0 }, 
        kupang: { count: 0, nilaiDPP: 0 },
        flores: { count: 0, nilaiDPP: 0 }
      };
      grandMtrC += item.mataram.count; grandMtrV += item.mataram.nilaiDPP;
      grandKpgC += item.kupang.count; grandKpgV += item.kupang.nilaiDPP;
      grandFlsC += (item.flores?.count || 0); grandFlsV += (item.flores?.nilaiDPP || 0);
      
      return (
        <tr key={idx} className="border-b border-slate-200/50 hover:bg-white/60 text-[10px] text-slate-700 font-semibold bg-white/30 whitespace-nowrap transition-all duration-300">
          <td className="py-2 px-3 border-r border-slate-200/50 uppercase">{status}</td>
          {showMtr && (
            <>
              <td className="py-2 px-1 text-center border-r border-slate-200/50">{item.mataram.count}</td>
              <td className="py-2 px-2 text-right border-r border-slate-200/50 text-slate-800">{item.mataram.nilaiDPP > 0 ? formatNumberDot(item.mataram.nilaiDPP) : '0'}</td>
            </>
          )}
          {showKpg && (
            <>
              <td className="py-2 px-1 text-center border-r border-slate-200/50">{item.kupang.count}</td>
              <td className="py-2 px-2 text-right border-r border-slate-200/50 text-slate-800">{item.kupang.nilaiDPP > 0 ? formatNumberDot(item.kupang.nilaiDPP) : '0'}</td>
            </>
          )}
          {showFls && (
            <>
              <td className="py-2 px-1 text-center border-r border-slate-200/50">{item.flores?.count || 0}</td>
              <td className="py-2 px-2 text-right border-slate-200/50 text-slate-800">{(item.flores?.nilaiDPP || 0) > 0 ? formatNumberDot(item.flores.nilaiDPP) : '0'}</td>
            </>
          )}
        </tr>
      );
    });

    return { rows, grandMtrC, grandMtrV, grandKpgC, grandKpgV, grandFlsC, grandFlsV };
  };

  // Plan GR Calculation
  const planGrMap = tables.planGrMap || {};
  const defaultJpList = ['KONSTRUKSI', 'MS CAPEX', 'MS OPEX', 'PROVISIONING', 'SDI', 'KELOLA NTE', 'DISMANTLING'];
  const jenisPekerjaanList = [...defaultJpList];
  Object.keys(planGrMap).forEach(k => { if (!jenisPekerjaanList.includes(k) && k !== '') jenisPekerjaanList.push(k); });
  
  let grandMtrC_GR = 0, grandMtrV_GR = 0;
  let grandKpgC_GR = 0, grandKpgV_GR = 0;
  let grandFlsC_GR = 0, grandFlsV_GR = 0;

  const planGrRows = jenisPekerjaanList.map((jp) => {
    const rowMonths = planGrMap[jp] || {};
    let mtrC = 0, mtrV = 0, kpgC = 0, kpgV = 0, flsC = 0, flsV = 0;

    Object.keys(rowMonths).forEach(key => { 
      const [kYear, kMonth] = key.split('_');
      let matchYear = selectedPlanGrYear === 'ALL' || kYear === selectedPlanGrYear;
      let matchMonth = selectedMonth === 'ALL' || kMonth === selectedMonth;

      if (matchYear && matchMonth) {
        const mData = rowMonths[key];
        mtrC += mData.mataram.count;
        mtrV += mData.mataram.nilaiDPP;
        kpgC += mData.kupang.count;
        kpgV += mData.kupang.nilaiDPP;
        flsC += (mData.flores?.count || 0);
        flsV += (mData.flores?.nilaiDPP || 0);
      }
    });

    grandMtrC_GR += mtrC; grandMtrV_GR += mtrV;
    grandKpgC_GR += kpgC; grandKpgV_GR += kpgV;
    grandFlsC_GR += flsC; grandFlsV_GR += flsV;

    const rowTotalC = mtrC + kpgC + flsC;
    const rowTotalV = mtrV + kpgV + flsV;

    return (
      <tr key={jp} className="border-b border-slate-200/50 hover:bg-white/60 text-[11px] text-slate-700 font-semibold bg-white/30 transition-colors whitespace-nowrap">
        <td className="py-2 px-3 border-r border-slate-200/50 uppercase">{jp}</td>
        <td className="py-2 px-3 text-center border-r border-slate-200/50">{mtrC}</td>
        <td className="py-2 px-3 text-right border-r border-slate-200/50 text-slate-800">{mtrV > 0 ? formatNumberDot(mtrV) : '0'}</td>
        <td className="py-2 px-3 text-center border-r border-slate-200/50">{kpgC}</td>
        <td className="py-2 px-3 text-right border-r border-slate-200/50 text-slate-800">{kpgV > 0 ? formatNumberDot(kpgV) : '0'}</td>
        <td className="py-2 px-3 text-center border-r border-slate-200/50">{flsC}</td>
        <td className="py-2 px-3 text-right border-r border-slate-200/50 text-slate-800">{flsV > 0 ? formatNumberDot(flsV) : '0'}</td>
        <td className="py-2 px-3 text-center border-r border-slate-200/50 bg-blue-50/50 text-[#04235c]">{rowTotalC}</td>
        <td className="py-2 px-3 text-right border-slate-200/50 bg-blue-50/50 text-[#04235c]">{rowTotalV > 0 ? formatNumberDot(rowTotalV) : '0'}</td>
      </tr>
    );
  });

  const docBranch = renderDynamicTableRows(tables.docBranchMap || {});
  const docArea = renderDynamicTableRows(tables.docAreaMap || {});
  const prio1 = renderDynamicTableRows(tables.prio1Map || {});
  const prio2 = renderDynamicTableRows(tables.prio2Map || {});

  // Matrix Mitra
  const mitraMapData = tables.mitraMap || {};
  const mitraNames = Object.keys(mitraMapData).filter(m => m !== "TIDAK ADA NAMA MITRA" && m !== "").sort();

  const mitraColumns = [
    'PEKERJAAN OGP', 'OGP REKON', 'PEMBERKASAN MITRA',
    'VERIFIKASI PROC BRANCH', 'REVISI PROC BRANCH', 'SIRKULER TTD BRANCH',
    'VERIFIKASI PROC REG', 'REVISI PROC REG', 'SIRKULER TTD REG',
    'VERIFIKASI PROC AREA', 'REVISI PROC AREA', 'SIRKULER TTD AREA',
    'VERIFIKASI FINANCE AREA', 'REVISI FINANCE AREA', 'PROSES FINANCE HO',
    'CASH BANK', 'CANCEL'
  ];

  let colCountsMitra = new Array(mitraColumns.length).fill(0);
  let allGrandCountMitra = 0;

  const mitraRowsCountHTML = mitraNames.map((mitra) => {
    const rowData = mitraMapData[mitra];
    let rowCount = 0;

    const colsHtml = mitraColumns.map((col, idx) => {
      const exactKey = Object.keys(rowData).find(k => k === col || k.includes(col));
      const cellValue = exactKey ? rowData[exactKey].count : 0;
      rowCount += cellValue;
      colCountsMitra[idx] += cellValue;

      return (
        <td key={col} className="py-2 px-2 text-center border-b border-slate-200/50 border-r min-w-[70px]">
          {cellValue > 0 ? formatNumberDot(cellValue) : ''}
        </td>
      );
    });

    allGrandCountMitra += rowCount;

    return (
      <tr key={`count-${mitra}`} className="hover:bg-white/60 text-[9px] text-slate-700 bg-white/30 whitespace-nowrap transition-colors">
        <td className="py-2 px-3 border-b border-slate-200/50 border-r font-bold uppercase sticky left-0 bg-slate-50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] z-10 max-w-[120px] md:max-w-[200px] truncate">{mitra}</td>
        {colsHtml}
        <td className="py-2 px-3 text-center border-b border-slate-200/50 font-black bg-blue-50/90 text-[#04235c] sticky right-0 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.05)] z-10 min-w-[80px]">
          {rowCount > 0 ? formatNumberDot(rowCount) : ''}
        </td>
      </tr>
    );
  });

  let colTotalsMitra = new Array(mitraColumns.length).fill(0);
  let allGrandTotalMitra = 0;

  const mitraRowsValueHTML = mitraNames.map((mitra) => {
    const rowData = mitraMapData[mitra];
    let rowTotal = 0;

    const colsHtml = mitraColumns.map((col, idx) => {
      const exactKey = Object.keys(rowData).find(k => k === col || k.includes(col));
      const cellValue = exactKey ? rowData[exactKey].nilaiDPP : 0;
      rowTotal += cellValue;
      colTotalsMitra[idx] += cellValue;

      return (
        <td key={col} className="py-2 px-2 text-right border-b border-slate-200/50 border-r text-slate-800 min-w-[80px]">
          {cellValue > 0 ? formatNumberDot(cellValue) : ''}
        </td>
      );
    });

    allGrandTotalMitra += rowTotal;

    return (
      <tr key={`val-${mitra}`} className="hover:bg-white/60 text-[9px] text-slate-700 bg-white/30 whitespace-nowrap transition-colors">
        <td className="py-2 px-3 border-b border-slate-200/50 border-r font-bold uppercase sticky left-0 bg-slate-50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] z-10 max-w-[120px] md:max-w-[200px] truncate">{mitra}</td>
        {colsHtml}
        <td className="py-2 px-3 text-right border-b border-slate-200/50 font-black bg-blue-50/90 text-[#04235c] sticky right-0 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.05)] z-10 min-w-[90px]">
          {rowTotal > 0 ? formatNumberDot(rowTotal) : ''}
        </td>
      </tr>
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-x-hidden w-full max-w-[100vw] p-3 md:p-6 font-sans text-slate-800">
      
      {/* 🌟 ABSTRACT GLOWING AURA BACKGROUND 🌟 */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] rounded-full bg-blue-400/20 blur-[100px] md:blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] rounded-full bg-emerald-300/20 blur-[100px] md:blur-[120px]"></div>
        <div className="absolute top-[30%] left-[40%] w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] rounded-full bg-purple-400/15 blur-[80px] md:blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full">
        
        {error && <div className="mb-4 bg-red-500/10 backdrop-blur-md text-red-600 border border-red-500/30 p-4 rounded-2xl text-sm font-bold shadow-lg">{String(error)}</div>}

        {/* HEADER */}
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-3 md:gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#04235c] via-blue-600 to-teal-500 drop-shadow-sm leading-tight">
              Procurement
            </h1>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-slate-800 -mt-1 md:-mt-2">
              Nusra Dashboard
            </h1>
            <p className="text-xs md:text-sm font-bold text-slate-500 mt-2 uppercase tracking-[0.15em] md:tracking-[0.2em]">Monitoring Tagihan Mitra</p>
          </div>
          {loading && <div className="text-[10px] md:text-xs self-center md:self-end text-blue-600 font-black animate-pulse flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100">
            <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-blue-600 animate-ping"></span> Syncing Data...
          </div>}
        </div>

        {/* FILTER BAR ATAS */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6 md:mb-8 flex flex-col md:flex-row md:justify-between md:items-center transition-all w-full">
          <div className="text-center md:text-left mb-3 md:mb-0">
            <h2 className="text-xs md:text-sm font-black text-[#04235c] uppercase tracking-widest">Global Filter</h2>
            <p className="text-[10px] md:text-xs text-slate-500 mt-0.5 font-semibold">Sesuaikan parameter di seluruh panel</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-48">
              <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)} className="appearance-none w-full border border-white/50 rounded-xl md:rounded-2xl px-4 py-2.5 pr-10 text-xs font-black text-slate-700 bg-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#04235c] uppercase shadow-sm cursor-pointer hover:bg-white/80">
                <option value="ALL">SEMUA BRANCH</option>
                <option value="MATARAM">MATARAM</option>
                <option value="KUPANG">KUPANG</option>
                <option value="FLORES">FLORES</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 md:px-4 text-slate-500">▼</div>
            </div>
            <div className="relative w-full sm:w-44">
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="appearance-none w-full border border-white/50 rounded-xl md:rounded-2xl px-4 py-2.5 pr-10 text-xs font-black text-slate-700 bg-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#04235c] uppercase shadow-sm cursor-pointer hover:bg-white/80">
                <option value="ALL">SEMUA TAHUN</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 md:px-4 text-slate-500">▼</div>
            </div>
          </div>
        </div>

        {/* BALOK SUMMARY UTAMA - Menggunakan text Rp dengan posisi flex-baseline rapi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8 w-full">
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-6 -top-6 w-20 md:w-24 h-20 md:h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex flex-col relative z-10">
              <span className="text-slate-500 font-black text-[9px] md:text-[10px] uppercase mb-1 tracking-widest">Total Keseluruhan</span>
              <div className="font-black text-[#04235c] tracking-tighter flex items-baseline gap-x-1.5">
                <span className="text-sm md:text-base opacity-70">Rp</span>
                <span className="text-xl sm:text-2xl md:text-3xl">{formatNumberDot(totalValue)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-6 -top-6 w-20 md:w-24 h-20 md:h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex flex-col relative z-10">
              <span className="text-emerald-500 font-black text-[9px] md:text-[10px] uppercase mb-1 tracking-widest">Cash Bank</span>
              <div className="font-black text-slate-800 tracking-tighter flex items-baseline gap-x-1.5">
                <span className="text-sm md:text-base opacity-70">Rp</span>
                <span className="text-xl sm:text-2xl md:text-3xl">{formatNumberDot(cashBankValue)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-6 -top-6 w-20 md:w-24 h-20 md:h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex flex-col relative z-10">
              <span className="text-blue-500 font-black text-[9px] md:text-[10px] uppercase mb-1 tracking-widest">Dok OGP</span>
              <div className="font-black text-slate-800 tracking-tighter flex items-baseline gap-x-1.5">
                <span className="text-sm md:text-base opacity-70">Rp</span>
                <span className="text-xl sm:text-2xl md:text-3xl">{formatNumberDot(dokOgpValue)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-6 -top-6 w-20 md:w-24 h-20 md:h-24 bg-gradient-to-br from-rose-400 to-red-500 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex flex-col relative z-10">
              <span className="text-rose-500 font-black text-[9px] md:text-[10px] uppercase mb-1 tracking-widest">Cancel PO</span>
              <div className="font-black text-slate-800 tracking-tighter flex items-baseline gap-x-1.5">
                <span className="text-sm md:text-base opacity-70">Rp</span>
                <span className="text-xl sm:text-2xl md:text-3xl">{formatNumberDot(cancelValue)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* GRID KONTEN TENGAH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-6 md:mb-8 w-full">
          
          {/* KOLOM KIRI: DONUT CHART & BAR */}
          <div className="lg:col-span-3 flex flex-col gap-4 md:gap-6 w-full">
            
            <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-5 md:p-6 flex flex-col items-center">
              
              <div className="relative mt-2 mb-12 md:mt-4 md:mb-16" style={{ perspective: '1200px' }}>
                <div 
                  className="relative w-40 h-40 md:w-48 md:h-48 rounded-full transition-transform duration-700 hover:scale-105 md:hover:scale-110" 
                  style={{ 
                    background: `conic-gradient(#10b981 0% ${endCash}%, #facc15 ${endCash}% ${endOgp}%, #ef4444 ${endOgp}% 100%)`,
                    transform: 'rotateX(55deg) rotateZ(-25deg)',
                    boxShadow: '0 10px 0 #cbd5e1, 0 25px 25px rgba(0,0,0,0.15)',
                  }}
                >
                  <div 
                    className="absolute inset-0 m-auto w-20 h-20 md:w-24 md:h-24 bg-[#f8fafc] rounded-full"
                    style={{ boxShadow: 'inset 0 8px 0 rgba(0,0,0,0.05), 0 5px 15px rgba(0,0,0,0.05)' }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 w-full mt-2 px-1">
                <div className="flex justify-between items-center bg-white/70 backdrop-blur-md px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl border border-white shadow-sm hover:shadow-md hover:bg-white">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#10b981] shadow-sm"></div>
                    <span className="text-[9px] md:text-[10px] font-black text-slate-600 uppercase tracking-widest">CASH BANK</span>
                  </div>
                  <span className="text-[11px] md:text-[12px] font-black text-[#04235c]">{pctCash.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center bg-white/70 backdrop-blur-md px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl border border-white shadow-sm hover:shadow-md hover:bg-white">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#facc15] shadow-sm"></div>
                    <span className="text-[9px] md:text-[10px] font-black text-slate-600 uppercase tracking-widest">DOK OGP</span>
                  </div>
                  <span className="text-[11px] md:text-[12px] font-black text-[#04235c]">{pctOgp.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center bg-white/70 backdrop-blur-md px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl border border-white shadow-sm hover:shadow-md hover:bg-white">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ef4444] shadow-sm"></div>
                    <span className="text-[9px] md:text-[10px] font-black text-slate-600 uppercase tracking-widest">CANCEL PO</span>
                  </div>
                  <span className="text-[11px] md:text-[12px] font-black text-[#04235c]">{pctCancel.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full">
              <div className="flex justify-between items-end mb-4">
                <span className="text-[10px] md:text-[11px] font-black text-emerald-600 uppercase tracking-widest">TOTAL OPEN</span>
                <span className="text-lg md:text-xl font-black text-[#04235c] tracking-tighter">{formatNumberDot(barTotalOpen)}</span>
              </div>
              
              <div className="pt-1 flex flex-col gap-3 md:gap-4">
                <div className="flex items-center bg-white/60 rounded-xl p-2 md:p-2.5 border border-white shadow-sm">
                  <div className="w-10 md:w-12 text-[8px] md:text-[9px] text-slate-500 text-center font-black leading-tight border-r border-slate-200/50 pr-2">NOK<br/>DOK</div>
                  <div className="flex-1 h-4 md:h-5 ml-2 md:ml-3 bg-slate-200/50 rounded-full overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-rose-400 to-rose-600 h-full flex items-center justify-end px-2 md:px-3 transition-all duration-1000" style={{ width: `${pctNokDok}%` }}>
                      <span className="text-white font-bold text-[8px] md:text-[9px] drop-shadow-sm">{formatNumberDot(barNokDok)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center bg-white/60 rounded-xl p-2 md:p-2.5 border border-white shadow-sm">
                  <div className="w-10 md:w-12 text-[8px] md:text-[9px] text-slate-500 text-center font-black leading-tight border-r border-slate-200/50 pr-2">OPEN<br/>DOK</div>
                  <div className="flex-1 h-4 md:h-5 ml-2 md:ml-3 bg-slate-200/50 rounded-full overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-full flex items-center justify-end px-2 md:px-3 transition-all duration-1000" style={{ width: `${pctOpenDok}%` }}>
                      <span className="text-white font-bold text-[8px] md:text-[9px] drop-shadow-sm">{formatNumberDot(barOpenDok)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM TENGAH: OPEN DOKUMEN */}
          <div className="lg:col-span-4 bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-1.5 md:w-2 h-6 md:h-8 bg-blue-500 rounded-full"></div>
                <h3 className="text-xs md:text-[14px] font-black tracking-widest uppercase text-[#04235c]">OPEN DOKUMEN</h3>
              </div>
              <span className="text-[8px] md:text-[10px] text-slate-400 font-bold hidden sm:block">➔ Swipe tabel ke kiri/kanan</span>
            </div>
            
            <div className="flex flex-col mb-4 md:mb-6 w-full max-w-full">
              <h4 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">DOKUMEN BRANCH</h4>
              <div className="w-full overflow-x-auto rounded-xl md:rounded-2xl border border-white bg-white/30 shadow-sm scroll-smooth">
                <table className="w-full text-[10px] md:text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#04235c] text-white/90 text-[7px] md:text-[8px] font-black uppercase tracking-wider">
                      <th className="py-2.5 px-3 border-r border-white/20 align-middle text-left min-w-[120px]" rowSpan="2">STATUS BERKAS</th>
                      {showMtr && <th className="py-1.5 px-2 border-b border-r border-white/20" colSpan="2">MATARAM</th>}
                      {showKpg && <th className="py-1.5 px-2 border-b border-r border-white/20" colSpan="2">KUPANG</th>}
                      {showFls && <th className="py-1.5 px-2 border-b border-white/20" colSpan="2">FLORES</th>}
                    </tr>
                    <tr className="bg-[#04235c] text-white/90 text-[7px] md:text-[8px] font-black uppercase tracking-wider">
                      {showMtr && <><th className="py-1.5 px-2 text-center border-r border-white/20 w-10">JML</th><th className="py-1.5 px-2 text-center border-r border-white/20 min-w-[70px]">NILAI DPP</th></>}
                      {showKpg && <><th className="py-1.5 px-2 text-center border-r border-white/20 w-10">JML</th><th className="py-1.5 px-2 text-center border-r border-white/20 min-w-[70px]">NILAI DPP</th></>}
                      {showFls && <><th className="py-1.5 px-2 text-center border-r border-white/20 w-10">JML</th><th className="py-1.5 px-2 text-center min-w-[70px]">NILAI DPP</th></>}
                    </tr>
                  </thead>
                  <tbody>
                    {docBranch.rows}
                    <tr className="bg-slate-100/50 backdrop-blur-md text-[#04235c] font-black text-[9px] md:text-[10px]">
                      <td className="py-2.5 px-3 text-left border-t border-r border-white uppercase">Grand Total</td>
                      {showMtr && <><td className="py-2.5 px-1 text-center border-t border-r border-white">{docBranch.grandMtrC}</td><td className="py-2.5 px-2 text-right border-t border-r border-white">{formatNumberDot(docBranch.grandMtrV)}</td></>}
                      {showKpg && <><td className="py-2.5 px-1 text-center border-t border-r border-white">{docBranch.grandKpgC}</td><td className="py-2.5 px-2 text-right border-t border-r border-white">{formatNumberDot(docBranch.grandKpgV)}</td></>}
                      {showFls && <><td className="py-2.5 px-1 text-center border-t border-r border-white">{docBranch.grandFlsC}</td><td className="py-2.5 px-2 text-right border-t border-white">{formatNumberDot(docBranch.grandFlsV)}</td></>}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col w-full max-w-full">
              <h4 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">DOKUMEN AREA & HO</h4>
              <div className="w-full overflow-x-auto rounded-xl md:rounded-2xl border border-white bg-white/30 shadow-sm scroll-smooth">
                <table className="w-full text-[10px] md:text-xs border-collapse">
                  <thead>
                    <tr className="bg-emerald-600 text-white/90 text-[7px] md:text-[8px] font-black uppercase tracking-wider">
                      <th className="py-2.5 px-3 border-r border-white/20 align-middle text-left min-w-[120px]" rowSpan="2">STATUS BERKAS</th>
                      {showMtr && <th className="py-1.5 px-2 border-b border-r border-white/20" colSpan="2">MATARAM</th>}
                      {showKpg && <th className="py-1.5 px-2 border-b border-r border-white/20" colSpan="2">KUPANG</th>}
                      {showFls && <th className="py-1.5 px-2 border-b border-white/20" colSpan="2">FLORES</th>}
                    </tr>
                    <tr className="bg-emerald-600 text-white/90 text-[7px] md:text-[8px] font-black uppercase tracking-wider">
                      {showMtr && <><th className="py-1.5 px-2 text-center border-r border-white/20 w-10">JML</th><th className="py-1.5 px-2 text-center border-r border-white/20 min-w-[70px]">NILAI DPP</th></>}
                      {showKpg && <><th className="py-1.5 px-2 text-center border-r border-white/20 w-10">JML</th><th className="py-1.5 px-2 text-center border-r border-white/20 min-w-[70px]">NILAI DPP</th></>}
                      {showFls && <><th className="py-1.5 px-2 text-center border-r border-white/20 w-10">JML</th><th className="py-1.5 px-2 text-center min-w-[70px]">NILAI DPP</th></>}
                    </tr>
                  </thead>
                  <tbody>
                    {docArea.rows}
                    <tr className="bg-slate-100/50 backdrop-blur-md text-[#04235c] font-black text-[9px] md:text-[10px]">
                      <td className="py-2.5 px-3 text-left border-t border-r border-white uppercase">Grand Total</td>
                      {showMtr && <><td className="py-2.5 px-1 text-center border-t border-r border-white">{docArea.grandMtrC}</td><td className="py-2.5 px-2 text-right border-t border-r border-white">{formatNumberDot(docArea.grandMtrV)}</td></>}
                      {showKpg && <><td className="py-2.5 px-1 text-center border-t border-r border-white">{docArea.grandKpgC}</td><td className="py-2.5 px-2 text-right border-t border-r border-white">{formatNumberDot(docArea.grandKpgV)}</td></>}
                      {showFls && <><td className="py-2.5 px-1 text-center border-t border-r border-white">{docArea.grandFlsC}</td><td className="py-2.5 px-2 text-right border-t border-white">{formatNumberDot(docArea.grandFlsV)}</td></>}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: PRIORITAS */}
          <div className="lg:col-span-5 bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-1.5 md:w-2 h-6 md:h-8 bg-amber-500 rounded-full"></div>
                <h3 className="text-xs md:text-[14px] font-black tracking-widest uppercase text-[#04235c]">PRIORITAS DOKUMEN</h3>
              </div>
              <span className="text-[8px] md:text-[10px] text-slate-400 font-bold hidden sm:block">➔ Swipe tabel ke kiri/kanan</span>
            </div>
            
            <div className="flex flex-col mb-4 md:mb-6 w-full max-w-full">
              <h4 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">PRIORITAS 1</h4>
              <div className="w-full overflow-x-auto rounded-xl md:rounded-2xl border border-white bg-white/30 shadow-sm scroll-smooth">
                <table className="w-full text-[10px] md:text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#04235c] text-white/90 text-[7px] md:text-[8px] font-black uppercase tracking-wider">
                      <th className="py-2.5 px-3 border-r border-white/20 align-middle text-left min-w-[120px]" rowSpan="2">STATUS BERKAS</th>
                      {showMtr && <th className="py-1.5 px-2 border-b border-r border-white/20" colSpan="2">MATARAM</th>}
                      {showKpg && <th className="py-1.5 px-2 border-b border-r border-white/20" colSpan="2">KUPANG</th>}
                      {showFls && <th className="py-1.5 px-2 border-b border-white/20" colSpan="2">FLORES</th>}
                    </tr>
                    <tr className="bg-[#04235c] text-white/90 text-[7px] md:text-[8px] font-black uppercase tracking-wider">
                      {showMtr && <><th className="py-1.5 px-2 text-center border-r border-white/20 w-10">JML</th><th className="py-1.5 px-2 text-center border-r border-white/20 min-w-[70px]">NILAI DPP</th></>}
                      {showKpg && <><th className="py-1.5 px-2 text-center border-r border-white/20 w-10">JML</th><th className="py-1.5 px-2 text-center border-r border-white/20 min-w-[70px]">NILAI DPP</th></>}
                      {showFls && <><th className="py-1.5 px-2 text-center border-r border-white/20 w-10">JML</th><th className="py-1.5 px-2 text-center min-w-[70px]">NILAI DPP</th></>}
                    </tr>
                  </thead>
                  <tbody>
                    {prio1.rows}
                    <tr className="bg-slate-100/50 backdrop-blur-md text-[#04235c] font-black text-[9px] md:text-[10px]">
                      <td className="py-2.5 px-3 text-left border-t border-r border-white uppercase">Grand Total</td>
                      {showMtr && <><td className="py-2.5 px-1 text-center border-t border-r border-white">{prio1.grandMtrC}</td><td className="py-2.5 px-2 text-right border-t border-r border-white">{formatNumberDot(prio1.grandMtrV)}</td></>}
                      {showKpg && <><td className="py-2.5 px-1 text-center border-t border-r border-white">{prio1.grandKpgC}</td><td className="py-2.5 px-2 text-right border-t border-r border-white">{formatNumberDot(prio1.grandKpgV)}</td></>}
                      {showFls && <><td className="py-2.5 px-1 text-center border-t border-r border-white">{prio1.grandFlsC}</td><td className="py-2.5 px-2 text-right border-t border-white">{formatNumberDot(prio1.grandFlsV)}</td></>}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex flex-col w-full max-w-full">
              <h4 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">PRIORITAS 2</h4>
              <div className="w-full overflow-x-auto rounded-xl md:rounded-2xl border border-white bg-white/30 shadow-sm scroll-smooth">
                <table className="w-full text-[10px] md:text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#04235c] text-white/90 text-[7px] md:text-[8px] font-black uppercase tracking-wider">
                      <th className="py-2.5 px-3 border-r border-white/20 align-middle text-left min-w-[120px]" rowSpan="2">STATUS BERKAS</th>
                      {showMtr && <th className="py-1.5 px-2 border-b border-r border-white/20" colSpan="2">MATARAM</th>}
                      {showKpg && <th className="py-1.5 px-2 border-b border-r border-white/20" colSpan="2">KUPANG</th>}
                      {showFls && <th className="py-1.5 px-2 border-b border-white/20" colSpan="2">FLORES</th>}
                    </tr>
                    <tr className="bg-[#04235c] text-white/90 text-[7px] md:text-[8px] font-black uppercase tracking-wider">
                      {showMtr && <><th className="py-1.5 px-2 text-center border-r border-white/20 w-10">JML</th><th className="py-1.5 px-2 text-center border-r border-white/20 min-w-[70px]">NILAI DPP</th></>}
                      {showKpg && <><th className="py-1.5 px-2 text-center border-r border-white/20 w-10">JML</th><th className="py-1.5 px-2 text-center border-r border-white/20 min-w-[70px]">NILAI DPP</th></>}
                      {showFls && <><th className="py-1.5 px-2 text-center border-r border-white/20 w-10">JML</th><th className="py-1.5 px-2 text-center min-w-[70px]">NILAI DPP</th></>}
                    </tr>
                  </thead>
                  <tbody>
                    {prio2.rows}
                    <tr className="bg-slate-100/50 backdrop-blur-md text-[#04235c] font-black text-[9px] md:text-[10px]">
                      <td className="py-2.5 px-3 text-left border-t border-r border-white uppercase">Grand Total</td>
                      {showMtr && <><td className="py-2.5 px-1 text-center border-t border-r border-white">{prio2.grandMtrC}</td><td className="py-2.5 px-2 text-right border-t border-r border-white">{formatNumberDot(prio2.grandMtrV)}</td></>}
                      {showKpg && <><td className="py-2.5 px-1 text-center border-t border-r border-white">{prio2.grandKpgC}</td><td className="py-2.5 px-2 text-right border-t border-r border-white">{formatNumberDot(prio2.grandKpgV)}</td></>}
                      {showFls && <><td className="py-2.5 px-1 text-center border-t border-r border-white">{prio2.grandFlsC}</td><td className="py-2.5 px-2 text-right border-t border-white">{formatNumberDot(prio2.grandFlsV)}</td></>}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* TABEL PLAN GR (GLASSMORPHISM) */}
        <div className="w-full bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl md:rounded-3xl overflow-hidden mb-6 md:mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 px-4 md:px-6 py-4 md:py-5 font-black text-[#04235c] flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-4 relative z-10 border-b border-white/50">
            <div className="flex justify-between items-center w-full md:w-auto">
              <span className="tracking-widest uppercase text-sm md:text-lg">PLAN GR NUSRA</span>
              <span className="text-[9px] text-yellow-900 md:hidden bg-yellow-300/40 px-2 py-1 rounded">SWIPE ➔</span>
            </div>
            
            <div className="flex flex-row md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                <span className="text-[9px] md:text-[10px] font-black uppercase text-[#04235c] tracking-widest bg-white/40 backdrop-blur-md px-2 md:px-3 py-1.5 rounded-full">THN:</span>
                <select 
                  value={selectedPlanGrYear} 
                  onChange={(e) => setSelectedPlanGrYear(e.target.value)} 
                  className="appearance-none border-none rounded-lg md:rounded-xl px-2 md:px-4 py-1.5 md:py-2 md:pr-8 text-[10px] md:text-xs font-bold text-slate-800 bg-white/80 focus:ring-2 focus:ring-[#04235c] uppercase shadow-sm cursor-pointer"
                >
                  <option value="ALL">SEMUA</option>
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                <span className="text-[9px] md:text-[10px] font-black uppercase text-[#04235c] tracking-widest bg-white/40 backdrop-blur-md px-2 md:px-3 py-1.5 rounded-full">BLN:</span>
                <select 
                  value={selectedMonth} 
                  onChange={(e) => setSelectedMonth(e.target.value)} 
                  className="appearance-none border-none rounded-lg md:rounded-xl px-2 md:px-4 py-1.5 md:py-2 md:pr-8 text-[10px] md:text-xs font-bold text-slate-800 bg-white/80 focus:ring-2 focus:ring-[#04235c] uppercase shadow-sm cursor-pointer"
                >
                  <option value="ALL">SEMUA</option>
                  {availableMonths.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="p-3 md:p-6 w-full max-w-full overflow-hidden">
            <div className="w-full overflow-x-auto border border-white bg-white/30 rounded-xl md:rounded-2xl shadow-sm scroll-smooth">
              <table className="w-full text-[10px] md:text-xs border-collapse">
                <thead>
                  <tr className="bg-[#04235c] text-white/90 text-[7px] md:text-[9px] font-black text-center uppercase tracking-wider">
                    <th className="py-2 md:py-3 px-3 border-r border-white/20 align-middle text-left min-w-[100px]" rowSpan="2">JENIS PEKERJAAN</th>
                    <th className="py-1.5 md:py-2 px-2 border-b border-r border-white/20" colSpan="2">MATARAM</th>
                    <th className="py-1.5 md:py-2 px-2 border-b border-r border-white/20" colSpan="2">KUPANG</th>
                    <th className="py-1.5 md:py-2 px-2 border-b border-r border-white/20" colSpan="2">FLORES</th>
                    <th className="py-1.5 md:py-2 px-2 border-b border-white/20 bg-blue-600" colSpan="2">GRAND TOTAL</th>
                  </tr>
                  <tr className="bg-[#04235c] text-white/90 text-[7px] md:text-[8px] font-black text-center uppercase tracking-wider">
                    <th className="py-1.5 md:py-2 px-2 border-r border-white/20">JML</th>
                    <th className="py-1.5 md:py-2 px-2 border-r border-white/20 min-w-[70px]">NILAI DPP</th>
                    <th className="py-1.5 md:py-2 px-2 border-r border-white/20">JML</th>
                    <th className="py-1.5 md:py-2 px-2 border-r border-white/20 min-w-[70px]">NILAI DPP</th>
                    <th className="py-1.5 md:py-2 px-2 border-r border-white/20">JML</th>
                    <th className="py-1.5 md:py-2 px-2 border-r border-white/20 min-w-[70px]">NILAI DPP</th>
                    <th className="py-1.5 md:py-2 px-2 border-r border-white/20 bg-blue-600">JML</th>
                    <th className="py-1.5 md:py-2 px-2 border-white/20 bg-blue-600 min-w-[80px]">NILAI DPP</th>
                  </tr>
                </thead>
                <tbody>
                  {planGrRows}
                  <tr className="bg-slate-100/50 backdrop-blur-md text-[#04235c] font-black text-[9px] md:text-[11px] whitespace-nowrap">
                    <td className="py-2.5 md:py-3 px-3 text-left border-t border-r border-white uppercase">Grand Total</td>
                    <td className="py-2.5 md:py-3 px-3 text-center border-t border-r border-white">{grandMtrC_GR}</td>
                    <td className="py-2.5 md:py-3 px-3 text-right border-t border-r border-white">{formatNumberDot(grandMtrV_GR)}</td>
                    <td className="py-2.5 md:py-3 px-3 text-center border-t border-r border-white">{grandKpgC_GR}</td>
                    <td className="py-2.5 md:py-3 px-3 text-right border-t border-r border-white">{formatNumberDot(grandKpgV_GR)}</td>
                    <td className="py-2.5 md:py-3 px-3 text-center border-t border-r border-white">{grandFlsC_GR}</td>
                    <td className="py-2.5 md:py-3 px-3 text-right border-t border-r border-white">{formatNumberDot(grandFlsV_GR)}</td>
                    <td className="py-2.5 md:py-3 px-3 text-center border-t border-r border-white bg-blue-100/80">{grandMtrC_GR + grandKpgC_GR + grandFlsC_GR}</td>
                    <td className="py-2.5 md:py-3 px-3 text-right border-t border-white bg-blue-100/80">{formatNumberDot(grandMtrV_GR + grandKpgV_GR + grandFlsV_GR)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 1. TABEL MATRIX - JUMLAH BERKAS (COUNT) */}
        <div className="w-full bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl md:rounded-3xl overflow-hidden mb-6 md:mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="bg-[#04235c] px-4 md:px-6 py-4 md:py-5 font-black text-white flex justify-between items-center">
            <span className="tracking-widest uppercase text-[11px] md:text-[13px]">STATUS PER MITRA (JML)</span>
            <span className="text-[8px] md:text-[10px] text-blue-200 bg-blue-800 px-2 py-1 rounded md:hidden">SWIPE KIRI ➔</span>
          </div>
          <div className="w-full overflow-x-auto relative p-1 md:p-2 scroll-smooth">
            <table className="w-full text-[9px] border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-100 text-[#04235c] font-black text-center uppercase tracking-wider">
                  <th className="py-2 md:py-3 px-3 md:px-4 border-b border-white align-middle sticky left-0 bg-slate-100 z-20 shadow-[2px_0_10px_-2px_rgba(0,0,0,0.1)] text-left">NAMA MITRA</th>
                  {mitraColumns.map(col => (
                    <th key={col} className="py-2 md:py-3 px-2 border-b border-white min-w-[80px] md:min-w-[90px] break-words whitespace-normal leading-snug">{col}</th>
                  ))}
                  <th className="py-2 md:py-3 px-3 md:px-4 border-b border-white align-middle sticky right-0 bg-blue-100 text-[#04235c] z-20 shadow-[-2px_0_10px_-2px_rgba(0,0,0,0.1)]">TOTAL BERKAS</th>
                </tr>
              </thead>
              <tbody>
                {mitraRowsCountHTML.length > 0 ? mitraRowsCountHTML : (
                  <tr>
                    <td colSpan={mitraColumns.length + 2} className="text-center py-6 md:py-8 font-black text-slate-400 tracking-widest bg-white/30">TIDAK ADA DATA MITRA</td>
                  </tr>
                )}
                <tr className="bg-[#04235c] text-white font-black text-[9px] md:text-[10px]">
                  <td className="py-2 md:py-3 px-3 md:px-4 text-left uppercase sticky left-0 bg-[#04235c] z-20 shadow-[2px_0_10px_-2px_rgba(0,0,0,0.3)]">GRAND TOTAL</td>
                  {colCountsMitra.map((tot, idx) => (
                    <td key={idx} className="py-2 md:py-3 px-2 border-r border-white/10 text-center">
                      {tot > 0 ? formatNumberDot(tot) : ''}
                    </td>
                  ))}
                  <td className="py-2 md:py-3 px-3 md:px-4 text-center sticky right-0 bg-blue-600 z-20 shadow-[-2px_0_10px_-2px_rgba(0,0,0,0.3)]">
                    {allGrandCountMitra > 0 ? formatNumberDot(allGrandCountMitra) : ''}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. TABEL MATRIX - NILAI DPP */}
        <div className="w-full bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8 md:mb-10">
          <div className="bg-[#04235c] px-4 md:px-6 py-4 md:py-5 font-black text-white flex justify-between items-center">
            <span className="tracking-widest uppercase text-[11px] md:text-[13px]">STATUS PER MITRA (NILAI DPP)</span>
            <span className="text-[8px] md:text-[10px] text-blue-200 bg-blue-800 px-2 py-1 rounded md:hidden">SWIPE KIRI ➔</span>
          </div>
          <div className="w-full overflow-x-auto relative p-1 md:p-2 scroll-smooth">
            <table className="w-full text-[9px] border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-100 text-[#04235c] font-black text-center uppercase tracking-wider">
                  <th className="py-2 md:py-3 px-3 md:px-4 border-b border-white align-middle sticky left-0 bg-slate-100 z-20 shadow-[2px_0_10px_-2px_rgba(0,0,0,0.1)] text-left">NAMA MITRA</th>
                  {mitraColumns.map(col => (
                    <th key={col} className="py-2 md:py-3 px-2 border-b border-white min-w-[80px] md:min-w-[90px] break-words whitespace-normal leading-snug">{col}</th>
                  ))}
                  <th className="py-2 md:py-3 px-3 md:px-4 border-b border-white align-middle sticky right-0 bg-blue-100 text-[#04235c] z-20 shadow-[-2px_0_10px_-2px_rgba(0,0,0,0.1)]">NILAI DPP</th>
                </tr>
              </thead>
              <tbody>
                {mitraRowsValueHTML.length > 0 ? mitraRowsValueHTML : (
                  <tr>
                    <td colSpan={mitraColumns.length + 2} className="text-center py-6 md:py-8 font-black text-slate-400 tracking-widest bg-white/30">TIDAK ADA DATA MITRA</td>
                  </tr>
                )}
                <tr className="bg-[#04235c] text-white font-black text-[9px] md:text-[10px]">
                  <td className="py-2 md:py-3 px-3 md:px-4 text-left uppercase sticky left-0 bg-[#04235c] z-20 shadow-[2px_0_10px_-2px_rgba(0,0,0,0.3)]">GRAND TOTAL</td>
                  {colTotalsMitra.map((tot, idx) => (
                    <td key={idx} className="py-2 md:py-3 px-2 border-r border-white/10 text-right">
                      {tot > 0 ? formatNumberDot(tot) : ''}
                    </td>
                  ))}
                  <td className="py-2 md:py-3 px-3 md:px-4 text-right sticky right-0 bg-blue-600 z-20 shadow-[-2px_0_10px_-2px_rgba(0,0,0,0.3)]">
                    {allGrandTotalMitra > 0 ? formatNumberDot(allGrandTotalMitra) : ''}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;