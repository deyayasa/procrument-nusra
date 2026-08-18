import React, { useMemo } from "react";

import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

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
   NORMALIZE NUMBER

   Aman untuk:
   72.625.067.482
   72,625,067,482
   Rp 72.625.067.482
   72625067482
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

  // Buang Rp, spasi, dan karakter lain
  text = text.replace(/[^\d,.-]/g, "");

  if (!text) {
    return 0;
  }

  /*
   FORMAT:
   1.234.567.890,50
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
   FORMAT:
   1234,50
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
   FORMAT:
   72.625.067.482
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
   GET STATUS DARI DATA SUMMARY
========================================================= */

const getStatus = (item) => {
  return normalizeText(
    item?.status ??
      item?.["STATUS BERKAS"] ??
      item?.["STATUS BERKAS 1"] ??
      item?.STATUS ??
      ""
  );
};


/* =========================================================
   GET NILAI DPP
========================================================= */

const getNilaiDpp = (item) => {
  return normalizeNumber(
    item?.nilaiDpp ??
      item?.["NILAI DPP"] ??
      item?.["NILAI_DPP"] ??
      item?.nilai ??
      0
  );
};


/* =========================================================
   CEK APAKAH STATUS COCOK

   Mapping penting:

   DOK OGP
      -> PEKERJAAN OGP
      -> DOK OGP

   CANCEL PO
      -> CANCEL
      -> CANCEL PO

   CASH BANK
      -> CASH BANK
========================================================= */

const statusMatches = (
  itemStatus,
  aliases = []
) => {
  const normalizedStatus =
    normalizeText(itemStatus);

  return aliases.some(
    (alias) =>
      normalizedStatus ===
      normalizeText(alias)
  );
};


/* =========================================================
   COMPONENT
========================================================= */

const PieChart = ({
  data = [],
}) => {

  /* =======================================================
     PASTIKAN DATA ARRAY
  ======================================================= */

  const safeData = Array.isArray(data)
    ? data
    : [];


  /* =======================================================
     HITUNG TOTAL PER KATEGORI
  ======================================================= */

  const chartData = useMemo(() => {

    /* -------------------------------------------------------
       CASH BANK
    ------------------------------------------------------- */

    const cashBank = safeData
      .filter((item) =>
        statusMatches(
          getStatus(item),
          [
            "CASH BANK",
          ]
        )
      )
      .reduce(
        (total, item) =>
          total + getNilaiDpp(item),
        0
      );


    /* -------------------------------------------------------
       DOK OGP

       DATA ASLI:
       PEKERJAAN OGP

       Jadi jangan hanya mencari:
       DOK OGP
    ------------------------------------------------------- */

    const dokOgp = safeData
      .filter((item) =>
        statusMatches(
          getStatus(item),
          [
            "PEKERJAAN OGP",
            "DOK OGP",
          ]
        )
      )
      .reduce(
        (total, item) =>
          total + getNilaiDpp(item),
        0
      );


    /* -------------------------------------------------------
       CANCEL PO

       DATA ASLI:
       CANCEL

       Jadi jangan hanya mencari:
       CANCEL PO
    ------------------------------------------------------- */

    const cancelPo = safeData
      .filter((item) =>
        statusMatches(
          getStatus(item),
          [
            "CANCEL",
            "CANCEL PO",
          ]
        )
      )
      .reduce(
        (total, item) =>
          total + getNilaiDpp(item),
        0
      );


    return [
      {
        name: "Cash Bank",
        value: cashBank,
        color: "#16A34A",
      },
      {
        name: "Dok OGP",
        value: dokOgp,
        color: "#FACC15",
      },
      {
        name: "Cancel PO",
        value: cancelPo,
        color: "#EF4444",
      },
    ];

  }, [safeData]);


  /* =======================================================
     CEK DATA
  ======================================================= */

  const hasData = chartData.some(
    (item) =>
      Number(item.value) > 0
  );


  /* =======================================================
     DEBUG PIE CHART
  ======================================================= */

  if (import.meta.env.DEV) {
    console.log(
      "=============================="
    );

    console.log(
      "PIE CHART DEBUG"
    );

    console.log(
      "DATA MASUK:",
      safeData
    );

    console.log(
      "CHART DATA:",
      chartData
    );

    console.log(
      "ADA DATA:",
      hasData
    );

    console.log(
      "=============================="
    );
  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className="
        w-full
        min-w-0
        h-full
        min-h-[420px]
      "
    >

      <ResponsiveContainer
        width="100%"
        height={420}
      >

        <RePieChart>

          {hasData ? (

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"

              cx="50%"
              cy="42%"

              innerRadius={90}
              outerRadius={150}

              paddingAngle={4}

              label={({ percent }) =>
                `${(
                  percent * 100
                ).toFixed(1)}%`
              }
            >

              {chartData.map(
                (
                  entry,
                  index
                ) => (

                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                  />

                )
              )}

            </Pie>

          ) : (

            <Pie
              data={[
                {
                  name:
                    "Belum Ada Data",
                  value: 1,
                },
              ]}

              dataKey="value"
              nameKey="name"

              cx="50%"
              cy="42%"

              innerRadius={90}
              outerRadius={150}

              fill="#E5E7EB"

              label={false}
            />

          )}


          {/* =================================================
              TOOLTIP
          ================================================= */}

          <Tooltip
            formatter={(value) =>
              `Rp ${Number(
                value
              ).toLocaleString(
                "id-ID"
              )}`
            }
          />


          {/* =================================================
              LEGEND
          ================================================= */}

          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="square"

            formatter={(value) =>
              value
            }

            wrapperStyle={{
              fontSize: "18px",
              paddingTop: "20px",
            }}
          />

        </RePieChart>

      </ResponsiveContainer>

    </div>
  );
};


export default PieChart;