import BudgetForm from "../components/budgets/BudgetForm";
import BudgetList from "../components/budgets/BudgetList";

function Budgets() {
  return (
    <main className="budgets-page">
      <h1>Budgets</h1>

      <section className="budget-form-card">
        <BudgetForm />
      </section>

      <section className="budget-list-card">
        <BudgetList />
      </section>
    </main>
  );
}

export default Budgets;