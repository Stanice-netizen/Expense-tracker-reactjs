import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useTransactionContext } from "../../context/TransactionContext";

function SpendingOverTime() {
  const { transactions } = useTransactionContext();

  const data = useMemo(() => {
    const expenses = transactions.filter(
      (transaction) => transaction.type === "expense",
    );

    const totals = {};

    expenses.forEach((transaction) => {
      if (!totals[transaction.date]) {
        totals[transaction.date] = 0;
      }

      totals[transaction.date] += transaction.amount;
    });

    return Object.entries(totals)
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([date, amount]) => ({
        date,
        amount,
      }));
  }, [transactions]);

  if (data.length === 0) {
    return (
      <section className="chart-section">
        <h2>Spending Over Time</h2>
        <p className="chart-empty-state">
          No chart data available.
        </p>
      </section>
    );
  }

  return (
    <section className="chart-section">
      <h2>Spending Over Time</h2>

      <ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />

    <XAxis
      dataKey="date"
      tick={{ fill: "var(--text-color)" }}
    />

    <YAxis
      tick={{ fill: "var(--text-color)" }}
    />

    <Tooltip
      contentStyle={{
        backgroundColor: "var(--card-color)",
        border: "1px solid var(--border-color)",
        borderRadius: "8px",
        color: "var(--text-color)",
      }}
    />

    <Line
      type="monotone"
      dataKey="amount"
      stroke="#2563eb"
      strokeWidth={2}
    />
  </LineChart>
</ResponsiveContainer>
    </section>
  );
}

export default SpendingOverTime;