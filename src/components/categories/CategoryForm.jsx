import { useState } from "react";
import { useCategoryContext } from "../../context/CategoryContext";

function CategoryForm() {
  const { addCategory } = useCategoryContext();

  const [name, setName] = useState("");
  const [color, setColor] = useState("#6366f1");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Category name is required.");
      return;
    }

    addCategory({
      name: trimmedName,
      color,
    });

    setName("");
    setColor("#6366f1");
    setError("");
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <h2>Add Category</h2>

      <div className="category-form-group">
        <label htmlFor="category-name">
          Category name
        </label>

        <input
          id="category-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Pets"
        />
      </div>

      <div className="category-form-group">
        <label htmlFor="category-color">
          Color
        </label>

        <input
          id="category-color"
          className="category-color-input"
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="primary-button">
        Add Category
      </button>
    </form>
  );
}

export default CategoryForm;