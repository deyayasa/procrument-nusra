import React, { useMemo } from "react";
import "./BarChart.css";

/* =========================================================
   FORMAT RUPIAH
========================================================= */

function formatRupiah(value) {
  const number = Number(value) || 0;

  return (
    "Rp" +
    new Intl.NumberFormat("id-ID").format(number)
  );
}


/* =========================================================
   NORMALISASI STATUS
========================================================= */

function normalizeStatus(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
}


/* =========================================================
   PARSE NILAI DPP
========================================================= */

function parseNilaiDpp(value) {
  if (typeof value === "number") {
    return value;
  }

  if (value === null || value === undefined) {
    return 0;
  }

  const cleaned = String(value)
    .replace(/[^\d.-]/g, "");

  return Number(cleaned) || 0;
}


/* =========================================================
   MASTER STATUS NOK DOK
========================================================= */

const NOK_DOK_STATUS = [
  "OGP REKON",
  "PEKERJAAN OGP",
];


/* =========================================================
   MASTER STATUS OPEN DOK
========================================================= */

const OPEN_DOK_STATUS = [
  "PEMBERKASAN MITRA",
  "SIRKULER TTD BRANCH",
  "SIRKULER TTD REG",
  "REVISI PROC BRANCH",
  "REVISI PROC REG",
  "VERIFIKASI PROC BRANCH",
  "VERIFIKASI PROC REG",
  "PROSES FINANCE HO",
  "REVISI PROC AREA",
  "VERIFIKASI FINANCE AREA",
  "VERIFIKASI PROC AREA",
];


/* =========================================================
   BAR ITEM
========================================================= */

function BarItem({
  label,
  value,
  percentage,
  backgroundColor,
}) {
  return (
    <div className="bar-row">

      {/* LABEL */}

      <div className="bar-label">
        {label}
      </div>


      {/* BAR */}

      <div className="bar-container">

        <div
          className="bar"
          style={{
            width: `${percentage}%`,
            backgroundColor,
          }}
        >

          <span className="bar-value">
            {formatRupiah(value)}
          </span>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   BAR CHART
========================================================= */

export default function BarChart({
  data = [],

  /*
    Fallback props.
    Tetap disediakan supaya tidak error
    apabila komponen dipakai di tempat lain.
  */
  nokDok = 0,
  openDok = 0,
}) {

  /* =======================================================
     HITUNG NOK DOK & OPEN DOK
     
     SUMBER UTAMA:
     STATUS BERKAS + NILAI DPP
  ======================================================= */

  const calculatedData = useMemo(() => {

    let calculatedNokDok = 0;
    let calculatedOpenDok = 0;


    /* =====================================================
       DATA DARI DASHBOARD
    ===================================================== */

    if (Array.isArray(data) && data.length > 0) {

      data.forEach((item) => {

        /*
          Bentuk data bisa:
          {
            status,
            nilaiDpp
          }

          atau data mentah:
          {
            "STATUS BERKAS": "...",
            "NILAI DPP": ...
          }
        */

        const status = normalizeStatus(
          item?.status ??
          item?.["STATUS BERKAS"]
        );


        const nilaiDpp = parseNilaiDpp(
          item?.nilaiDpp ??
          item?.["NILAI DPP"]
        );


        if (!status) {
          return;
        }


        /* ================================================
           NOK DOK
        ================================================= */

        if (NOK_DOK_STATUS.includes(status)) {

          calculatedNokDok += nilaiDpp;

          return;
        }


        /* ================================================
           OPEN DOK
        ================================================= */

        if (OPEN_DOK_STATUS.includes(status)) {

          calculatedOpenDok += nilaiDpp;

          return;
        }

      });


      return {
        nokDok: calculatedNokDok,
        openDok: calculatedOpenDok,
      };
    }


    /* =====================================================
       FALLBACK
       
       Dipakai hanya jika data belum dikirim.
    ===================================================== */

    return {
      nokDok: Number(nokDok) || 0,
      openDok: Number(openDok) || 0,
    };

  }, [data, nokDok, openDok]);


  /* =======================================================
     NILAI AKHIR
  ======================================================= */

  const nokDokValue =
    Number(calculatedData.nokDok) || 0;

  const openDokValue =
    Number(calculatedData.openDok) || 0;


  /* =======================================================
     MAX VALUE
     
     Bar terpanjang = 100%
  ======================================================= */

  const maxValue = Math.max(
    nokDokValue,
    openDokValue,
    1
  );


  /* =======================================================
     PERSENTASE
  ======================================================= */

  const nokDokPercentage =
    (nokDokValue / maxValue) * 100;

  const openDokPercentage =
    (openDokValue / maxValue) * 100;


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="bar-chart">

      {/* ===================================================
          TITLE
      =================================================== */}

      <h2 className="bar-chart-title">
        TOTAL OPEN
      </h2>


      {/* ===================================================
          NOK DOK
      =================================================== */}

      <BarItem
        label="NOK DOK"
        value={nokDokValue}
        percentage={nokDokPercentage}
        backgroundColor="#FF0000"
      />


      {/* ===================================================
          OPEN DOK
      =================================================== */}

      <BarItem
        label="OPEN DOK"
        value={openDokValue}
        percentage={openDokPercentage}
        backgroundColor="#72A7E8"
      />

    </div>
  );
}