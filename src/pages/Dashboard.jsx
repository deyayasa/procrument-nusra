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

  // Donut Percentage & Total
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
        <tr key={idx} className="border-b border-[#e8d8c8] hover:bg-[#fcf8f2] text-[10px] text-[#4a3f38] font-semibold bg-white whitespace-nowrap transition-all duration-300">
          <td className="py-2 px-3 border-r border-[#e8d8c8] uppercase">{status}</td>
          {showMtr && (
            <>
              <td className="py-2 px-1 text-center border-r border-[#e8d8c8]">{item.mataram.count}</td>
              <td className="py-2 px-2 text-right border-r border-[#e8d8c8] text-[#2b2724]">{item.mataram.nilaiDPP > 0 ? formatNumberDot(item.mataram.nilaiDPP) : '0'}</td>
            </>
          )}
          {showKpg && (
            <>
              <td className="py-2 px-1 text-center border-r border-[#e8d8c8]">{item.kupang.count}</td>
              <td className="py-2 px-2 text-right border-r border-[#e8d8c8] text-[#2b2724]">{item.kupang.nilaiDPP > 0 ? formatNumberDot(item.kupang.nilaiDPP) : '0'}</td>
            </>
          )}
          {showFls && (
            <>
              <td className="py-2 px-1 text-center border-r border-[#e8d8c8]">{item.flores?.count || 0}</td>
              <td className="py-2 px-2 text-right border-[#e8d8c8] text-[#2b2724]">{(item.flores?.nilaiDPP || 0) > 0 ? formatNumberDot(item.flores.nilaiDPP) : '0'}</td>
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
      <tr key={jp} className="border-b border-[#e8d8c8] hover:bg-[#fcf8f2] text-[11px] text-[#4a3f38] font-semibold bg-white transition-colors whitespace-nowrap">
        <td className="py-2 px-3 border-r border-[#e8d8c8] uppercase">{jp}</td>
        <td className="py-2 px-3 text-center border-r border-[#e8d8c8]">{mtrC}</td>
        <td className="py-2 px-3 text-right border-r border-[#e8d8c8] text-[#2b2724]">{mtrV > 0 ? formatNumberDot(mtrV) : '0'}</td>
        <td className="py-2 px-3 text-center border-r border-[#e8d8c8]">{kpgC}</td>
        <td className="py-2 px-3 text-right border-r border-[#e8d8c8] text-[#2b2724]">{kpgV > 0 ? formatNumberDot(kpgV) : '0'}</td>
        <td className="py-2 px-3 text-center border-r border-[#e8d8c8]">{flsC}</td>
        <td className="py-2 px-3 text-right border-r border-[#e8d8c8] text-[#2b2724]">{flsV > 0 ? formatNumberDot(flsV) : '0'}</td>
        <td className="py-2 px-3 text-center border-r border-[#e8d8c8] bg-[#fdf5ed] text-[#b88645]">{rowTotalC}</td>
        <td className="py-2 px-3 text-right border-[#e8d8c8] bg-[#fdf5ed] text-[#b88645]">{rowTotalV > 0 ? formatNumberDot(rowTotalV) : '0'}</td>
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
        <td key={col} className="py-2 px-2 text-center border-b border-[#e8d8c8] border-r min-w-[70px]">
          {cellValue > 0 ? formatNumberDot(cellValue) : ''}
        </td>
      );
    });

    allGrandCountMitra += rowCount;

    return (
      <tr key={`count-${mitra}`} className="hover:bg-[#fcf8f2] text-[9px] text-[#4a3f38] bg-white whitespace-nowrap transition-colors">
        <td className="py-2 px-3 border-b border-[#e8d8c8] border-r font-bold uppercase sticky left-0 bg-white shadow-[2px_0_5px_-2px_rgba(43,39,36,0.05)] z-10 max-w-[120px] md:max-w-[200px] truncate">{mitra}</td>
        {colsHtml}
        <td className="py-2 px-3 text-center border-b border-[#e8d8c8] font-black bg-[#f0e0ce] text-[#2b2724] sticky right-0 shadow-[-2px_0_5px_-2px_rgba(43,39,36,0.05)] z-10 min-w-[80px]">
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
        <td key={col} className="py-2 px-2 text-right border-b border-[#e8d8c8] border-r text-[#2b2724] min-w-[80px]">
          {cellValue > 0 ? formatNumberDot(cellValue) : ''}
        </td>
      );
    });

    allGrandTotalMitra += rowTotal;

    return (
      <tr key={`val-${mitra}`} className="hover:bg-[#fcf8f2] text-[9px] text-[#4a3f38] bg-white whitespace-nowrap transition-colors">
        <td className="py-2 px-3 border-b border-[#e8d8c8] border-r font-bold uppercase sticky left-0 bg-white shadow-[2px_0_5px_-2px_rgba(43,39,36,0.05)] z-10 max-w-[120px] md:max-w-[200px] truncate">{mitra}</td>
        {colsHtml}
        <td className="py-2 px-3 text-right border-b border-[#e8d8c8] font-black bg-[#f0e0ce] text-[#2b2724] sticky right-0 shadow-[-2px_0_5px_-2px_rgba(43,39,36,0.05)] z-10 min-w-[90px]">
          {rowTotal > 0 ? formatNumberDot(rowTotal) : ''}
        </td>
      </tr>
    );
  });

  return (
    // Background Warm Sand / Beige
    <div className="min-h-screen bg-[#ebdcd0] relative overflow-x-hidden w-full max-w-[100vw] p-3 md:p-6 font-sans text-[#2b2724]">
      
      {/* 🌟 ABSTRACT GLOWING AURA BACKGROUND (Soft Blue, Red, Yellow Pastel) 🌟 */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] rounded-full bg-[#8aa7c2]/20 blur-[100px] md:blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] rounded-full bg-[#d87c7c]/15 blur-[100px] md:blur-[120px]"></div>
        <div className="absolute top-[30%] left-[40%] w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] rounded-full bg-[#dbad69]/15 blur-[80px] md:blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full">
        
        {error && <div className="mb-4 bg-red-500/10 backdrop-blur-md text-red-600 border border-red-500/30 p-4 rounded-2xl text-sm font-bold shadow-lg">{String(error)}</div>}

        {/* HEADER */}
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-3 md:gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#2b2724] via-[#5c544e] to-[#8aa7c2] drop-shadow-sm leading-tight">
              Procurement
            </h1>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-[#2b2724] -mt-1 md:-mt-2">
              Nusra Dashboard
            </h1>
            <p className="text-xs md:text-sm font-bold text-[#8f8278] mt-2 uppercase tracking-[0.15em] md:tracking-[0.2em]">Monitoring Tagihan Mitra</p>
          </div>
          {loading && <div className="text-[10px] md:text-xs self-center md:self-end text-[#2b2724] font-black animate-pulse flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-[#dccaba] shadow-sm">
            <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#d87c7c] animate-ping"></span> Syncing Data...
          </div>}
        </div>

        {/* FILTER BAR ATAS */}
        <div className="bg-white border border-[#dccaba] rounded-2xl md:rounded-[1.5rem] p-4 md:p-5 shadow-sm mb-6 md:mb-8 flex flex-col md:flex-row md:justify-between md:items-center transition-all w-full">
          <div className="text-center md:text-left mb-3 md:mb-0">
            <h2 className="text-xs md:text-sm font-black text-[#2b2724] uppercase tracking-widest">Global Filter</h2>
            <p className="text-[10px] md:text-xs text-[#8f8278] mt-0.5 font-semibold">Sesuaikan parameter di seluruh panel</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-48">
              <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)} className="appearance-none w-full border border-[#e8d8c8] rounded-xl md:rounded-2xl px-4 py-2.5 pr-10 text-xs font-black text-[#2b2724] bg-[#fcfaf7] focus:outline-none focus:ring-2 focus:ring-[#8aa7c2] uppercase shadow-sm cursor-pointer hover:bg-white">
                <option value="ALL">SEMUA BRANCH</option>
                <option value="MATARAM">MATARAM</option>
                <option value="KUPANG">KUPANG</option>
                <option value="FLORES">FLORES</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 md:px-4 text-[#8f8278]">▼</div>
            </div>
            <div className="relative w-full sm:w-44">
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="appearance-none w-full border border-[#e8d8c8] rounded-xl md:rounded-2xl px-4 py-2.5 pr-10 text-xs font-black text-[#2b2724] bg-[#fcfaf7] focus:outline-none focus:ring-2 focus:ring-[#8aa7c2] uppercase shadow-sm cursor-pointer hover:bg-white">
                <option value="ALL">SEMUA TAHUN</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 md:px-4 text-[#8f8278]">▼</div>
            </div>
          </div>
        </div>

        {/* BALOK SUMMARY UTAMA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8 w-full">
          {/* White Card with Soft Blue Accent */}
          <div className="bg-white border border-[#dccaba] rounded-2xl md:rounded-[1.5rem] p-5 md:p-6 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-6 -top-6 w-20 md:w-24 h-20 md:h-24 bg-[#8aa7c2] rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex flex-col relative z-10">
              <span className="text-[#8f8278] font-black text-[9px] md:text-[10px] uppercase mb-1 tracking-widest">Total Keseluruhan</span>
              <div className="font-black text-[#2b2724] tracking-tighter flex items-baseline gap-x-1.5">
                <span className="text-sm md:text-base opacity-70">Rp</span>
                <span className="text-xl sm:text-2xl md:text-3xl">{formatNumberDot(totalValue)}</span>
              </div>
            </div>
          </div>
          
          {/* White Card with Soft Yellow Accent */}
          <div className="bg-white border border-[#dccaba] rounded-2xl md:rounded-[1.5rem] p-5 md:p-6 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-6 -top-6 w-20 md:w-24 h-20 md:h-24 bg-[#dbad69] rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex flex-col relative z-10">
              <span className="text-[#8f8278] font-black text-[9px] md:text-[10px] uppercase mb-1 tracking-widest">Cash Bank</span>
              <div className="font-black text-[#2b2724] tracking-tighter flex items-baseline gap-x-1.5">
                <span className="text-sm md:text-base opacity-70">Rp</span>
                <span className="text-xl sm:text-2xl md:text-3xl">{formatNumberDot(cashBankValue)}</span>
              </div>
            </div>
          </div>
          
          {/* White Card with Soft Coral/Red Accent */}
          <div className="bg-white border border-[#dccaba] rounded-2xl md:rounded-[1.5rem] p-5 md:p-6 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-6 -top-6 w-20 md:w-24 h-20 md:h-24 bg-[#d87c7c] rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex flex-col relative z-10">
              <span className="text-[#8f8278] font-black text-[9px] md:text-[10px] uppercase mb-1 tracking-widest">Dok OGP</span>
              <div className="font-black text-[#2b2724] tracking-tighter flex items-baseline gap-x-1.5">
                <span className="text-sm md:text-base opacity-70">Rp</span>
                <span className="text-xl sm:text-2xl md:text-3xl">{formatNumberDot(dokOgpValue)}</span>
              </div>
            </div>
          </div>
          
          {/* White Card with Soft Gray/Neutral Accent */}
          <div className="bg-white border border-[#dccaba] rounded-2xl md:rounded-[1.5rem] p-5 md:p-6 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-6 -top-6 w-20 md:w-24 h-20 md:h-24 bg-[#9a918a] rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex flex-col relative z-10">
              <span className="text-[#8f8278] font-black text-[9px] md:text-[10px] uppercase mb-1 tracking-widest">Cancel PO</span>
              <div className="font-black text-[#2b2724] tracking-tighter flex items-baseline gap-x-1.5">
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
            
            <div className="bg-white border border-[#dccaba] rounded-2xl md:rounded-[1.5rem] shadow-sm overflow-hidden p-5 md:p-6 flex flex-col items-center relative">
              
              {/* 🍩 3D DONUT CHART PREMIUM (Dengan Angka Langsung di Donat) 🍩 */}
              <div className="relative mt-4 mb-14 md:mt-6 md:mb-16 flex justify-center group" style={{ perspective: '1200px' }}>
                
                {/* Aura Glow di belakang donut */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 md:w-44 md:h-44 bg-[#8aa7c2]/20 blur-[30px] rounded-full animate-pulse z-0"></div>

                {/* Floating Percentages Badges (Muncul angka persentase di sekeliling donat) */}
                <div className="absolute top-[10%] right-[5%] md:right-[10%] bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm border border-[#e8d8c8] z-20 pointer-events-none transform transition-all duration-700 group-hover:-translate-y-3">
                  <span className="text-[#8aa7c2] font-black text-[9px] md:text-[10px]">{pctCash.toFixed(1)}%</span>
                </div>
                <div className="absolute bottom-[0%] left-[15%] md:left-[20%] bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm border border-[#e8d8c8] z-20 pointer-events-none transform transition-all duration-700 group-hover:-translate-y-3">
                  <span className="text-[#d87c7c] font-black text-[9px] md:text-[10px]">{pctOgp.toFixed(1)}%</span>
                </div>
                <div className="absolute top-[5%] left-[5%] md:left-[10%] bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm border border-[#e8d8c8] z-20 pointer-events-none transform transition-all duration-700 group-hover:-translate-y-3">
                  <span className="text-[#dbad69] font-black text-[9px] md:text-[10px]">{pctCancel.toFixed(1)}%</span>
                </div>

                <div 
                  className="relative w-40 h-40 md:w-48 md:h-48 rounded-full transition-all duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2 z-10" 
                  style={{ 
                    // Warna Chart
                    background: `conic-gradient(#8aa7c2 0% ${endCash}%, #d87c7c ${endCash}% ${endOgp}%, #dbad69 ${endOgp}% 100%)`,
                    transform: 'rotateX(60deg) rotateZ(-25deg)',
                    transformStyle: 'preserve-3d',
                    /* Efek ketebalan (Cylinder) 3D yang realistis berlapis dengan warna beige/putih */
                    boxShadow: `
                      0 1px 0 #fcfaf7, 0 2px 0 #fcfaf7, 0 3px 0 #ebdcd0, 0 4px 0 #ebdcd0, 
                      0 5px 0 #dccaba, 0 6px 0 #dccaba, 0 7px 0 #c4b0a1, 
                      0 15px 25px rgba(43,39,36,0.15)
                    `,
                  }}
                >
                  {/* Efek Kilap Kaca (Gloss Reflection) */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-transparent to-black/5 pointer-events-none mix-blend-overlay"></div>

                  {/* Lubang Donut Tengah - Menampilkan Total Angka */}
                  <div 
                    className="absolute inset-0 m-auto w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex flex-col items-center justify-center"
                    style={{ 
                      /* Bayangan dalam agar lubang terlihat tebal, bolong, dan dalam */
                      boxShadow: 'inset 0 6px 10px rgba(0,0,0,0.06), inset 0 2px 4px rgba(0,0,0,0.03), 0 -2px 5px rgba(255,255,255,1)',
                      transform: 'translateZ(1px)' // Mencegah glitch border 
                    }}
                  >
                    {/* Teks di-inverse rotasinya agar berdiri tegak menghadap depan */}
                    <div style={{ transform: 'rotateZ(25deg) rotateX(-60deg)' }} className="flex flex-col items-center justify-center">
                      <span className="text-[7px] md:text-[8px] font-black text-[#8f8278] uppercase tracking-widest drop-shadow-sm mb-0.5">TOTAL</span>
                      <span className="text-[9px] md:text-[11px] font-black text-[#2b2724] drop-shadow-sm tracking-tighter">
                        {/* Konversi otomatis angka agar tidak kepanjangan dan muat di lubang donat */}
                        {chartTotal >= 1000000000000 
                          ? (chartTotal/1000000000000).toFixed(2) + ' T' 
                          : chartTotal >= 1000000000 
                          ? (chartTotal/1000000000).toFixed(1) + ' M' 
                          : formatNumberDot(chartTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 w-full mt-2 px-1">
                <div className="flex justify-between items-center bg-white px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl border border-[#e8d8c8] shadow-sm hover:shadow-md hover:bg-[#fcfaf7] transition-all">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#8aa7c2] shadow-sm"></div>
                    <span className="text-[9px] md:text-[10px] font-black text-[#8f8278] uppercase tracking-widest">CASH BANK</span>
                  </div>
                  <span className="text-[11px] md:text-[12px] font-black text-[#2b2724]">{pctCash.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center bg-white px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl border border-[#e8d8c8] shadow-sm hover:shadow-md hover:bg-[#fcfaf7] transition-all">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#d87c7c] shadow-sm"></div>
                    <span className="text-[9px] md:text-[10px] font-black text-[#8f8278] uppercase tracking-widest">DOK OGP</span>
                  </div>
                  <span className="text-[11px] md:text-[12px] font-black text-[#2b2724]">{pctOgp.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center bg-white px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl border border-[#e8d8c8] shadow-sm hover:shadow-md hover:bg-[#fcfaf7] transition-all">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#dbad69] shadow-sm"></div>
                    <span className="text-[9px] md:text-[10px] font-black text-[#8f8278] uppercase tracking-widest">CANCEL PO</span>
                  </div>
                  <span className="text-[11px] md:text-[12px] font-black text-[#2b2724]">{pctCancel.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#dccaba] rounded-2xl md:rounded-[1.5rem] p-5 md:p-6 shadow-sm w-full">
              <div className="flex justify-between items-end mb-4">
                <span className="text-[10px] md:text-[11px] font-black text-[#8f8278] uppercase tracking-widest">TOTAL OPEN</span>
                <span className="text-lg md:text-xl font-black text-[#2b2724] tracking-tighter">{formatNumberDot(barTotalOpen)}</span>
              </div>
              
              <div className="pt-1 flex flex-col gap-3 md:gap-4">
                <div className="flex items-center bg-white rounded-xl p-2 md:p-2.5 border border-[#e8d8c8] shadow-sm">
                  <div className="w-10 md:w-12 text-[8px] md:text-[9px] text-[#8f8278] text-center font-black leading-tight border-r border-[#e8d8c8] pr-2">NOK<br/>DOK</div>
                  <div className="flex-1 h-4 md:h-5 ml-2 md:ml-3 bg-[#fcfaf7] rounded-full overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-[#eacaca] to-[#d87c7c] h-full flex items-center justify-end px-2 md:px-3 transition-all duration-1000" style={{ width: `${pctNokDok}%` }}>
                      <span className="text-white font-bold text-[8px] md:text-[9px] drop-shadow-sm">{formatNumberDot(barNokDok)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center bg-white rounded-xl p-2 md:p-2.5 border border-[#e8d8c8] shadow-sm">
                  <div className="w-10 md:w-12 text-[8px] md:text-[9px] text-[#8f8278] text-center font-black leading-tight border-r border-[#e8d8c8] pr-2">OPEN<br/>DOK</div>
                  <div className="flex-1 h-4 md:h-5 ml-2 md:ml-3 bg-[#fcfaf7] rounded-full overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-[#b3cce0] to-[#8aa7c2] h-full flex items-center justify-end px-2 md:px-3 transition-all duration-1000" style={{ width: `${pctOpenDok}%` }}>
                      <span className="text-white font-bold text-[8px] md:text-[9px] drop-shadow-sm">{formatNumberDot(barOpenDok)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM TENGAH: OPEN DOKUMEN */}
          <div className="lg:col-span-4 bg-white border border-[#dccaba] rounded-2xl md:rounded-[1.5rem] p-5 md:p-6 shadow-sm flex flex-col w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-1.5 md:w-2 h-6 md:h-8 bg-[#8aa7c2] rounded-full"></div>
                <h3 className="text-xs md:text-[14px] font-black tracking-widest uppercase text-[#2b2724]">OPEN DOKUMEN</h3>
              </div>
              <span className="text-[8px] md:text-[10px] text-[#8f8278] font-bold hidden sm:block">➔ Swipe tabel ke kiri/kanan</span>
            </div>
            
            <div className="flex flex-col mb-4 md:mb-6 w-full max-w-full">
              <h4 className="text-[9px] md:text-[10px] font-black text-[#8aa7c2] uppercase mb-2 tracking-widest">DOKUMEN BRANCH</h4>
              <div className="w-full overflow-x-auto rounded-xl md:rounded-2xl border border-[#e8d8c8] bg-white shadow-sm scroll-smooth">
                <table className="w-full text-[10px] md:text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f7ece1] text-[#4a3f38] text-[7px] md:text-[8px] font-black uppercase tracking-wider">
                      <th className="py-2.5 px-3 border-r border-[#e8d8c8] align-middle text-left min-w-[120px]" rowSpan="2">STATUS BERKAS</th>
                      {showMtr && <th className="py-1.5 px-2 border-b border-r border-[#e8d8c8]" colSpan="2">MATARAM</th>}
                      {showKpg && <th className="py-1.5 px-2 border-b border-r border-[#e8d8c8]" colSpan="2">KUPANG</th>}
                      {showFls && <th className="py-1.5 px-2 border-b border-[#e8d8c8]" colSpan="2">FLORES</th>}
                    </tr>
                    <tr className="bg-[#f7ece1] text-[#4a3f38] text-[7px] md:text-[8px] font-black uppercase tracking-wider">
                      {showMtr && <><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] w-10">JML</th><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] min-w-[70px]">NILAI DPP</th></>}
                      {showKpg && <><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] w-10">JML</th><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] min-w-[70px]">NILAI DPP</th></>}
                      {showFls && <><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] w-10">JML</th><th className="py-1.5 px-2 text-center min-w-[70px]">NILAI DPP</th></>}
                    </tr>
                  </thead>
                  <tbody>
                    {docBranch.rows}
                    <tr className="bg-[#ebd5c1] text-[#2b2724] font-black text-[9px] md:text-[10px]">
                      <td className="py-2.5 px-3 text-left border-t border-r border-[#dccaba] uppercase">Grand Total</td>
                      {showMtr && <><td className="py-2.5 px-1 text-center border-t border-r border-[#dccaba]">{docBranch.grandMtrC}</td><td className="py-2.5 px-2 text-right border-t border-r border-[#dccaba]">{formatNumberDot(docBranch.grandMtrV)}</td></>}
                      {showKpg && <><td className="py-2.5 px-1 text-center border-t border-r border-[#dccaba]">{docBranch.grandKpgC}</td><td className="py-2.5 px-2 text-right border-t border-r border-[#dccaba]">{formatNumberDot(docBranch.grandKpgV)}</td></>}
                      {showFls && <><td className="py-2.5 px-1 text-center border-t border-r border-[#dccaba]">{docBranch.grandFlsC}</td><td className="py-2.5 px-2 text-right border-t border-[#dccaba]">{formatNumberDot(docBranch.grandFlsV)}</td></>}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col w-full max-w-full">
              <h4 className="text-[9px] md:text-[10px] font-black text-[#8aa7c2] uppercase mb-2 tracking-widest">DOKUMEN AREA & HO</h4>
              <div className="w-full overflow-x-auto rounded-xl md:rounded-2xl border border-[#e8d8c8] bg-white shadow-sm scroll-smooth">
                <table className="w-full text-[10px] md:text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f7ece1] text-[#4a3f38] text-[7px] md:text-[8px] font-black uppercase tracking-wider">
                      <th className="py-2.5 px-3 border-r border-[#e8d8c8] align-middle text-left min-w-[120px]" rowSpan="2">STATUS BERKAS</th>
                      {showMtr && <th className="py-1.5 px-2 border-b border-r border-[#e8d8c8]" colSpan="2">MATARAM</th>}
                      {showKpg && <th className="py-1.5 px-2 border-b border-r border-[#e8d8c8]" colSpan="2">KUPANG</th>}
                      {showFls && <th className="py-1.5 px-2 border-b border-[#e8d8c8]" colSpan="2">FLORES</th>}
                    </tr>
                    <tr className="bg-[#f7ece1] text-[#4a3f38] text-[7px] md:text-[8px] font-black uppercase tracking-wider">
                      {showMtr && <><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] w-10">JML</th><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] min-w-[70px]">NILAI DPP</th></>}
                      {showKpg && <><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] w-10">JML</th><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] min-w-[70px]">NILAI DPP</th></>}
                      {showFls && <><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] w-10">JML</th><th className="py-1.5 px-2 text-center min-w-[70px]">NILAI DPP</th></>}
                    </tr>
                  </thead>
                  <tbody>
                    {docArea.rows}
                    <tr className="bg-[#ebd5c1] text-[#2b2724] font-black text-[9px] md:text-[10px]">
                      <td className="py-2.5 px-3 text-left border-t border-r border-[#dccaba] uppercase">Grand Total</td>
                      {showMtr && <><td className="py-2.5 px-1 text-center border-t border-r border-[#dccaba]">{docArea.grandMtrC}</td><td className="py-2.5 px-2 text-right border-t border-r border-[#dccaba]">{formatNumberDot(docArea.grandMtrV)}</td></>}
                      {showKpg && <><td className="py-2.5 px-1 text-center border-t border-r border-[#dccaba]">{docArea.grandKpgC}</td><td className="py-2.5 px-2 text-right border-t border-r border-[#dccaba]">{formatNumberDot(docArea.grandKpgV)}</td></>}
                      {showFls && <><td className="py-2.5 px-1 text-center border-t border-r border-[#dccaba]">{docArea.grandFlsC}</td><td className="py-2.5 px-2 text-right border-t border-[#dccaba]">{formatNumberDot(docArea.grandFlsV)}</td></>}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: PRIORITAS */}
          <div className="lg:col-span-5 bg-white border border-[#dccaba] rounded-2xl md:rounded-[1.5rem] p-5 md:p-6 shadow-sm flex flex-col w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-1.5 md:w-2 h-6 md:h-8 bg-[#d87c7c] rounded-full"></div>
                <h3 className="text-xs md:text-[14px] font-black tracking-widest uppercase text-[#2b2724]">PRIORITAS DOKUMEN</h3>
              </div>
              <span className="text-[8px] md:text-[10px] text-[#8f8278] font-bold hidden sm:block">➔ Swipe tabel ke kiri/kanan</span>
            </div>
            
            <div className="flex flex-col mb-4 md:mb-6 w-full max-w-full">
              <h4 className="text-[9px] md:text-[10px] font-black text-[#d87c7c] uppercase mb-2 tracking-widest">PRIORITAS 1</h4>
              <div className="w-full overflow-x-auto rounded-xl md:rounded-2xl border border-[#e8d8c8] bg-white shadow-sm scroll-smooth">
                <table className="w-full text-[10px] md:text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f7ece1] text-[#4a3f38] text-[7px] md:text-[8px] font-black uppercase tracking-wider">
                      <th className="py-2.5 px-3 border-r border-[#e8d8c8] align-middle text-left min-w-[120px]" rowSpan="2">STATUS BERKAS</th>
                      {showMtr && <th className="py-1.5 px-2 border-b border-r border-[#e8d8c8]" colSpan="2">MATARAM</th>}
                      {showKpg && <th className="py-1.5 px-2 border-b border-r border-[#e8d8c8]" colSpan="2">KUPANG</th>}
                      {showFls && <th className="py-1.5 px-2 border-b border-[#e8d8c8]" colSpan="2">FLORES</th>}
                    </tr>
                    <tr className="bg-[#f7ece1] text-[#4a3f38] text-[7px] md:text-[8px] font-black uppercase tracking-wider">
                      {showMtr && <><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] w-10">JML</th><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] min-w-[70px]">NILAI DPP</th></>}
                      {showKpg && <><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] w-10">JML</th><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] min-w-[70px]">NILAI DPP</th></>}
                      {showFls && <><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] w-10">JML</th><th className="py-1.5 px-2 text-center min-w-[70px]">NILAI DPP</th></>}
                    </tr>
                  </thead>
                  <tbody>
                    {prio1.rows}
                    <tr className="bg-[#ebd5c1] text-[#2b2724] font-black text-[9px] md:text-[10px]">
                      <td className="py-2.5 px-3 text-left border-t border-r border-[#dccaba] uppercase">Grand Total</td>
                      {showMtr && <><td className="py-2.5 px-1 text-center border-t border-r border-[#dccaba]">{prio1.grandMtrC}</td><td className="py-2.5 px-2 text-right border-t border-r border-[#dccaba]">{formatNumberDot(prio1.grandMtrV)}</td></>}
                      {showKpg && <><td className="py-2.5 px-1 text-center border-t border-r border-[#dccaba]">{prio1.grandKpgC}</td><td className="py-2.5 px-2 text-right border-t border-r border-[#dccaba]">{formatNumberDot(prio1.grandKpgV)}</td></>}
                      {showFls && <><td className="py-2.5 px-1 text-center border-t border-r border-[#dccaba]">{prio1.grandFlsC}</td><td className="py-2.5 px-2 text-right border-t border-[#dccaba]">{formatNumberDot(prio1.grandFlsV)}</td></>}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex flex-col w-full max-w-full">
              <h4 className="text-[9px] md:text-[10px] font-black text-[#d87c7c] uppercase mb-2 tracking-widest">PRIORITAS 2</h4>
              <div className="w-full overflow-x-auto rounded-xl md:rounded-2xl border border-[#e8d8c8] bg-white shadow-sm scroll-smooth">
                <table className="w-full text-[10px] md:text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f7ece1] text-[#4a3f38] text-[7px] md:text-[8px] font-black uppercase tracking-wider">
                      <th className="py-2.5 px-3 border-r border-[#e8d8c8] align-middle text-left min-w-[120px]" rowSpan="2">STATUS BERKAS</th>
                      {showMtr && <th className="py-1.5 px-2 border-b border-r border-[#e8d8c8]" colSpan="2">MATARAM</th>}
                      {showKpg && <th className="py-1.5 px-2 border-b border-r border-[#e8d8c8]" colSpan="2">KUPANG</th>}
                      {showFls && <th className="py-1.5 px-2 border-b border-[#e8d8c8]" colSpan="2">FLORES</th>}
                    </tr>
                    <tr className="bg-[#f7ece1] text-[#4a3f38] text-[7px] md:text-[8px] font-black uppercase tracking-wider">
                      {showMtr && <><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] w-10">JML</th><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] min-w-[70px]">NILAI DPP</th></>}
                      {showKpg && <><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] w-10">JML</th><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] min-w-[70px]">NILAI DPP</th></>}
                      {showFls && <><th className="py-1.5 px-2 text-center border-r border-[#e8d8c8] w-10">JML</th><th className="py-1.5 px-2 text-center min-w-[70px]">NILAI DPP</th></>}
                    </tr>
                  </thead>
                  <tbody>
                    {prio2.rows}
                    <tr className="bg-[#ebd5c1] text-[#2b2724] font-black text-[9px] md:text-[10px]">
                      <td className="py-2.5 px-3 text-left border-t border-r border-[#dccaba] uppercase">Grand Total</td>
                      {showMtr && <><td className="py-2.5 px-1 text-center border-t border-r border-[#dccaba]">{prio2.grandMtrC}</td><td className="py-2.5 px-2 text-right border-t border-r border-[#dccaba]">{formatNumberDot(prio2.grandMtrV)}</td></>}
                      {showKpg && <><td className="py-2.5 px-1 text-center border-t border-r border-[#dccaba]">{prio2.grandKpgC}</td><td className="py-2.5 px-2 text-right border-t border-r border-[#dccaba]">{formatNumberDot(prio2.grandKpgV)}</td></>}
                      {showFls && <><td className="py-2.5 px-1 text-center border-t border-r border-[#dccaba]">{prio2.grandFlsC}</td><td className="py-2.5 px-2 text-right border-t border-[#dccaba]">{formatNumberDot(prio2.grandFlsV)}</td></>}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* TABEL PLAN GR */}
        <div className="w-full bg-white border border-[#dccaba] rounded-2xl md:rounded-[1.5rem] overflow-hidden mb-6 md:mb-8 shadow-sm">
          <div className="bg-[#f0e0ce] px-4 md:px-6 py-4 md:py-5 font-black text-[#2b2724] flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-4 relative z-10 border-b border-[#e8d8c8]">
            <div className="flex justify-between items-center w-full md:w-auto">
              <span className="tracking-widest uppercase text-sm md:text-lg">PLAN GR NUSRA</span>
              <span className="text-[9px] text-[#2b2724] md:hidden bg-white px-2 py-1 rounded">SWIPE ➔</span>
            </div>
            
            <div className="flex flex-row md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                <span className="text-[9px] md:text-[10px] font-black uppercase text-[#8f8278] tracking-widest bg-[#fcfaf7] px-2 md:px-3 py-1.5 rounded-full border border-[#e8d8c8]">THN:</span>
                <select 
                  value={selectedPlanGrYear} 
                  onChange={(e) => setSelectedPlanGrYear(e.target.value)} 
                  className="appearance-none border border-[#e8d8c8] rounded-lg md:rounded-xl px-2 md:px-4 py-1.5 md:py-2 md:pr-8 text-[10px] md:text-xs font-bold text-[#2b2724] bg-white focus:ring-2 focus:ring-[#8aa7c2] uppercase shadow-sm cursor-pointer hover:bg-[#fcfaf7]"
                >
                  <option value="ALL">SEMUA</option>
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                <span className="text-[9px] md:text-[10px] font-black uppercase text-[#8f8278] tracking-widest bg-[#fcfaf7] px-2 md:px-3 py-1.5 rounded-full border border-[#e8d8c8]">BLN:</span>
                <select 
                  value={selectedMonth} 
                  onChange={(e) => setSelectedMonth(e.target.value)} 
                  className="appearance-none border border-[#e8d8c8] rounded-lg md:rounded-xl px-2 md:px-4 py-1.5 md:py-2 md:pr-8 text-[10px] md:text-xs font-bold text-[#2b2724] bg-white focus:ring-2 focus:ring-[#8aa7c2] uppercase shadow-sm cursor-pointer hover:bg-[#fcfaf7]"
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
            <div className="w-full overflow-x-auto border border-[#e8d8c8] bg-white shadow-sm scroll-smooth rounded-xl md:rounded-2xl">
              <table className="w-full text-[10px] md:text-xs border-collapse">
                <thead>
                  <tr className="bg-[#f7ece1] text-[#4a3f38] text-[7px] md:text-[9px] font-black text-center uppercase tracking-wider">
                    <th className="py-2 md:py-3 px-3 border-r border-[#e8d8c8] align-middle text-left min-w-[100px]" rowSpan="2">JENIS PEKERJAAN</th>
                    <th className="py-1.5 md:py-2 px-2 border-b border-r border-[#e8d8c8]" colSpan="2">MATARAM</th>
                    <th className="py-1.5 md:py-2 px-2 border-b border-r border-[#e8d8c8]" colSpan="2">KUPANG</th>
                    <th className="py-1.5 md:py-2 px-2 border-b border-r border-[#e8d8c8]" colSpan="2">FLORES</th>
                    <th className="py-1.5 md:py-2 px-2 border-b border-[#e8d8c8] bg-[#ebd5c1]" colSpan="2">GRAND TOTAL</th>
                  </tr>
                  <tr className="bg-[#f7ece1] text-[#4a3f38] text-[7px] md:text-[8px] font-black text-center uppercase tracking-wider">
                    <th className="py-1.5 md:py-2 px-2 border-r border-[#e8d8c8]">JML</th>
                    <th className="py-1.5 md:py-2 px-2 border-r border-[#e8d8c8] min-w-[70px]">NILAI DPP</th>
                    <th className="py-1.5 md:py-2 px-2 border-r border-[#e8d8c8]">JML</th>
                    <th className="py-1.5 md:py-2 px-2 border-r border-[#e8d8c8] min-w-[70px]">NILAI DPP</th>
                    <th className="py-1.5 md:py-2 px-2 border-r border-[#e8d8c8]">JML</th>
                    <th className="py-1.5 md:py-2 px-2 border-r border-[#e8d8c8] min-w-[70px]">NILAI DPP</th>
                    <th className="py-1.5 md:py-2 px-2 border-r border-[#e8d8c8] bg-[#ebd5c1]">JML</th>
                    <th className="py-1.5 md:py-2 px-2 border-[#e8d8c8] bg-[#ebd5c1] min-w-[80px]">NILAI DPP</th>
                  </tr>
                </thead>
                <tbody>
                  {planGrRows}
                  <tr className="bg-[#ebd5c1] text-[#2b2724] font-black text-[9px] md:text-[11px] whitespace-nowrap">
                    <td className="py-2.5 md:py-3 px-3 text-left border-t border-r border-[#dccaba] uppercase">Grand Total</td>
                    <td className="py-2.5 md:py-3 px-3 text-center border-t border-r border-[#dccaba]">{grandMtrC_GR}</td>
                    <td className="py-2.5 md:py-3 px-3 text-right border-t border-r border-[#dccaba]">{formatNumberDot(grandMtrV_GR)}</td>
                    <td className="py-2.5 md:py-3 px-3 text-center border-t border-r border-[#dccaba]">{grandKpgC_GR}</td>
                    <td className="py-2.5 md:py-3 px-3 text-right border-t border-r border-[#dccaba]">{formatNumberDot(grandKpgV_GR)}</td>
                    <td className="py-2.5 md:py-3 px-3 text-center border-t border-r border-[#dccaba]">{grandFlsC_GR}</td>
                    <td className="py-2.5 md:py-3 px-3 text-right border-t border-r border-[#dccaba]">{formatNumberDot(grandFlsV_GR)}</td>
                    <td className="py-2.5 md:py-3 px-3 text-center border-t border-r border-[#dccaba] bg-[#dccaba]/50">{grandMtrC_GR + grandKpgC_GR + grandFlsC_GR}</td>
                    <td className="py-2.5 md:py-3 px-3 text-right border-t border-[#dccaba] bg-[#dccaba]/50">{formatNumberDot(grandMtrV_GR + grandKpgV_GR + grandFlsV_GR)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 1. TABEL MATRIX - JUMLAH BERKAS (COUNT) */}
        <div className="w-full bg-white border border-[#dccaba] rounded-2xl md:rounded-[1.5rem] overflow-hidden mb-6 md:mb-8 shadow-sm">
          <div className="bg-[#fcfaf7] px-4 md:px-6 py-4 md:py-5 font-black text-[#2b2724] flex justify-between items-center border-b border-[#e8d8c8]">
            <span className="tracking-widest uppercase text-[11px] md:text-[13px]">STATUS PER MITRA (JML)</span>
            <span className="text-[8px] md:text-[10px] text-[#8f8278] bg-white px-2 py-1 rounded md:hidden border border-[#e8d8c8]">SWIPE KIRI ➔</span>
          </div>
          <div className="w-full overflow-x-auto relative p-1 md:p-2 scroll-smooth bg-white">
            <table className="w-full text-[9px] border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-white text-[#8f8278] font-black text-center uppercase tracking-wider border-b-2 border-[#fcfaf7]">
                  <th className="py-2 md:py-3 px-3 md:px-4 border-b border-[#e8d8c8] align-middle sticky left-0 bg-white z-20 shadow-[2px_0_10px_-2px_rgba(43,39,36,0.05)] text-left">NAMA MITRA</th>
                  {mitraColumns.map(col => (
                    <th key={col} className="py-2 md:py-3 px-2 border-b border-[#e8d8c8] min-w-[80px] md:min-w-[90px] break-words whitespace-normal leading-snug">{col}</th>
                  ))}
                  <th className="py-2 md:py-3 px-3 md:px-4 border-b border-[#e8d8c8] align-middle sticky right-0 bg-[#f0e0ce] text-[#2b2724] z-20 shadow-[-2px_0_10px_-2px_rgba(43,39,36,0.1)]">TOTAL BERKAS</th>
                </tr>
              </thead>
              <tbody>
                {mitraRowsCountHTML.length > 0 ? mitraRowsCountHTML : (
                  <tr>
                    <td colSpan={mitraColumns.length + 2} className="text-center py-6 md:py-8 font-black text-[#8f8278] tracking-widest bg-white">TIDAK ADA DATA MITRA</td>
                  </tr>
                )}
                <tr className="bg-[#f0e0ce] text-[#2b2724] font-black text-[9px] md:text-[10px]">
                  <td className="py-2 md:py-3 px-3 md:px-4 text-left uppercase sticky left-0 bg-[#f0e0ce] z-20 shadow-[2px_0_10px_-2px_rgba(0,0,0,0.1)]">GRAND TOTAL</td>
                  {colCountsMitra.map((tot, idx) => (
                    <td key={idx} className="py-2 md:py-3 px-2 border-r border-[#dccaba] text-center">
                      {tot > 0 ? formatNumberDot(tot) : ''}
                    </td>
                  ))}
                  <td className="py-2 md:py-3 px-3 md:px-4 text-center sticky right-0 bg-[#dccaba] text-[#2b2724] z-20 shadow-[-2px_0_10px_-2px_rgba(0,0,0,0.1)]">
                    {allGrandCountMitra > 0 ? formatNumberDot(allGrandCountMitra) : ''}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. TABEL MATRIX - NILAI DPP */}
        <div className="w-full bg-white border border-[#dccaba] rounded-2xl md:rounded-[1.5rem] overflow-hidden shadow-sm mb-8 md:mb-10">
          <div className="bg-[#fcfaf7] px-4 md:px-6 py-4 md:py-5 font-black text-[#2b2724] flex justify-between items-center border-b border-[#e8d8c8]">
            <span className="tracking-widest uppercase text-[11px] md:text-[13px]">STATUS PER MITRA (NILAI DPP)</span>
            <span className="text-[8px] md:text-[10px] text-[#8f8278] bg-white px-2 py-1 rounded md:hidden border border-[#e8d8c8]">SWIPE KIRI ➔</span>
          </div>
          <div className="w-full overflow-x-auto relative p-1 md:p-2 scroll-smooth bg-white">
            <table className="w-full text-[9px] border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-white text-[#8f8278] font-black text-center uppercase tracking-wider border-b-2 border-[#fcfaf7]">
                  <th className="py-2 md:py-3 px-3 md:px-4 border-b border-[#e8d8c8] align-middle sticky left-0 bg-white z-20 shadow-[2px_0_10px_-2px_rgba(43,39,36,0.05)] text-left">NAMA MITRA</th>
                  {mitraColumns.map(col => (
                    <th key={col} className="py-2 md:py-3 px-2 border-b border-[#e8d8c8] min-w-[80px] md:min-w-[90px] break-words whitespace-normal leading-snug">{col}</th>
                  ))}
                  <th className="py-2 md:py-3 px-3 md:px-4 border-b border-[#e8d8c8] align-middle sticky right-0 bg-[#f0e0ce] text-[#2b2724] z-20 shadow-[-2px_0_10px_-2px_rgba(43,39,36,0.1)]">NILAI DPP</th>
                </tr>
              </thead>
              <tbody>
                {mitraRowsValueHTML.length > 0 ? mitraRowsValueHTML : (
                  <tr>
                    <td colSpan={mitraColumns.length + 2} className="text-center py-6 md:py-8 font-black text-[#8f8278] tracking-widest bg-white">TIDAK ADA DATA MITRA</td>
                  </tr>
                )}
                <tr className="bg-[#f0e0ce] text-[#2b2724] font-black text-[9px] md:text-[10px]">
                  <td className="py-2 md:py-3 px-3 md:px-4 text-left uppercase sticky left-0 bg-[#f0e0ce] z-20 shadow-[2px_0_10px_-2px_rgba(0,0,0,0.1)]">GRAND TOTAL</td>
                  {colTotalsMitra.map((tot, idx) => (
                    <td key={idx} className="py-2 md:py-3 px-2 border-r border-[#dccaba] text-right">
                      {tot > 0 ? formatNumberDot(tot) : ''}
                    </td>
                  ))}
                  <td className="py-2 md:py-3 px-3 md:px-4 text-right sticky right-0 bg-[#dccaba] text-[#2b2724] z-20 shadow-[-2px_0_10px_-2px_rgba(0,0,0,0.1)]">
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