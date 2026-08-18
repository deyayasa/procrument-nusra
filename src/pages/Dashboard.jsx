import React, { useState } from 'react';
import useDashboard from "../hooks/useDashboard.js"; 
import { formatNumberDot } from "../utils/dashboardCalculations.js"; 

const Dashboard = () => {
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
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

  // Bar Percentage
  const barTotalOpen = nokDokValue + openDokValue; 
  const barNokDok = nokDokValue; 
  const barOpenDok = openDokValue; 
  const pctNokDok = barTotalOpen > 0 ? (barNokDok / barTotalOpen) * 100 : 0;
  const pctOpenDok = barTotalOpen > 0 ? (barOpenDok / barTotalOpen) * 100 : 0;

  const showMtr = selectedBranch === 'ALL' || selectedBranch === 'MATARAM';
  const showKpg = selectedBranch === 'ALL' || selectedBranch === 'KUPANG';

  const renderDynamicTableRows = (mapData) => {
    let grandMtrC = 0, grandMtrV = 0, grandKpgC = 0, grandKpgV = 0;
    const safeMap = mapData || {};
    
    const rows = Object.keys(safeMap).map((status, idx) => {
      const item = safeMap[status] || { mataram: { count: 0, nilaiDPP: 0 }, kupang: { count: 0, nilaiDPP: 0 } };
      grandMtrC += item.mataram.count; grandMtrV += item.mataram.nilaiDPP;
      grandKpgC += item.kupang.count; grandKpgV += item.kupang.nilaiDPP;
      
      return (
        <tr key={idx} className="border-b border-black hover:bg-gray-100 text-[10px] text-black font-semibold bg-white whitespace-nowrap">
          <td className="py-1.5 px-2 border border-black uppercase">{status}</td>
          {showMtr && (
            <>
              <td className="py-1.5 px-1 text-center border border-black">{item.mataram.count}</td>
              <td className="py-1.5 px-2 text-right border border-black">{item.mataram.nilaiDPP > 0 ? formatNumberDot(item.mataram.nilaiDPP) : '0'}</td>
            </>
          )}
          {showKpg && (
            <>
              <td className="py-1.5 px-1 text-center border border-black">{item.kupang.count}</td>
              <td className="py-1.5 px-2 text-right border border-black">{item.kupang.nilaiDPP > 0 ? formatNumberDot(item.kupang.nilaiDPP) : '0'}</td>
            </>
          )}
        </tr>
      );
    });

    return { rows, grandMtrC, grandMtrV, grandKpgC, grandKpgV };
  };

  // Plan GR Calculation
  const planGrMap = tables.planGrMap || {};
  const defaultJpList = ['KONSTRUKSI', 'MS CAPEX', 'MS OPEX', 'PROVISIONING', 'SDI', 'KELOLA NTE', 'DISMANTLING'];
  const jenisPekerjaanList = [...defaultJpList];
  Object.keys(planGrMap).forEach(k => { if (!jenisPekerjaanList.includes(k) && k !== '') jenisPekerjaanList.push(k); });
  
  let grandMtrC_GR = 0, grandMtrV_GR = 0;
  let grandKpgC_GR = 0, grandKpgV_GR = 0;

  const planGrRows = jenisPekerjaanList.map((jp) => {
    const rowMonths = planGrMap[jp] || {};
    let mtrC = 0, mtrV = 0, kpgC = 0, kpgV = 0;

    const monthsToProcess = selectedMonth === 'ALL' ? availableMonths : [selectedMonth];

    monthsToProcess.forEach(m => {
      const mData = rowMonths[m] || { mataram: { count: 0, nilaiDPP: 0 }, kupang: { count: 0, nilaiDPP: 0 } };
      mtrC += mData.mataram.count;
      mtrV += mData.mataram.nilaiDPP;
      kpgC += mData.kupang.count;
      kpgV += mData.kupang.nilaiDPP;
    });

    grandMtrC_GR += mtrC;
    grandMtrV_GR += mtrV;
    grandKpgC_GR += kpgC;
    grandKpgV_GR += kpgV;

    const rowTotalC = mtrC + kpgC;
    const rowTotalV = mtrV + kpgV;

    return (
      <tr key={jp} className="border-b border-gray-400 hover:bg-gray-100 text-[11px] text-black font-semibold bg-white">
        <td className="py-1.5 px-3 border border-gray-400 uppercase">{jp}</td>
        <td className="py-1.5 px-3 text-center border border-gray-400">{mtrC}</td>
        <td className="py-1.5 px-3 text-right border border-gray-400">{mtrV > 0 ? formatNumberDot(mtrV) : '0'}</td>
        <td className="py-1.5 px-3 text-center border border-gray-400">{kpgC}</td>
        <td className="py-1.5 px-3 text-right border border-gray-400">{kpgV > 0 ? formatNumberDot(kpgV) : '0'}</td>
        <td className="py-1.5 px-3 text-center border border-gray-400 bg-gray-50">{rowTotalC}</td>
        <td className="py-1.5 px-3 text-right border border-gray-400 bg-gray-50">{rowTotalV > 0 ? formatNumberDot(rowTotalV) : '0'}</td>
      </tr>
    );
  });

  const docBranch = renderDynamicTableRows(tables.docBranchMap || {});
  const docArea = renderDynamicTableRows(tables.docAreaMap || {});
  const prio1 = renderDynamicTableRows(tables.prio1Map || {});
  const prio2 = renderDynamicTableRows(tables.prio2Map || {});

  return (
    <div className="bg-[#f4f7fb] min-h-screen p-6 font-sans">
      {error && <div className="mb-4 bg-red-100 text-red-600 border border-red-300 p-3 text-sm font-bold">{String(error)}</div>}

      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight uppercase">Procurement Nusra</h1>
          <p className="text-sm font-bold text-gray-600">Dashboard Monitoring Tagihan Mitra NUSRA 2026</p>
        </div>
        {loading && <div className="text-sm text-gray-600 font-bold animate-pulse">Memuat Data...</div>}
      </div>

      {/* FILTER BAR ATAS */}
      <div className="bg-white border border-gray-300 p-4 shadow-sm mb-4 flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-sm font-extrabold text-black uppercase tracking-wide">FILTER DATA</h2>
          <p className="text-xs text-gray-500 mt-1">Pilih branch dan tahun untuk melihat data</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)} className="border-2 border-gray-400 px-3 py-2 text-sm font-bold text-black bg-white focus:outline-none focus:border-[#04235c] w-full sm:w-48 uppercase">
            <option value="ALL">SEMUA BRANCH</option>
            <option value="MATARAM">MATARAM</option>
            <option value="KUPANG">KUPANG</option>
          </select>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="border-2 border-gray-400 px-3 py-2 text-sm font-bold text-black bg-white focus:outline-none focus:border-[#04235c] w-full sm:w-44 uppercase">
            <option value="ALL">SEMUA TAHUN</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* BALOK SUMMARY UTAMA */}
      <div className="bg-[#04235c] text-white grid grid-cols-4 text-center py-3 px-2 border border-black shadow-sm mb-6">
        <div className="flex flex-col border-r border-gray-500 pr-2">
          <span className="text-[#facc15] font-extrabold text-xs uppercase mb-1">TOTAL</span>
          <span className="font-bold text-sm sm:text-base tracking-tight">{formatNumberDot(totalValue)}</span>
        </div>
        <div className="flex flex-col border-r border-gray-500 px-2">
          <span className="text-[#10b981] font-extrabold text-xs uppercase mb-1">CASH BANK</span>
          <span className="font-bold text-sm sm:text-base tracking-tight">{formatNumberDot(cashBankValue)}</span>
        </div>
        <div className="flex flex-col border-r border-gray-500 px-2">
          <span className="text-[#38bdf8] font-extrabold text-xs uppercase mb-1">DOK OGP</span>
          <span className="font-bold text-sm sm:text-base tracking-tight">{formatNumberDot(dokOgpValue)}</span>
        </div>
        <div className="flex flex-col pl-2">
          <span className="text-[#ef4444] font-extrabold text-xs uppercase mb-1">CANCEL PO</span>
          <span className="font-bold text-sm sm:text-base tracking-tight">{formatNumberDot(cancelValue)}</span>
        </div>
      </div>

      {/* GRID KONTEN TENGAH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-6">
        {/* KOLOM KIRI: DONUT CHART & TOTAL OPEN BAR */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-white border border-black shadow-sm overflow-hidden p-6 flex flex-col items-center">
            <div 
              className="relative w-44 h-44 rounded-full shadow-inner" 
              style={{ background: `conic-gradient(#387c2b 0% ${endCash}%, #f2b604 ${endCash}% ${endOgp}%, #e84c3d ${endOgp}% 100%)` }}
            >
              <div className="absolute inset-0 m-auto w-16 h-16 bg-white rounded-full"></div>
            </div>
            <div className="flex justify-center gap-3 mt-8 w-full">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#387c2b]"></div><span className="text-[8px] font-black text-black uppercase">CASH BANK ({pctCash.toFixed(1)}%)</span></div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#f2b604]"></div><span className="text-[8px] font-black text-black uppercase">DOK OGP ({pctOgp.toFixed(1)}%)</span></div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#e84c3d]"></div><span className="text-[8px] font-black text-black uppercase">CANCEL PO ({pctCancel.toFixed(1)}%)</span></div>
            </div>
          </div>

          <div className="bg-white p-5 shadow-sm border border-black">
            <div className="w-32 border border-black mb-4">
              <div className="bg-[#10b981] text-white text-center text-[10px] font-black py-1">TOTAL OPEN</div>
              <div className="bg-black text-white text-center text-xs font-bold py-1.5">{formatNumberDot(barTotalOpen)}</div>
            </div>
            <div className="border border-black p-4 pt-5">
              <div className="flex items-center mb-4">
                <div className="w-10 text-[9px] text-black text-center font-bold">NOK<br/>DOK</div>
                <div className="flex-1 h-7 bg-white border-y border-r border-black">
                  <div className="bg-[#ff0000] h-full flex items-center justify-end px-2" style={{ width: `${pctNokDok}%` }}>
                    <span className="text-white font-bold text-[10px]">{formatNumberDot(barNokDok)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-1">
                <div className="w-10 text-[9px] text-black text-center font-bold">OPEN<br/>DOK</div>
                <div className="flex-1 h-7 bg-white border-y border-r border-black">
                  <div className="bg-[#7aa2ed] h-full flex items-center justify-end px-2" style={{ width: `${pctOpenDok}%` }}>
                    <span className="text-black font-bold text-[10px]">{formatNumberDot(barOpenDok)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM TENGAH: OPEN DOKUMEN */}
        <div className="lg:col-span-4 bg-white p-5 shadow-sm border border-gray-400 min-h-[400px] flex flex-col">
          <div className="bg-[#04235c] text-white py-3 flex items-center justify-center mb-5">
            <h3 className="text-[14px] font-bold tracking-widest m-0 uppercase">OPEN DOKUMEN</h3>
          </div>
          <div className="flex flex-col mb-6">
            <h4 className="text-[12px] font-black text-black uppercase mb-1.5">DOKUMEN BRANCH</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse border border-black">
                <thead>
                  <tr className="bg-[#04235c] text-white text-[9px] font-bold uppercase">
                    <th className="py-1.5 px-2 border border-black align-middle" rowSpan="2">STATUS BERKAS</th>
                    {showMtr && <th className="py-1 px-2 border border-black" colSpan="2">MATARAM</th>}
                    {showKpg && <th className="py-1 px-2 border border-black" colSpan="2">KUPANG</th>}
                  </tr>
                  <tr className="bg-[#04235c] text-white text-[9px] font-bold uppercase">
                    {showMtr && <><th className="py-1 px-2 text-center border border-black w-14">JML BERKAS</th><th className="py-1 px-2 text-center border border-black">NILAI DPP</th></>}
                    {showKpg && <><th className="py-1 px-2 text-center border border-black w-14">JML BERKAS</th><th className="py-1 px-2 text-center border border-black">NILAI DPP</th></>}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {docBranch.rows}
                  <tr className="bg-[#04235c] text-white font-bold text-[10px]">
                    <td className="py-1.5 px-2 text-center border border-black">Grand Total</td>
                    {showMtr && <><td className="py-1.5 px-1 text-center border border-black">{docBranch.grandMtrC}</td><td className="py-1.5 px-2 text-right border border-black">{formatNumberDot(docBranch.grandMtrV)}</td></>}
                    {showKpg && <><td className="py-1.5 px-1 text-center border border-black">{docBranch.grandKpgC}</td><td className="py-1.5 px-2 text-right border border-black">{formatNumberDot(docBranch.grandKpgV)}</td></>}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <h4 className="text-[12px] font-black text-black uppercase mb-1.5">DOKUMEN AREA & HO</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse border border-black">
                <thead>
                  <tr className="bg-[#04235c] text-white text-[9px] font-bold uppercase">
                    <th className="py-1.5 px-2 border border-black align-middle" rowSpan="2">STATUS BERKAS</th>
                    {showMtr && <th className="py-1 px-2 border border-black" colSpan="2">MATARAM</th>}
                    {showKpg && <th className="py-1 px-2 border border-black" colSpan="2">KUPANG</th>}
                  </tr>
                  <tr className="bg-[#04235c] text-white text-[9px] font-bold uppercase">
                    {showMtr && <><th className="py-1 px-2 text-center border border-black w-14">JML BERKAS</th><th className="py-1 px-2 text-center border border-black">NILAI DPP</th></>}
                    {showKpg && <><th className="py-1 px-2 text-center border border-black w-14">JML BERKAS</th><th className="py-1 px-2 text-center border border-black">NILAI DPP</th></>}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {docArea.rows}
                  <tr className="bg-[#04235c] text-white font-bold text-[10px]">
                    <td className="py-1.5 px-2 text-center border border-black">Grand Total</td>
                    {showMtr && <><td className="py-1.5 px-1 text-center border border-black">{docArea.grandMtrC}</td><td className="py-1.5 px-2 text-right border border-black">{formatNumberDot(docArea.grandMtrV)}</td></>}
                    {showKpg && <><td className="py-1.5 px-1 text-center border border-black">{docArea.grandKpgC}</td><td className="py-1.5 px-2 text-right border border-black">{formatNumberDot(docArea.grandKpgV)}</td></>}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: PRIORITAS */}
        <div className="lg:col-span-5 bg-white p-5 shadow-sm border border-gray-400 min-h-[400px] flex flex-col">
          <div className="bg-[#04235c] text-white py-3 flex items-center justify-center mb-5">
            <h3 className="text-[14px] font-bold tracking-widest m-0 uppercase">PRIORITAS DOKUMEN</h3>
          </div>
          <div className="flex flex-col mb-6">
            <h4 className="text-[12px] font-black text-black uppercase mb-1.5">PRIORITAS 1</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse border border-black">
                <thead>
                  <tr className="bg-[#04235c] text-white text-[9px] font-bold uppercase">
                    <th className="py-1.5 px-2 border border-black align-middle" rowSpan="2">STATUS BERKAS</th>
                    {showMtr && <th className="py-1 px-2 border border-black" colSpan="2">MATARAM</th>}
                    {showKpg && <th className="py-1 px-2 border border-black" colSpan="2">KUPANG</th>}
                  </tr>
                  <tr className="bg-[#04235c] text-white text-[9px] font-bold uppercase">
                    {showMtr && <><th className="py-1 px-2 text-center border border-black w-14">JML BERKAS</th><th className="py-1 px-2 text-center border border-black">NILAI DPP</th></>}
                    {showKpg && <><th className="py-1 px-2 text-center border border-black w-14">JML BERKAS</th><th className="py-1 px-2 text-center border border-black">NILAI DPP</th></>}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {prio1.rows}
                  <tr className="bg-[#04235c] text-white font-bold text-[10px]">
                    <td className="py-1.5 px-2 text-center border border-black">Grand Total</td>
                    {showMtr && <><td className="py-1.5 px-1 text-center border border-black">{prio1.grandMtrC}</td><td className="py-1.5 px-2 text-right border border-black">{formatNumberDot(prio1.grandMtrV)}</td></>}
                    {showKpg && <><td className="py-1.5 px-1 text-center border border-black">{prio1.grandKpgC}</td><td className="py-1.5 px-2 text-right border border-black">{formatNumberDot(prio1.grandKpgV)}</td></>}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <h4 className="text-[12px] font-black text-black uppercase mb-1.5">PRIORITAS 2</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse border border-black">
                <thead>
                  <tr className="bg-[#04235c] text-white text-[9px] font-bold uppercase">
                    <th className="py-1.5 px-2 border border-black align-middle" rowSpan="2">STATUS BERKAS</th>
                    {showMtr && <th className="py-1 px-2 border border-black" colSpan="2">MATARAM</th>}
                    {showKpg && <th className="py-1 px-2 border border-black" colSpan="2">KUPANG</th>}
                  </tr>
                  <tr className="bg-[#04235c] text-white text-[9px] font-bold uppercase">
                    {showMtr && <><th className="py-1 px-2 text-center border border-black w-14">JML BERKAS</th><th className="py-1 px-2 text-center border border-black">NILAI DPP</th></>}
                    {showKpg && <><th className="py-1 px-2 text-center border border-black w-14">JML BERKAS</th><th className="py-1 px-2 text-center border border-black">NILAI DPP</th></>}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {prio2.rows}
                  <tr className="bg-[#04235c] text-white font-bold text-[10px]">
                    <td className="py-1.5 px-2 text-center border border-black">Grand Total</td>
                    {showMtr && <><td className="py-1.5 px-1 text-center border border-black">{prio2.grandMtrC}</td><td className="py-1.5 px-2 text-right border border-black">{formatNumberDot(prio2.grandMtrV)}</td></>}
                    {showKpg && <><td className="py-1.5 px-1 text-center border border-black">{prio2.grandKpgC}</td><td className="py-1.5 px-2 text-right border border-black">{formatNumberDot(prio2.grandKpgV)}</td></>}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* TABEL PLAN GR PALING BAWAH */}
      <div className="bg-white shadow-sm border border-gray-400 overflow-hidden">
        <div className="bg-[#fff000] px-4 py-2 font-black text-black text-[14px] border-b border-gray-400 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <span>PLAN GR NUSRA 2026</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase">FILTER BULAN:</span>
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)} 
              className="border-2 border-gray-400 px-3 py-1 text-xs font-bold text-black bg-white focus:outline-none uppercase"
            >
              <option value="ALL">SEMUA BULAN (JAN - DES)</option>
              {availableMonths.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-4 overflow-x-auto">
          <table className="w-full text-xs border border-gray-400 border-collapse">
            <thead>
              <tr className="bg-[#04235c] text-white text-[10px] font-bold text-center">
                <th className="py-2 px-2 border border-gray-400 align-middle" rowSpan="2">JENIS PEKERJAAN</th>
                <th className="py-1 px-2 border border-gray-400" colSpan="2">MATARAM</th>
                <th className="py-1 px-2 border border-gray-400" colSpan="2">KUPANG</th>
                <th className="py-1 px-2 border border-gray-400" colSpan="2">GRAND TOTAL</th>
              </tr>
              <tr className="bg-[#04235c] text-white text-[9px] font-bold text-center">
                <th className="py-1.5 px-2 border border-gray-400">JML BERKAS</th>
                <th className="py-1.5 px-2 border border-gray-400">NILAI DPP</th>
                <th className="py-1.5 px-2 border border-gray-400">JML BERKAS</th>
                <th className="py-1.5 px-2 border border-gray-400">NILAI DPP</th>
                <th className="py-1.5 px-2 border border-gray-400">JML BERKAS</th>
                <th className="py-1.5 px-2 border border-gray-400">NILAI DPP</th>
              </tr>
            </thead>
            <tbody>
              {planGrRows}
              <tr className="bg-[#04235c] text-white font-bold text-[11px]">
                <td className="py-1.5 px-3 text-center border border-gray-400">Grand Total</td>
                <td className="py-1.5 px-3 text-center border border-gray-400">{grandMtrC_GR}</td>
                <td className="py-1.5 px-3 text-right border border-gray-400">{formatNumberDot(grandMtrV_GR)}</td>
                <td className="py-1.5 px-3 text-center border border-gray-400">{grandKpgC_GR}</td>
                <td className="py-1.5 px-3 text-right border border-gray-400">{formatNumberDot(grandKpgV_GR)}</td>
                <td className="py-1.5 px-3 text-center border border-gray-400">{grandMtrC_GR + grandKpgC_GR}</td>
                <td className="py-1.5 px-3 text-right border border-gray-400">{formatNumberDot(grandMtrV_GR + grandKpgV_GR)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;