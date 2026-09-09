import { useMemo, useState } from "react";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionList from "../components/transactions/TransactionList";
import { useTransactionContext } from "../context/TransactionContext";
import useDebounce from "../hooks/useDebounce";

function Transactions() {
  const { transactions } = useTransactionContext();

  const [editingTransaction, setEditingTransaction] =
    useState(null);

  const [filters, setFilters] = useState({
    month: "",
    type: "all",
    category: "all",
    search: "",
  });

  const debouncedSearch = useDebounce(
  filters.search,
  300
);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Month filter
      if (filters.month) {
        const transactionMonth =
          transaction.date.slice(0, 7);

        if (transactionMonth !== filters.month) {
          return false;
        }
      }

      // Type filter
      if (
        filters.type !== "all" &&
        transaction.type !== filters.type
      ) {
        return false;
      }

      // Category filter
      if (
        filters.category !== "all" &&
        transaction.category !== filters.category
      ) {
        return false;
      }

      // Search filter
      if (debouncedSearch) {
  const searchTerm =
    debouncedSearch.toLowerCase();

        const note =
          transaction.note?.toLowerCase() || "";

        if (!note.includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
}, [
  transactions,
  filters.month,
  filters.type,
  filters.category,
  debouncedSearch,
]);
  return (
    <div>
      <h1>Transactions</h1>

      <TransactionForm
        transactionToEdit={editingTransaction}
        onFinishEditing={() =>
          setEditingTransaction(null)
        }
      />

      <TransactionFilters
        filters={filters}
        setFilters={setFilters}
      />

      <TransactionList
        transactions={filteredTransactions}
        onEdit={(transaction) =>
          setEditingTransaction(transaction)
        }
      />
    </div>
  );
}

export default Transactions;