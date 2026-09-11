import { useEffect, useState } from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import { useCategoryContext } from "../../context/CategoryContext";

function TransactionForm({
  transactionToEdit,
  onFinishEditing,
}) {
  const { addTransaction, updateTransaction } =
    useTransactionContext();

  const { categories } = useCategoryContext();

  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (transactionToEdit) {
      setFormData({
        type: transactionToEdit.type,
        amount: transactionToEdit.amount,
        category: transactionToEdit.category,
        date: transactionToEdit.date,
        note: transactionToEdit.note || "",
      });
    }
  }, [transactionToEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.amount) {
      setError("Amount is required.");
      return;
    }

    if (Number(formData.amount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    if (!formData.category) {
      setError("Please select a category.");
      return;
    }

    if (!formData.date) {
      setError("Date is required.");
      return;
    }

    const transactionData = {
      ...formData,
      amount: Number(formData.amount),
    };

    if (transactionToEdit) {
      updateTransaction(
        transactionToEdit.id,
        transactionData
      );

      onFinishEditing();
    } else {
      addTransaction(transactionData);
    }

    setFormData({
      type: "expense",
      amount: "",
      category: "",
      date: "",
      note: "",
    });

    setError("");
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>
        {transactionToEdit
          ? "Edit Transaction"
          : "Add Transaction"}
      </h2>

      <div className="form-group">
        <label htmlFor="type">Type</label>

        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>

        <input
          id="amount"
          name="amount"
          type="number"
          min="0"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>

        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>

        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="note">Note</label>

        <input
          id="note"
          name="note"
          type="text"
          value={formData.note}
          onChange={handleChange}
          placeholder="Optional note"
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-buttons">
        <button type="submit" className="primary-button">
          {transactionToEdit
            ? "Save Changes"
            : "Add Transaction"}
        </button>

        {transactionToEdit && (
          <button
            type="button"
            className="secondary-button"
            onClick={onFinishEditing}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TransactionForm;