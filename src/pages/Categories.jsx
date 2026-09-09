import { useCategoryContext } from "../context/CategoryContext";
import CategoryForm from "../components/categories/CategoryForm";

function Categories() {
  const { categories, deleteCategory } = useCategoryContext();

  return (
    <div>
      <h1>Categories</h1>

      <CategoryForm />

      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <span
              style={{
                display: "inline-block",
                width: "15px",
                height: "15px",
                backgroundColor: category.color,
                marginRight: "8px",
              }}
            />

            <span>{category.name}</span>

            <button onClick={() => deleteCategory(category.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;