import TransactionItem from "./TransactionItem";

function TransactionList({ transactions, onEdit }) {
  const sortedTransactions = [...transactions].sort(
    (a, b) =>
      new Date(b.date) - new Date(a.date)
  );

  if (transactions.length === 0) {
    return (
      <section>
        <h2>Transactions</h2>
        <p>No transactions found.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Transactions</h2>

      {sortedTransactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
}

export default TransactionList;