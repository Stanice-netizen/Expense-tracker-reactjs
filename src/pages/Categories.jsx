import { Trash2 } from "lucide-react";
import { useCategoryContext } from "../context/CategoryContext";
import CategoryForm from "../components/categories/CategoryForm";

function Categories() {
  const { categories, deleteCategory } = useCategoryContext();

  return (
    <main className="categories-page">
      <h1>Categories</h1>

      <section className="category-form-card">
        <CategoryForm />
      </section>

      <section className="categories-card">
        <h2>Your Categories</h2>

        <div className="category-list">
          {categories.map((category) => (
            <div className="category-item" key={category.id}>
              <div className="category-info">
                <span
                  className="category-color"
                  style={{ backgroundColor: category.color }}
                />

                <span>{category.name}</span>
              </div>

              <button
                className="delete-category-button"
                onClick={() => deleteCategory(category.id)}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Categories;