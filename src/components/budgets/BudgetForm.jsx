import { useState } from "react";
import { useBudgetContext } from "../../context/BudgetContext";
import { useCategoryContext } from "../../context/CategoryContext";

function BudgetForm() {
  const { budgets, addBudget } = useBudgetContext();
  const { categories } = useCategoryContext();

  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    month: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.category) {
      setError("Please select a category.");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      setError("Budget must be greater than 0.");
      return;
    }

    if (!formData.month) {
      setError("Please select a month.");
      return;
    }

    const existingBudget = budgets.find(
      (budget) =>
        budget.category === formData.category &&
        budget.month === formData.month,
    );

    if (existingBudget) {
      setError("A budget already exists for this category and month.");
      return;
    }

    addBudget({
      category: formData.category,
      amount: Number(formData.amount),
      month: formData.month,
    });

    setFormData({
      category: "",
      amount: "",
      month: "",
    });

    setError("");
  };

  return (
    <form className="budget-form" onSubmit={handleSubmit}>
      <h2>Set Monthly Budget</h2>

      <div className="budget-form-group">
        <label htmlFor="budget-category">Category</label>

        <select
          id="budget-category"
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

      <div className="budget-form-group">
        <label htmlFor="budget-amount">Budget amount</label>

        <input
          id="budget-amount"
          name="amount"
          type="number"
          min="0"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter budget"
        />
      </div>

      <div className="budget-form-group">
        <label htmlFor="budget-month">Month</label>

        <input
          id="budget-month"
          name="month"
          type="month"
          value={formData.month}
          onChange={handleChange}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="primary-button">
        Set Budget
      </button>
    </form>
  );
}

export default BudgetForm;