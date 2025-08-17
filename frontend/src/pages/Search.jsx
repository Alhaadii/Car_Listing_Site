const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 border-gray-300 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col space-y-4">
          <div className="mb-4 flex items-center">
            <label
              htmlFor="search"
              className="block text-gray-700 text-sm mb-2 whitespace-nowrap mr-2"
            >
              Search Term:
            </label>
            <input
              type="text"
              id="search"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Search for cars..."
            />
          </div>
          <hr className="border-t border-gray-300" />
          {/*Type */}
          <div className="flex flex-wrap gap-2 items-center">
            <label htmlFor="Type">Type:</label>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="all" id="all" />
              <label htmlFor="all">Rent & Sale</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="rent" id="rent" />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="sale" id="sale" />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="offer" id="offer" />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <hr className="border-t border-gray-300" />
          {/* Condition */}
          <div className="flex gap-2 items-center">
            <label htmlFor="condition">Condition:</label>
            <select
              id="condition"
              className="border bg-white border-gray-300 rounded-md p-2 md:w-full"
            >
              <option value="">Select Condition</option>
              <option value="all">Any</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>
          <hr className="border-t border-gray-300" />
          {/* transmission */}
          <div className="flex gap-2 items-center">
            <label htmlFor="transmission">Transmission:</label>
            <select
              id="transmission"
              className="border bg-white border-gray-300 rounded-md p-2 md:w-full"
            >
              <option value="">Select Transmission</option>
              <option value="all">Any</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
          <hr className="border-t border-gray-300" />
          {/* Fuel Type */}
          <div className="flex gap-2 items-center">
            <label htmlFor="fuel">Fuel Type:</label>
            <select
              id="fuel"
              className="border bg-white border-gray-300 rounded-md p-2 md:w-full"
            >
              <option value="">Select Fuel Type</option>
              <option value="all">Any</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <hr className="border-t border-gray-300" />
          {/* Sort */}
          <div className="flex gap-2 items-center">
            <label htmlFor="sort">Sort By:</label>
            <select
              id="sort_order"
              className="border bg-white border-gray-300 rounded-md p-2 md:w-full"
            >
              <option value="">Select Sort Option</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="createdAt_asc">Year: Oldest</option>
              <option value="createdAt_desc">Year: Latest</option>
            </select>
          </div>
          <hr className="border-t border-gray-300" />
          {/* submit button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-slate-500 text-white rounded-md px-4 py-2 hover:bg-slate-600 transition-colors duration-200 hover:opacity-95 w-full "
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="">right</div>
    </div>
  );
};

export default Search;
