import { useMemo } from "react";
import { useTransactionContext } from "../context/TransactionContext";
import { formatCurrency } from "../utils/formatCurrency";
import SpendingByCategory from "../components/charts/SpendingByCategory";
import SpendingOverTime from "../components/charts/SpendingOverTime";

function Dashboard() {
  const { transactions } = useTransactionContext();

  const totalIncome = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);
  }, [transactions]);

  const netBalance = totalIncome - totalExpenses;

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [transactions]);

  return (
    <main className="dashboard">
      <h1>Dashboard</h1>

      <section className="summary-cards">
        <div className="summary-card">
          <p>Total Income</p>
          <h2 className="income-amount">
            {formatCurrency(totalIncome)}
          </h2>
        </div>

        <div className="summary-card">
          <p>Total Expenses</p>
          <h2 className="expense-amount">
            {formatCurrency(totalExpenses)}
          </h2>
        </div>

        <div className="summary-card">
          <p>Net Balance</p>
          <h2>{formatCurrency(netBalance)}</h2>
        </div>
      </section>

      <section className="recent-transactions">
        <h2>Recent Transactions</h2>

        {recentTransactions.length === 0 ? (
          <p className="empty-state">No transactions yet.</p>
        ) : (
          recentTransactions.map((transaction) => (
            <div className="recent-transaction" key={transaction.id}>
              <div>
                <p>{transaction.note || "No note"}</p>
                <small>{transaction.date}</small>
              </div>

              <p
                className={
                  transaction.type === "income"
                    ? "income-amount"
                    : "expense-amount"
                }
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </p>
            </div>
          ))
        )}
      </section>

      <section className="dashboard-charts">
        <div className="chart-card">
          <SpendingByCategory />
        </div>

        <div className="chart-card">
          <SpendingOverTime />
        </div>
      </section>
    </main>
  );
}

export default Dashboard;