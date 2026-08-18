import React, {
  useMemo,
} from "react";

/* =========================================================
   OPEN DOCUMENT CONFIG
========================================================= */

const OPEN_DOCUMENT_CONFIG = [
  {
    label: "01 PEKERJAAN OGP",
    statuses: [
      "OGP REKON",
      "PEKERJAAN OGP",
    ],
  },

  {
    label: "02 PROGRESS REKON",
    statuses: [
      "PROGRESS REKON",
    ],
  },

  {
    label: "03 REKON SELESAI",
    statuses: [
      "REKON SELESAI",
    ],
  },

  {
    label: "04 VERIFIKASI PROC REG",
    statuses: [
      "VERIFIKASI PROC REG",
    ],
  },

  {
    label: "05 REVISI PROC REG",
    statuses: [
      "REVISI PROC REG",
    ],
  },

  {
    label: "06 KIRIM KE AREA",
    statuses: [
      "KIRIM KE AREA",
    ],
  },
];

/* =========================================================
   NORMALIZE STATUS
========================================================= */

const normalizeStatus = (
  value
) => {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
};

/* =========================================================
   NUMBER
========================================================= */

const toNumber = (
  value
) => {
  if (
    typeof value === "number"
  ) {
    return Number.isFinite(value)
      ? value
      : 0;
  }

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return 0;
  }

  let text =
    String(value).trim();

  if (!text) {
    return 0;
  }

  /*
    Indonesia:
    2.814.943.429,50
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
    Hanya titik
  */

  else if (
    text.includes(".")
  ) {
    const parts =
      text.split(".");

    if (
      parts.length > 2 ||
      (
        parts.length === 2 &&
        parts[1].length === 3
      )
    ) {
      text = text.replace(
        /\./g,
        ""
      );
    }
  }

  /*
    Hanya koma
  */

  else if (
    text.includes(",")
  ) {
    const parts =
      text.split(",");

    if (
      parts.length > 2 ||
      (
        parts.length === 2 &&
        parts[1].length === 3
      )
    ) {
      text = text.replace(
        /,/g,
        ""
      );
    }
  }

  text = text.replace(
    /[^\d.-]/g,
    ""
  );

  const number =
    Number(text);

  return Number.isFinite(number)
    ? number
    : 0;
};

/* =========================================================
   FORMAT NUMBER
========================================================= */

const formatNumber = (
  value
) => {
  const number =
    toNumber(value);

  return new Intl.NumberFormat(
    "id-ID",
    {
      maximumFractionDigits: 0,
    }
  ).format(number);
};

/* =========================================================
   FORMAT DPP
========================================================= */

const formatDpp = (
  value
) => {
  const number =
    toNumber(value);

  if (number === 0) {
    return "0";
  }

  return formatNumber(number);
};

/* =========================================================
   NORMALIZE ROW
========================================================= */

const normalizeRow = (
  item
) => {
  if (
    !item ||
    typeof item !== "object"
  ) {
    return {
      status: "",
      jumlah: 0,
      nilaiDpp: 0,
    };
  }

  return {
    status:
      normalizeStatus(
        item?.status ??
        item?.["STATUS BERKAS"] ??
        item?.STATUS ??
        ""
      ),

    jumlah:
      toNumber(
        item?.jumlah ??
        item?.["JUMLAH"] ??
        item?.JML ??
        0
      ),

    nilaiDpp:
      toNumber(
        item?.nilaiDpp ??
        item?.["NILAI DPP"] ??
        item?.nilai ??
        0
      ),
  };
};

/* =========================================================
   COMPONENT
========================================================= */

const OpenDocumentTable = ({
  data = [],
}) => {

  /* =======================================================
     NORMALIZE DATA
  ======================================================= */

  const rows =
    useMemo(() => {

      if (
        !Array.isArray(data)
      ) {
        return [];
      }

      return data
        .map(normalizeRow)
        .filter(
          (row) =>
            row.status !== ""
        );

    }, [data]);

  /* =======================================================
     BUILD RESULT
  ======================================================= */

  const result =
    useMemo(() => {

      return OPEN_DOCUMENT_CONFIG.map(
        (config) => {

          const allowedStatuses =
            config.statuses.map(
              normalizeStatus
            );

          const matchedRows =
            rows.filter(
              (row) =>
                allowedStatuses.includes(
                  row.status
                )
            );

          const jumlah =
            matchedRows.reduce(
              (total, row) =>
                total + row.jumlah,
              0
            );

          const nilaiDpp =
            matchedRows.reduce(
              (total, row) =>
                total + row.nilaiDpp,
              0
            );

          return {
            label:
              config.label,

            jumlah,

            nilaiDpp,
          };
        }
      );

    }, [rows]);

  /* =======================================================
     GRAND TOTAL
  ======================================================= */

  const grandTotal =
    useMemo(() => {

      return result.reduce(
        (total, row) => {

          return {
            jumlah:
              total.jumlah +
              row.jumlah,

            nilaiDpp:
              total.nilaiDpp +
              row.nilaiDpp,
          };

        },
        {
          jumlah: 0,
          nilaiDpp: 0,
        }
      );

    }, [result]);

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <section
      className="
        w-full
        min-w-0
        bg-white
        rounded-xl
        border
        border-gray-100
        overflow-hidden
      "
    >

      {/* =================================================
          INNER TITLE
      ================================================= */}

      <div
        className="
          px-3
          sm:px-4
          pt-3
          pb-2
        "
      >

        <h3
          className="
            text-sm
            sm:text-base
            font-bold
            text-gray-900
            text-center
          "
        >
          OPEN DOCUMENT
        </h3>

        <div
          className="
            border-b
            border-gray-400
            mt-2
          "
        />

      </div>

      {/* =================================================
          TABLE
      ================================================= */}

      <div
        className="
          w-full
          overflow-x-auto
          px-3
          pb-3
        "
      >

        <table
          className="
            w-full
            min-w-0
            border-collapse
            text-[10px]
            sm:text-xs
            bg-white
            table-fixed
          "
        >

          <colgroup>

            <col className="w-[52%]" />

            <col className="w-[16%]" />

            <col className="w-[32%]" />

          </colgroup>

          {/* =================================================
              HEADER
          ================================================= */}

          <thead>

            <tr
              className="
                bg-[#203f91]
                text-white
              "
            >

              <th
                className="
                  border
                  border-white
                  px-2
                  py-2
                  text-left
                  font-bold
                  leading-tight
                "
              >
                STATUS BERKAS
              </th>

              <th
                className="
                  border
                  border-white
                  px-1
                  py-2
                  text-center
                  font-bold
                  leading-tight
                "
              >
                JUMLAH
              </th>

              <th
                className="
                  border
                  border-white
                  px-1
                  py-2
                  text-right
                  font-bold
                  leading-tight
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

            {result.map(
              (row, index) => (

                <tr
                  key={row.label}
                  className={
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  }
                >

                  <td
                    className="
                      border
                      border-gray-400
                      px-2
                      py-2
                      text-left
                      text-gray-900
                      font-medium
                      leading-tight
                      break-words
                    "
                  >
                    {row.label}
                  </td>

                  <td
                    className="
                      border
                      border-gray-400
                      px-1
                      py-2
                      text-center
                      text-gray-900
                    "
                  >
                    {formatNumber(
                      row.jumlah
                    )}
                  </td>

                  <td
                    className="
                      border
                      border-gray-400
                      px-1
                      py-2
                      text-right
                      text-gray-900
                      whitespace-nowrap
                    "
                  >
                    {formatDpp(
                      row.nilaiDpp
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
                bg-[#203f91]
                text-white
                font-bold
              "
            >

              <td
                className="
                  border
                  border-white
                  px-2
                  py-2
                  text-left
                "
              >
                GRAND TOTAL
              </td>

              <td
                className="
                  border
                  border-white
                  px-1
                  py-2
                  text-center
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
                  px-1
                  py-2
                  text-right
                  whitespace-nowrap
                "
              >
                {formatDpp(
                  grandTotal.nilaiDpp
                )}
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default OpenDocumentTable;