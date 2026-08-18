import React, { useMemo } from "react";

/* =========================================================
   PROCUREMENT NUSRA
   =========================================================
   Tujuan:
   - Menampilkan status procurement dari STATUS BERKAS
   - Mengambil JUMLAH
   - Mengambil NILAI DPP
   - Mengikuti data yang dikirim dari Dashboard
   - Tidak mengubah kalkulasi utama Dashboard
   ========================================================= */


/* =========================================================
   STATUS PROCUREMENT NUSRA
   ========================================================= */

const PROCUREMENT_STATUS = [
  "VERIFIKASI PROC BRANCH",
  "REVISI PROC BRANCH",
  "SIRKULER LTD BRANCH",

  "VERIFIKASI PROC REG",
  "REVISI PROC REG",
  "SIRKULER LTD REG",

  "VERIFIKASI PROC AREA",
  "REVISI PROC AREA",
  "SIRKULER LTD AREA",
];


/* =========================================================
   NORMALIZE TEXT
   ========================================================= */

const normalizeText = (value) => {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
};


/* =========================================================
   GET STATUS
   ========================================================= */

const getStatus = (item) => {
  return normalizeText(
    item?.["STATUS BERKAS"] ??
      item?.["STATUS"] ??
      item?.status ??
      item?.STATUS ??
      ""
  );
};


/* =========================================================
   GET JUMLAH
   ========================================================= */

const getJumlah = (item) => {
  const value =
    item?.["JUMLAH"] ??
    item?.["JML"] ??
    item?.jumlah ??
    item?.jml ??
    0;

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  const text = String(value)
    .trim()
    .replace(/[^\d-]/g, "");

  if (!text) {
    return 0;
  }

  const result = Number(text);

  return Number.isFinite(result)
    ? result
    : 0;
};


/* =========================================================
   GET NILAI DPP
   ========================================================= */

const getNilaiDpp = (item) => {
  const value =
    item?.["NILAI DPP"] ??
    item?.["NILAI_DPP"] ??
    item?.nilaiDpp ??
    item?.nilai ??
    0;

  if (typeof value === "number") {
    return Number.isFinite(value)
      ? value
      : 0;
  }

  let text = String(value).trim();

  if (!text) {
    return 0;
  }

  /*
   * Bersihkan format rupiah / karakter lain
   */
  text = text.replace(/[^\d,.-]/g, "");

  /*
   * Format:
   * 1.234.567,89
   */
  if (
    text.includes(".") &&
    text.includes(",")
  ) {
    text = text
      .replace(/\./g, "")
      .replace(",", ".");
  }

  /*
   * Format:
   * 1234,50
   */
  else if (text.includes(",")) {
    const parts = text.split(",");

    if (
      parts.length === 2 &&
      parts[1].length <= 2
    ) {
      text = text.replace(",", ".");
    } else {
      text = text.replace(/,/g, "");
    }
  }

  /*
   * Format:
   * 1.234.567.890
   */
  else if (text.includes(".")) {
    const parts = text.split(".");

    /*
     * Kalau hanya 1-2 digit di belakang,
     * anggap decimal.
     */
    if (
      parts.length === 2 &&
      parts[1].length <= 2
    ) {
      text = parts.join(".");
    } else {
      text = text.replace(/\./g, "");
    }
  }

  const result = Number(text);

  return Number.isFinite(result)
    ? result
    : 0;
};


/* =========================================================
   FORMAT NUMBER
   ========================================================= */

const formatNumber = (value) => {
  return Number(value || 0).toLocaleString(
    "id-ID"
  );
};


/* =========================================================
   BUILD PROCUREMENT DATA
   ========================================================= */

const buildProcurementData = (data) => {
  const sourceData = Array.isArray(data)
    ? data
    : [];

  /*
   * Jangan menggunakan find().
   *
   * Satu status bisa memiliki banyak row.
   * Semua row harus dijumlahkan.
   */

  return PROCUREMENT_STATUS.map(
    (status) => {

      const rows = sourceData.filter(
        (item) =>
          getStatus(item) === status
      );

      const jumlah = rows.reduce(
        (total, item) =>
          total + getJumlah(item),
        0
      );

      const nilaiDpp = rows.reduce(
        (total, item) =>
          total + getNilaiDpp(item),
        0
      );

      return {
        status,
        jumlah,
        nilaiDpp,
      };
    }
  );
};


/* =========================================================
   COMPONENT
   ========================================================= */

const ProcurementNusra = ({
  data = [],
}) => {

  /* =======================================================
     PROCUREMENT DATA
     ======================================================= */

  const procurementData = useMemo(
    () => buildProcurementData(data),
    [data]
  );


  /* =======================================================
     TOTAL PROCUREMENT
     ======================================================= */

  const totalJumlah = useMemo(() => {
    return procurementData.reduce(
      (total, item) =>
        total + item.jumlah,
      0
    );
  }, [procurementData]);


  const totalNilaiDpp = useMemo(() => {
    return procurementData.reduce(
      (total, item) =>
        total + item.nilaiDpp,
      0
    );
  }, [procurementData]);


  /* =======================================================
     STATUS YANG BENAR-BENAR ADA DATA
     ======================================================= */

  const visibleData = useMemo(() => {
    return procurementData.filter(
      (item) =>
        item.jumlah > 0 ||
        item.nilaiDpp > 0
    );
  }, [procurementData]);


  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-lg
        p-4
        sm:p-5
        lg:p-6
        min-w-0
        h-full
        overflow-hidden
        border
        border-gray-100
        flex
        flex-col
      "
    >

      {/* =================================================
          TITLE
      ================================================= */}

      <h2
        className="
          text-base
          sm:text-lg
          lg:text-xl
          font-bold
          text-center
          border-b
          border-gray-300
          pb-3
          mb-4
        "
      >
        PROCUREMENT NUSRA
      </h2>


      <div
        className="
          flex-1
          min-h-[260px]
          sm:min-h-[300px]
          flex
          items-center
          justify-center
        "
      >

        <div className="w-full">

          {/* =================================================
              TOTAL DOKUMEN
          ================================================= */}

          <div
            className="
              text-center
              border
              border-gray-200
              rounded-xl
              p-4
              mb-3
              bg-gray-50
            "
          >

            <p
              className="
                text-xs
                sm:text-sm
                text-gray-500
                mb-1
              "
            >
              TOTAL DOKUMEN
            </p>

            <p
              className="
                text-2xl
                sm:text-3xl
                font-bold
                text-gray-800
              "
            >
              {formatNumber(totalJumlah)}
            </p>

          </div>


          {/* =================================================
              TOTAL NILAI DPP
          ================================================= */}

          <div
            className="
              text-center
              border
              border-blue-200
              rounded-xl
              p-4
              mb-3
              bg-blue-50
            "
          >

            <p
              className="
                text-xs
                sm:text-sm
                text-gray-500
                mb-1
              "
            >
              TOTAL NILAI DPP
            </p>

            <p
              className="
                text-xl
                sm:text-2xl
                font-bold
                text-blue-700
                break-words
              "
            >
              Rp {formatNumber(totalNilaiDpp)}
            </p>

          </div>


          {/* =================================================
              DETAIL STATUS PROCUREMENT
          ================================================= */}

          <div
            className="
              border
              border-gray-200
              rounded-xl
              overflow-hidden
              bg-white
            "
          >

            {visibleData.length === 0 ? (

              <div
                className="
                  text-center
                  text-sm
                  text-gray-500
                  p-4
                "
              >
                Tidak ada data Procurement Nusra
              </div>

            ) : (

              <div
                className="
                 max-h-[260px]
                  overflow-y-auto
                "
              >

                {visibleData.map((item) => (

                  <div
                    key={item.status}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-3
                      px-3
                      py-2
                      border-b
                      border-gray-100
                      last:border-b-0
                    "
                  >

                    {/* STATUS */}

                    <div
                      className="
                        min-w-0
                        flex-1
                      "
                    >

                      <p
                        className="
                          text-xs
                          font-semibold
                          text-gray-700
                          truncate
                        "
                        title={item.status}
                      >
                        {item.status}
                      </p>

                      <p
                        className="
                          text-[11px]
                          text-gray-400
                        "
                      >
                        {formatNumber(
                          item.jumlah
                        )} dokumen
                      </p>

                    </div>


                    {/* NILAI DPP */}

                    <p
                      className="
                        text-xs
                        sm:text-sm
                        font-bold
                        text-gray-800
                        whitespace-nowrap
                      "
                    >
                      Rp{" "}
                      {formatNumber(
                        item.nilaiDpp
                      )}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};


export default ProcurementNusra;