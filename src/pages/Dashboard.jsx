import { useMemo } from "react";
import { useTransactionContext } from "../context/TransactionContext";
import { formatCurrency } from "../utils/formatCurrency";

function Dashboard() {
  const { transactions } = useTransactionContext();

  const totalIncome = useMemo(() => {
    return transactions
      .filter(
        (transaction) => transaction.type === "income"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter(
        (transaction) => transaction.type === "expense"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );
  }, [transactions]);

  const netBalance = totalIncome - totalExpenses;

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort(
        (a, b) =>
          new Date(b.date) - new Date(a.date)
      )
      .slice(0, 5);
  }, [transactions]);

  return (
    <main>
      <h1>Dashboard</h1>

      <section>
        <div>
          <h2>Total Income</h2>
          <p>{formatCurrency(totalIncome)}</p>
        </div>

        <div>
          <h2>Total Expenses</h2>
          <p>{formatCurrency(totalExpenses)}</p>
        </div>

        <div>
          <h2>Net Balance</h2>
          <p>{formatCurrency(netBalance)}</p>
        </div>
      </section>

      <section>
        <h2>Recent Transactions</h2>

        {recentTransactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          recentTransactions.map((transaction) => (
            <div key={transaction.id}>
              <p>{transaction.note || "No note"}</p>

              <p>
                {transaction.type === "income"
                  ? "+"
                  : "-"}
                {formatCurrency(transaction.amount)}
              </p>

              <small>{transaction.date}</small>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default Dashboard;