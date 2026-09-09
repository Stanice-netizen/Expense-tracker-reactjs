import { useBudgetContext } from "../../context/BudgetContext";
import { useCategoryContext } from "../../context/CategoryContext";
import { useTransactionContext } from "../../context/TransactionContext";

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

      {budgets.map((budget) => {
        const category = categories.find(
          (item) => item.id === budget.category
        );

        const spent = transactions
          .filter(
            (transaction) =>
              transaction.type === "expense" &&
              transaction.category === budget.category &&
              transaction.date.startsWith(budget.month)
          )
          .reduce(
            (total, transaction) =>
              total + transaction.amount,
            0
          );

        const percentage =
          budget.amount > 0
            ? (spent / budget.amount) * 100
            : 0;

        const progress =
          Math.min(percentage, 100);

        const isOverBudget =
          spent > budget.amount;

        return (
          <div key={budget.id}>
            <div>
              <h3>
                {category?.name || "Unknown category"}
              </h3>

              <p>
                {spent} / {budget.amount}
              </p>

              <p>
                {budget.month}
              </p>
            </div>

            <div
              style={{
                width: "100%",
                height: "10px",
                backgroundColor: "#ddd",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: isOverBudget
                    ? "red"
                    : "green",
                }}
              />
            </div>

            {isOverBudget && (
              <p>
                ⚠️ Over budget by{" "}
                {spent - budget.amount}
              </p>
            )}

            <button
              onClick={() =>
                deleteBudget(budget.id)
              }
            >
              Delete
            </button>
          </div>
        );
      })}
    </section>
  );
}

export default BudgetList;