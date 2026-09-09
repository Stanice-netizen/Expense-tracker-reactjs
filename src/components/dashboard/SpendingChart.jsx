import { useMemo } from "react";
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

  const data = useMemo(() => {
    const expenses = transactions.filter(
      (transaction) => transaction.type === "expense"
    );

    return categories
      .map((category) => {
        const total = expenses
          .filter(
            (transaction) =>
              transaction.category === category.id
          )
          .reduce(
            (sum, transaction) =>
              sum + transaction.amount,
            0
          );

        return {
          name: category.name,
          value: total,
          color: category.color,
        };
      })
      .filter((category) => category.value > 0);
  }, [transactions, categories]);

  if (data.length === 0) {
    return (
      <section>
        <h2>Spending by Category</h2>
        <p>No chart data available.</p>
      </section>
    );
  }

  return (
    <section>
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
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={entry.color}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
}

export default SpendingByCategory;