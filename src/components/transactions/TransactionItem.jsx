import { Pencil, Trash2 } from "lucide-react";
import { useTransactionContext } from "../../context/TransactionContext";
import { useCategoryContext } from "../../context/CategoryContext";

function TransactionItem({ transaction, onEdit }) {
  const { deleteTransaction } = useTransactionContext();
  const { categories } = useCategoryContext();

  const category = categories.find((item) => item.id === transaction.category);

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (confirmed) {
      deleteTransaction(transaction.id);
    }
  };

  return (
    <div className="transaction-item">
      <div>
        <h3>{category?.name || "Unknown category"}</h3>
        {transaction.note && <p>{transaction.note}</p>}

        <small>{transaction.date}</small>
      </div>

      <div>
        <strong>
          {transaction.type === "income" ? "+" : "-"}
          {transaction.amount}
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
