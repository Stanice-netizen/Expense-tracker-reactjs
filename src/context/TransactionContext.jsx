import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage(
    "transactions",
    []
  );

  const addTransaction = (transaction) => {
    setTransactions((currentTransactions) => [
      ...currentTransactions,
      {
        ...transaction,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === id
          ? { ...transaction, ...updatedTransaction }
          : transaction
      )
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionContext() {
  return useContext(TransactionContext);
}