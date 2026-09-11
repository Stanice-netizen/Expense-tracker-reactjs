import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CategoryContext = createContext();

const defaultCategories = [
  {
    id: "food",
    name: "Food",
    color: "#f97316",
  },
  {
    id: "transport",
    name: "Transport",
    color: "#3b82f6",
  },
  {
    id: "shopping",
    name: "Shopping",
    color: "#8b5cf6",
  },
  {
    id: "bills",
    name: "Bills",
    color: "#ef4444",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    color: "#22c55e",
  },
  {
    id: "health",
    name: "Health",
    color: "#ec4899",
  },
  {
    id: "salary",
    name: "Salary",
    color: "#14b8a6",
  },
];

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useLocalStorage(
    "categories",
    defaultCategories
  );

  const addCategory = (category) => {
    setCategories((currentCategories) => [
      ...currentCategories,
      {
        ...category,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const deleteCategory = (id) => {
    setCategories((currentCategories) =>
      currentCategories.filter((category) => category.id !== id)
    );
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryContext() {
  return useContext(CategoryContext);
}