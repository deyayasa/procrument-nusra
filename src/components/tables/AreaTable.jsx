import React from "react";

/* =========================================================
   NORMALIZE TEXT
========================================================= */

const normalize = (value) => {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
};

/* =========================================================
   NORMALIZE NUMBER
========================================================= */

const normalizeNumber = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return 0;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  let text = String(value).trim();

  if (!text) {
    return 0;
  }

  // Hapus Rp, spasi, dan karakter aneh
  text = text.replace(/[^\d,.-]/g, "");

  if (!text) {
    return 0;
  }

  // Contoh:
  // 1.381.323.137,50
  // menjadi:
  // 1381323137.50
  if (
    text.includes(".") &&
    text.includes(",")
  ) {
    text = text
      .replace(/\./g, "")
      .replace(",", ".");
  }

  // Contoh:
  // 1381323137,50
  else if (text.includes(",")) {
    text = text.replace(",", ".");
  }

  // Contoh:
  // 1.381.323.137
  else if (text.includes(".")) {
    const parts = text.split(".");

    // 100.50 dianggap desimal
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

  return Number.isFinite(result) ? result : 0;
};

/* =========================================================
   FORMAT NUMBER INDONESIA
========================================================= */

const formatNumber = (value) => {
  const number = normalizeNumber(value);

  if (number === 0) {
    return "-";
  }

  return new Intl.NumberFormat("id-ID").format(number);
};

/* =========================================================
   GET STATUS
========================================================= */

const getStatus = (item) => {
  if (!item) {
    return "";
  }

  return normalize(
    item["STATUS BERKAS"] ??
      item["STATUS BERKAS 1"] ??
      item.status ??
      item.STATUS
  );
};

/* =========================================================
   GET NILAI DPP
========================================================= */

const getNilaiDpp = (item) => {
  if (!item) {
    return 0;
  }

  return normalizeNumber(
    item["NILAI DPP"] ??
      item["NILAI_DPP"] ??
      item.nilaiDpp ??
      item.nilai_dpp ??
      item.nilai ??
      0
  );
};

/* =========================================================
   STATUS AREA & HO
========================================================= */

const AREA_HO_STATUS = [
  "VERIFIKASI PROC AREA",
  "REVISI PROC AREA",
  "SIRKULER TTD AREA",
  "VERIFIKASI FINANCE AREA",
  "REVISI FINANCE AREA",
];

/* =========================================================
   STATUS ALIAS

   Data lama:
   SIRKULER LTD AREA

   Data baru:
   SIRKULER TTD AREA

   Keduanya dianggap sama.
========================================================= */

const STATUS_ALIASES = {
  "SIRKULER TTD AREA": [
    "SIRKULER TTD AREA",
    "SIRKULER LTD AREA",
  ],
};

/* =========================================================
   CEK STATUS
========================================================= */

const statusMatches = (
  itemStatus,
  targetStatus
) => {
  const normalizedItemStatus =
    normalize(itemStatus);

  const normalizedTargetStatus =
    normalize(targetStatus);

  const aliases =
    STATUS_ALIASES[normalizedTargetStatus] || [
      normalizedTargetStatus,
    ];

  return aliases.includes(
    normalizedItemStatus
  );
};

/* =========================================================
   GET DATA PER STATUS
========================================================= */

const getData = (
  data,
  targetStatus
) => {
  if (!Array.isArray(data)) {
    return {
      jumlah: 0,
      nilai: 0,
    };
  }

  const rows = data.filter((item) => {
    const status = getStatus(item);

    return statusMatches(
      status,
      targetStatus
    );
  });

  const jumlah = rows.length;

  const nilai = rows.reduce(
    (total, item) => {
      return (
        total +
        getNilaiDpp(item)
      );
    },
    0
  );

  return {
    jumlah,
    nilai,
  };
};

/* =========================================================
   BUILD TABLE DATA
========================================================= */

const buildTableData = (data) => {
  return AREA_HO_STATUS.map(
    (status) => ({
      status,
      ...getData(
        data,
        status
      ),
    })
  );
};

/* =========================================================
   GRAND TOTAL
========================================================= */

const getGrandTotal = (
  tableData
) => {
  return tableData.reduce(
    (total, item) => ({
      jumlah:
        total.jumlah +
        item.jumlah,

      nilai:
        total.nilai +
        item.nilai,
    }),
    {
      jumlah: 0,
      nilai: 0,
    }
  );
};

/* =========================================================
   COMPONENT
========================================================= */

const AreaTable = ({
  data = [],
}) => {
  const safeData =
    Array.isArray(data)
      ? data
      : [];

  const tableData =
    buildTableData(
      safeData
    );

  const grandTotal =
    getGrandTotal(
      tableData
    );

  return (
    <div
      className="
        w-full
        min-w-0
        bg-white
        rounded-2xl
        shadow-lg
        p-4
        sm:p-6
        overflow-hidden
      "
    >
      <div
        className="
          w-full
          overflow-x-auto
          overflow-y-hidden
        "
      >
        <table
          className="
            w-full
            min-w-[680px]
            border-collapse
            text-xs
            sm:text-sm
            bg-white
            table-auto
          "
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <thead>
            <tr className="bg-blue-900 text-white">

              <th
                className="
                  border
                  border-white
                  px-3
                  sm:px-4
                  py-2
                  sm:py-3
                  text-left
                  font-bold
                  whitespace-nowrap
                  min-w-[260px]
                "
              >
                STATUS
              </th>

              <th
                className="
                  border
                  border-white
                  px-3
                  sm:px-4
                  py-2
                  sm:py-3
                  text-center
                  font-bold
                  whitespace-nowrap
                  w-[100px]
                "
              >
                BERKAS
              </th>

              <th
                className="
                  border
                  border-white
                  px-3
                  sm:px-4
                  py-2
                  sm:py-3
                  text-right
                  font-bold
                  whitespace-nowrap
                  w-[220px]
                "
              >
                NILAI DPP
              </th>

            </tr>
          </thead>

          {/* =================================================
              BODY
          ================================================= */}

          <tbody>

            {tableData.map(
              (item) => (
                <tr
                  key={item.status}
                  className="
                    hover:bg-gray-50
                    transition-colors
                  "
                >

                  <td
                    className="
                      border
                      border-gray-400
                      px-3
                      sm:px-4
                      py-2
                      sm:py-3
                      text-left
                      font-medium
                      whitespace-nowrap
                      min-w-[260px]
                      text-gray-800
                    "
                  >
                    {item.status}
                  </td>

                  <td
                    className="
                      border
                      border-gray-400
                      px-3
                      sm:px-4
                      py-2
                      sm:py-3
                      text-center
                      font-semibold
                      whitespace-nowrap
                      text-gray-800
                    "
                  >
                    {formatNumber(
                      item.jumlah
                    )}
                  </td>

                  <td
                    className="
                      border
                      border-gray-400
                      px-3
                      sm:px-4
                      py-2
                      sm:py-3
                      text-right
                      whitespace-nowrap
                      text-gray-800
                    "
                  >
                    Rp{" "}
                    {formatNumber(
                      item.nilai
                    )}
                  </td>

                </tr>
              )
            )}

            {/* =================================================
                GRAND TOTAL
            ================================================= */}

            <tr
              className="
                bg-blue-900
                text-white
                font-bold
              "
            >

              <td
                className="
                  border
                  border-white
                  px-3
                  sm:px-4
                  py-2
                  sm:py-3
                  text-left
                  whitespace-nowrap
                "
              >
                GRAND TOTAL
              </td>

              <td
                className="
                  border
                  border-white
                  px-3
                  sm:px-4
                  py-2
                  sm:py-3
                  text-center
                  whitespace-nowrap
                "
              >
                {formatNumber(
                  grandTotal.jumlah
                )}
              </td>

              <td
                className="
                  border
                  border-white
                  px-3
                  sm:px-4
                  py-2
                  sm:py-3
                  text-right
                  whitespace-nowrap
                "
              >
                Rp{" "}
                {formatNumber(
                  grandTotal.nilai
                )}
              </td>

            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AreaTable;