import { useCategoryContext } from "../../context/CategoryContext";

function TransactionFilters({
  filters,
  setFilters,
}) {
  const { categories } = useCategoryContext();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      month: "",
      type: "all",
      category: "all",
      search: "",
    });
  };

  return (
    <section>
      <h2>Filters</h2>

      <div>
        <label htmlFor="month">
          Month
        </label>

        <input
          id="month"
          name="month"
          type="month"
          value={filters.month}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="type">
          Type
        </label>

        <select
          id="type"
          name="type"
          value={filters.type}
          onChange={handleChange}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div>
        <label htmlFor="category">
          Category
        </label>

        <select
          id="category"
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="all">All</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="search">
          Search notes
        </label>

        <input
          id="search"
          name="search"
          type="text"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search notes..."
        />
      </div>

      <button
        type="button"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </section>
  );
}

export default TransactionFilters;