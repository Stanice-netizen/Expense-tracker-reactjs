import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useTransactionContext } from "../../context/TransactionContext";
import { useCategoryContext } from "../../context/CategoryContext";

function SpendingByCategory() {
  const { transactions } = useTransactionContext();
  const { categories } = useCategoryContext();

  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const data = [];

  categories.forEach((category) => {
    let total = 0;

    expenses.forEach((transaction) => {
      if (transaction.category === category.id) {
        total += transaction.amount;
      }
    });

    if (total > 0) {
      data.push({
        name: category.name,
        value: total,
        color: category.color,
      });
    }
  });

  if (data.length === 0) {
    return (
      <section className="chart-section">
        <h2>Spending by Category</h2>
        <p className="chart-empty-state">
          No chart data available.
        </p>
      </section>
    );
  }

  return (
    <section className="chart-section">
      <h2>Spending by Category</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((category) => (
              <Cell
                key={category.name}
                fill={category.color}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card-color)",
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
              color: "var(--text-color)",
            }}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
}

export default SpendingByCategory;