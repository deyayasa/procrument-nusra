import React from "react";

/* =========================================================
   PRIORITY STATUS
========================================================= */

const PRIORITY_1_STATUS = [
  "VERIFIKASI PROC BRANCH",
  "REVISI PROC BRANCH",
  "SIRKULER LTD BRANCH",
  "VERIFIKASI PROC REG",
  "REVISI PROC REG",
  "SIRKULER LTD REG",
  "VERIFIKASI PROC AREA",
  "REVISI PROC AREA",
  "SIRKULER LTD AREA",
  "VERIFIKASI FINANCE AREA",
  "REVISI FINANCE AREA",
  "PROSES FINANCE HO",
];

const PRIORITY_2_STATUS = [
  "PEKERJAAN OGP",
  "OGP REKON",
  "PEMBERKASAN MITRA",
];

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
   NORMALIZE BRANCH
========================================================= */

const normalizeBranch = (value) => {
  const branch = normalize(value);

  if (
    branch === "MTR" ||
    branch === "MATARAM"
  ) {
    return "MTR";
  }

  if (
    branch === "KPG" ||
    branch === "KUPANG"
  ) {
    return "KPG";
  }

  if (
    branch === "ALL" ||
    branch === "SEMUA" ||
    branch === "SEMUA BRANCH" ||
    branch === ""
  ) {
    return "ALL";
  }

  return branch;
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
    return Number.isFinite(value)
      ? value
      : 0;
  }

  let text = String(value).trim();

  if (!text) {
    return 0;
  }

  text = text.replace(/[^\d,.-]/g, "");

  if (!text) {
    return 0;
  }

  /*
    Format:
    1.381.323.137,50
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
    Format:
    1381323137,50
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
    Format:
    1.381.323.137
  */

  else if (text.includes(".")) {
    const parts = text.split(".");

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
  return normalize(
    item?.["STATUS BERKAS"] ??
      item?.status ??
      item?.STATUS
  );
};

/* =========================================================
   GET BRANCH
========================================================= */

const getBranch = (item) => {
  return normalizeBranch(
    item?.BRANCH ??
      item?.branch ??
      item?.CABANG ??
      item?.cabang
  );
};

/* =========================================================
   GET PRIORITY DATA
========================================================= */

const getPriorityData = (
  data,
  status,
  branch
) => {
  const targetStatus = normalize(status);
  const targetBranch = normalizeBranch(branch);

  const rows = data.filter((item) => {
    return (
      getStatus(item) === targetStatus &&
      getBranch(item) === targetBranch
    );
  });

  return {
    jumlah: rows.length,

    nilai: rows.reduce(
      (total, item) => {
        return (
          total +
          normalizeNumber(
            item?.["NILAI DPP"]
          )
        );
      },
      0
    ),
  };
};

/* =========================================================
   GRAND TOTAL
========================================================= */

const getGrandTotal = (
  data,
  statuses,
  branch
) => {
  return statuses.reduce(
    (total, status) => {
      const result = getPriorityData(
        data,
        status,
        branch
      );

      return {
        jumlah:
          total.jumlah +
          result.jumlah,

        nilai:
          total.nilai +
          result.nilai,
      };
    },
    {
      jumlah: 0,
      nilai: 0,
    }
  );
};

/* =========================================================
   PRIORITY TABLE
========================================================= */

const PriorityTable = ({
  data = [],
  branch = "ALL",
}) => {
  const selectedBranch =
    normalizeBranch(branch);

  const showMataram =
    selectedBranch === "ALL" ||
    selectedBranch === "MTR";

  const showKupang =
    selectedBranch === "ALL" ||
    selectedBranch === "KPG";

  /* =======================================================
     COLUMN CONFIGURATION

     PENTING:
     Jangan gunakan colgroup 5 kolom tetap.
     Jumlah kolom harus mengikuti branch yang sedang aktif.
  ======================================================= */

  const getColumnWidths = () => {
    if (
      showMataram &&
      showKupang
    ) {
      return {
        status: "38%",
        jumlah: "8%",
        nilai: "17%",
      };
    }

    return {
      status: "48%",
      jumlah: "14%",
      nilai: "38%",
    };
  };

  const columnWidths =
    getColumnWidths();

  /* =======================================================
     RENDER PRIORITY TABLE
  ======================================================= */

  const renderPriorityTable = (
    title,
    statuses
  ) => {
    const mataramTotal =
      showMataram
        ? getGrandTotal(
            data,
            statuses,
            "MTR"
          )
        : {
            jumlah: 0,
            nilai: 0,
          };

    const kupangTotal =
      showKupang
        ? getGrandTotal(
            data,
            statuses,
            "KPG"
          )
        : {
            jumlah: 0,
            nilai: 0,
          };

    return (
      <div className="mb-7 w-full min-w-0">

        {/* =================================================
            TITLE
        ================================================= */}

        <div
          className="
            bg-blue-700
            text-white
            font-bold
            text-center
            py-3
            rounded-t-xl
            text-sm
            sm:text-base
          "
        >
          {title}
        </div>

        {/* =================================================
            TABLE WRAPPER
        ================================================= */}

        <div
          className="
            w-full
            overflow-x-auto
            rounded-b-xl
            bg-white
          "
        >
          <table
            className="
              w-full
              min-w-0
              border-collapse
              text-[9px]
              sm:text-[10px]
              lg:text-xs
              bg-white
              table-fixed
            "
          >

            {/* =================================================
                DYNAMIC COLGROUP

                ALL:
                STATUS + MTR JML + MTR DPP + KPG JML + KPG DPP

                MTR:
                STATUS + MTR JML + MTR DPP

                KPG:
                STATUS + KPG JML + KPG DPP
            ================================================= */}

            <colgroup>

              <col
                style={{
                  width:
                    columnWidths.status,
                }}
              />

              {showMataram && (
                <>
                  <col
                    style={{
                      width:
                        columnWidths.jumlah,
                    }}
                  />

                  <col
                    style={{
                      width:
                        columnWidths.nilai,
                    }}
                  />
                </>
              )}

              {showKupang && (
                <>
                  <col
                    style={{
                      width:
                        columnWidths.jumlah,
                    }}
                  />

                  <col
                    style={{
                      width:
                        columnWidths.nilai,
                    }}
                  />
                </>
              )}

            </colgroup>

            {/* =================================================
                HEADER
            ================================================= */}

            <thead>

              {/* ROW 1 */}

              <tr className="bg-blue-900 text-white">

                <th
                  rowSpan={2}
                  className="
                    border
                    border-white
                    px-2
                    py-2
                    text-left
                    font-bold
                    leading-tight
                    break-words
                  "
                >
                  STATUS BERKAS
                </th>

                {showMataram && (
                  <th
                    colSpan={2}
                    className="
                      border
                      border-white
                      px-1
                      py-2
                      text-center
                      font-bold
                      whitespace-nowrap
                    "
                  >
                    MATARAM
                  </th>
                )}

                {showKupang && (
                  <th
                    colSpan={2}
                    className="
                      border
                      border-white
                      px-1
                      py-2
                      text-center
                      font-bold
                      whitespace-nowrap
                    "
                  >
                    KUPANG
                  </th>
                )}

              </tr>

              {/* ROW 2 */}

              <tr className="bg-blue-800 text-white">

                {showMataram && (
                  <>
                    <th
                      className="
                        border
                        border-white
                        px-1
                        py-2
                        text-center
                        font-bold
                        whitespace-nowrap
                      "
                    >
                      JML
                    </th>

                    <th
                      className="
                        border
                        border-white
                        px-1
                        py-2
                        text-center
                        font-bold
                        whitespace-nowrap
                      "
                    >
                      NILAI DPP
                    </th>
                  </>
                )}

                {showKupang && (
                  <>
                    <th
                      className="
                        border
                        border-white
                        px-1
                        py-2
                        text-center
                        font-bold
                        whitespace-nowrap
                      "
                    >
                      JML
                    </th>

                    <th
                      className="
                        border
                        border-white
                        px-1
                        py-2
                        text-center
                        font-bold
                        whitespace-nowrap
                      "
                    >
                      NILAI DPP
                    </th>
                  </>
                )}

              </tr>

            </thead>

            {/* =================================================
                BODY
            ================================================= */}

            <tbody>

              {statuses.map((status) => {

                const mataram =
                  showMataram
                    ? getPriorityData(
                        data,
                        status,
                        "MTR"
                      )
                    : {
                        jumlah: 0,
                        nilai: 0,
                      };

                const kupang =
                  showKupang
                    ? getPriorityData(
                        data,
                        status,
                        "KPG"
                      )
                    : {
                        jumlah: 0,
                        nilai: 0,
                      };

                return (
                  <tr
                    key={status}
                    className="
                      hover:bg-gray-50
                      transition
                    "
                  >

                    {/* =================================================
                        STATUS
                    ================================================= */}

                    <td
                      className="
                        border
                        border-gray-400
                        px-2
                        py-1.5
                        text-left
                        font-medium
                        leading-tight
                        break-words
                      "
                    >
                      {status}
                    </td>

                    {/* =================================================
                        MATARAM JML
                    ================================================= */}

                    {showMataram && (
                      <td
                        className="
                          border
                          border-gray-400
                          px-1
                          py-1.5
                          text-center
                          whitespace-nowrap
                        "
                      >
                        {mataram.jumlah}
                      </td>
                    )}

                    {/* =================================================
                        MATARAM NILAI DPP
                    ================================================= */}

                    {showMataram && (
                      <td
                        className="
                          border
                          border-gray-400
                          px-1
                          py-1.5
                          text-right
                          whitespace-nowrap
                        "
                      >
                        {formatNumber(
                          mataram.nilai
                        )}
                      </td>
                    )}

                    {/* =================================================
                        KUPANG JML
                    ================================================= */}

                    {showKupang && (
                      <td
                        className="
                          border
                          border-gray-400
                          px-1
                          py-1.5
                          text-center
                          whitespace-nowrap
                        "
                      >
                        {kupang.jumlah}
                      </td>
                    )}

                    {/* =================================================
                        KUPANG NILAI DPP
                    ================================================= */}

                    {showKupang && (
                      <td
                        className="
                          border
                          border-gray-400
                          px-1
                          py-1.5
                          text-right
                          whitespace-nowrap
                        "
                      >
                        {formatNumber(
                          kupang.nilai
                        )}
                      </td>
                    )}

                  </tr>
                );
              })}

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
                    px-2
                    py-2
                    text-left
                    whitespace-nowrap
                  "
                >
                  Grand Total
                </td>

                {/* =================================================
                    MATARAM GRAND TOTAL
                ================================================= */}

                {showMataram && (
                  <>
                    <td
                      className="
                        border
                        border-white
                        px-1
                        py-2
                        text-center
                        whitespace-nowrap
                      "
                    >
                      {mataramTotal.jumlah}
                    </td>

                    <td
                      className="
                        border
                        border-white
                        px-1
                        py-2
                        text-right
                        break-all
                        leading-tight
                      "
                    >
                      {formatNumber(
                        mataramTotal.nilai
                      )}
                    </td>
                  </>
                )}

                {/* =================================================
                    KUPANG GRAND TOTAL
                ================================================= */}

                {showKupang && (
                  <>
                    <td
                      className="
                        border
                        border-white
                        px-1
                        py-2
                        text-center
                        whitespace-nowrap
                      "
                    >
                      {kupangTotal.jumlah}
                    </td>

                    <td
                      className="
                        border
                        border-white
                        px-1
                        py-2
                        text-right
                        break-all
                        leading-tight
                      "
                    >
                      {formatNumber(
                        kupangTotal.nilai
                      )}
                    </td>
                  </>
                )}

              </tr>

            </tbody>

          </table>
        </div>
      </div>
    );
  };

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <div className="w-full min-w-0">

      {renderPriorityTable(
        "PRIORITAS 1",
        PRIORITY_1_STATUS
      )}

      {renderPriorityTable(
        "PRIORITAS 2",
        PRIORITY_2_STATUS
      )}

    </div>
  );
};

export default PriorityTable;