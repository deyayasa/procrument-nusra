import { useEffect, useMemo, useState } from "react";
import { getDashboardData } from "../services/api"; 
import { getDashboardSummary as calculateDashboardSummary } from "../utils/dashboardCalculations";

export default function useDashboard(selectedBranch = "ALL", selectedYear = "ALL", selectedMonth = "ALL") {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const result = await getDashboardData();

        if (!mounted) return;

        const normalizedResult = Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result?.rows)
          ? result.rows
          : [];

        setData(normalizedResult);
      } catch (err) {
        console.error("ERROR GET DASHBOARD DATA:", err);
        if (!mounted) return;
        setError(err);
        setData([]);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const summary = useMemo(() => {
    return calculateDashboardSummary(data || [], selectedBranch, selectedYear, selectedMonth);
  }, [data, selectedBranch, selectedYear, selectedMonth]);

  return {
    data,
    summary,
    loading,
    error,
    selectedBranch,
    selectedYear,
    selectedMonth
  };
}