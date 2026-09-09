import BudgetForm from "../components/budgets/BudgetForm";
import BudgetList from "../components/budgets/BudgetList";

function Budgets() {
  return (
    <div>
      <h1>Budgets</h1>

      <BudgetForm />

      <BudgetList />
    </div>
  );
}

export default Budgets;