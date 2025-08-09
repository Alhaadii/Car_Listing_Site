const Search = () => {
  return (
    <div className="flex gap-4 mt-2 min-h-screen container mx-auto">
      <div className="border-r-2 p-2">
        <h1 className="text-2xl font-bold mb-4">Search Page</h1>
        <span className="font-semibold">Search:</span>
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Search..."
        />
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-2">Filters</h2>
        <p>Filter options will be implemented here.</p>
      </div>
    </div>
  );
};

export default Search;
