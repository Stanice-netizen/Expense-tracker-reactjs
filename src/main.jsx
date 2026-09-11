import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { TransactionProvider } from "./context/TransactionContext";
import { CategoryProvider } from "./context/CategoryContext";
import { BudgetProvider } from "./context/BudgetContext";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TransactionProvider>
        <CategoryProvider>
          <BudgetProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </BudgetProvider>
        </CategoryProvider>
      </TransactionProvider>
    </BrowserRouter>
  </StrictMode>,
);
