import { Trash2 } from "lucide-react";
import { useBudgetContext } from "../../context/BudgetContext";
import { useCategoryContext } from "../../context/CategoryContext";
import { useTransactionContext } from "../../context/TransactionContext";
import { formatCurrency } from "../../utils/formatCurrency";

function BudgetList() {
  const { budgets, deleteBudget } = useBudgetContext();
  const { categories } = useCategoryContext();
  const { transactions } = useTransactionContext();

  if (budgets.length === 0) {
    return (
      <section>
        <h2>Budgets</h2>
        <p>No budgets set yet.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Budgets</h2>

      <div className="budget-list">
        {budgets.map((budget) => {
          const category = categories.find(
            (item) => item.id === budget.category,
          );

          const spent = transactions
            .filter(
              (transaction) =>
                transaction.type === "expense" &&
                transaction.category === budget.category &&
                transaction.date.startsWith(budget.month),
            )
            .reduce(
              (total, transaction) => total + transaction.amount,
              0,
            );

          const percentage =
            budget.amount > 0
              ? (spent / budget.amount) * 100
              : 0;

          const progress = Math.min(percentage, 100);

          const isOverBudget = spent > budget.amount;

          return (
            <div className="budget-item" key={budget.id}>
              <div className="budget-item-header">
                <div>
                  <h3>
                    {category?.name || "Unknown category"}
                  </h3>

                  <small>{budget.month}</small>
                </div>

                <button
                  className="budget-delete-button"
                  onClick={() => deleteBudget(budget.id)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>

              <div className="budget-amounts">
                <span>
                  Spent: {formatCurrency(spent)}
                </span>

                <span>
                  Budget: {formatCurrency(budget.amount)}
                </span>
              </div>

              <div className="budget-progress">
                <div
                  className={`budget-progress-bar ${
                    isOverBudget ? "over-budget" : ""
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {isOverBudget && (
                <p className="budget-warning">
                  ⚠️ Over budget by{" "}
                  {formatCurrency(spent - budget.amount)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BudgetList;