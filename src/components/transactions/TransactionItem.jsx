import { Pencil, Trash2 } from "lucide-react";
import { useTransactionContext } from "../../context/TransactionContext";
import { useCategoryContext } from "../../context/CategoryContext";
import { formatCurrency } from "../../utils/formatCurrency";

function TransactionItem({ transaction, onEdit }) {
  const { deleteTransaction } = useTransactionContext();
  const { categories } = useCategoryContext();

  const category = categories.find(
    (item) => item.id === transaction.category
  );

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (confirmed) {
      deleteTransaction(transaction.id);
    }
  };

  return (
    <div className="transaction-item">
      <div className="transaction-info">
        <h3>{category?.name || "Unknown category"}</h3>

        <p>{transaction.note || "No note"}</p>

        <small>{transaction.date}</small>
      </div>

      <div className="transaction-actions">
        <strong
          className={
            transaction.type === "income"
              ? "income-amount"
              : "expense-amount"
          }
        >
          {transaction.type === "income" ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </strong>

        <button onClick={() => onEdit(transaction)}>
          <Pencil size={16} />
          Edit
        </button>

        <button onClick={handleDelete}>
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}

export default TransactionItem;