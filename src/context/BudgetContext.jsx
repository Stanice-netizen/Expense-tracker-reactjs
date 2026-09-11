import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetContext = createContext();

export function BudgetProvider({ children }) {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);

  const addBudget = (budget) => {
    setBudgets((currentBudgets) => [
      ...currentBudgets,
      {
        ...budget,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const updateBudget = (id, updatedBudget) => {
    setBudgets((currentBudgets) =>
      currentBudgets.map((budget) =>
        budget.id === id
          ? { ...budget, ...updatedBudget }
          : budget
      )
    );
  };

  const deleteBudget = (id) => {
    setBudgets((currentBudgets) =>
      currentBudgets.filter((budget) => budget.id !== id)
    );
  };

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        addBudget,
        updateBudget,
        deleteBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudgetContext() {
  return useContext(BudgetContext);
}