import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Listingdetails from "./Listingdetails";

const Search = () => {
  const navigate = useNavigate();
  const location = window.location;
  const [carData, setCarData] = useState([]);
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    sort: "createdAt",
    order: "desc",
    condition: "all",
    transmission: "all",
    fuelType: "all",
  });
  const [showMore, setShowMore] = useState(false);
  const handlesubmitFun = (e) => {
    e.preventDefault();
    const urlPatterns = new URLSearchParams();
    for (const key in sideBarData) {
      // Only add offer if checked (true)
      if (key === "offer" && !sideBarData.offer) continue;
      urlPatterns.append(key, sideBarData[key]);
    }

    const searchQuery = urlPatterns.toString();
    const url = `/search?${searchQuery}`;
    navigate(url);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    const typeFromUrl = urlParams.get("type");
    const offerFromUrl = urlParams.get("offer");
    const conditionFromUrl = urlParams.get("condition");
    const transmissionFromUrl = urlParams.get("transmission");
    const fuelTypeFromUrl = urlParams.get("fuelType");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    setSideBarData({
      searchTerm: searchTermFromUrl || "",
      type: typeFromUrl || "all",
      offer:
        offerFromUrl === null ? false : offerFromUrl === "true" ? true : false,
      condition: conditionFromUrl || "all",
      transmission: transmissionFromUrl || "all",
      fuelType: fuelTypeFromUrl || "all",
      sort: sortFromUrl || "created_at",
      order: orderFromUrl || "desc",
    });
    const searchQuery = urlParams.toString();
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/car/all?${searchQuery}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCarData(data.carListings);
        if (data.carListings && data.carListings.length >= 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "Rent" ||
      e.target.id === "Sale"
    ) {
      setSideBarData({
        ...sideBarData,
        type: e.target.id,
      });
    }
    if (e.target.id === "offer") {
      setSideBarData({
        ...sideBarData,
        offer: e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "search") {
      setSideBarData({
        ...sideBarData,
        searchTerm: e.target.value,
      });
    }
    if (
      e.target.id === "condition" ||
      e.target.id === "transmission" ||
      e.target.id === "fuelType"
    ) {
      setSideBarData({
        ...sideBarData,
        [e.target.id]: e.target.value,
      });
    }
    if (e.target.id === "sort_order") {
      setSideBarData({
        ...sideBarData,
        sort: e.target.value.split("_")[0],
        order: e.target.value.split("_")[1],
      });
    }
  };

  const showMoreListings = () => {
    const numberOfListings = carData.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const url = `/search?${searchQuery}`;
    const response = fetch(`/api/car/all?${searchQuery}`);
    response
      .then((res) => res.json())
      .then((data) => {
        if (data.carListings && data.carListings.length > 0) {
          if (data.carListings.length < 8) {
            setShowMore(false);
          }
          setCarData((prevData) => [...prevData, ...data.carListings]);
        } else {
          console.log("No more listings to show.");
        }
      })
      .catch((error) => {
        console.error("Error fetching more listings:", error);
      });
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* left side filter */}
      <div className="p-7 border-b-2 border-gray-300 md:border-r-2 md:min-h-screen">
        <form onSubmit={handlesubmitFun} className="flex flex-col space-y-4">
          <div className="mb-4 flex items-center">
            <label
              htmlFor="search"
              className="block text-gray-700 text-sm mb-2 whitespace-nowrap mr-2"
            >
              Search Term:
            </label>
            <input
              onChange={handleChange}
              value={sideBarData.searchTerm}
              type="text"
              id="search"
              className="border border-gray-300 rounded-md p-2 w-full bg-white"
              placeholder="Search for cars..."
            />
          </div>
          <hr className="border-t border-gray-300" />
          {/*Type */}
          <div className="flex flex-wrap gap-2 items-center">
            <label htmlFor="Type">Type:</label>
            <div className="flex gap-2 items-center">
              <input
                onChange={handleChange}
                checked={sideBarData.type == "all"}
                type="checkbox"
                name="all"
                id="all"
              />
              <label htmlFor="all">Rent & Sale</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                onChange={handleChange}
                checked={sideBarData.type == "Rent"}
                type="checkbox"
                name="Rent"
                id="Rent"
              />
              <label htmlFor="Rent">Rent</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                onChange={handleChange}
                checked={sideBarData.type == "Sale"}
                type="checkbox"
                name="Sale"
                id="Sale"
              />
              <label htmlFor="Sale">Sale</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                onChange={handleChange}
                checked={sideBarData.offer}
                type="checkbox"
                name="offer"
                id="offer"
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <hr className="border-t border-gray-300" />
          {/* Condition */}
          <div className="flex gap-2 items-center">
            <label htmlFor="condition">Condition:</label>
            <select
              onChange={handleChange}
              id="condition"
              className="border bg-white border-gray-300 rounded-md p-2 md:w-full"
            >
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
              onChange={handleChange}
              id="transmission"
              className="border bg-white border-gray-300 rounded-md p-2 md:w-full"
            >
              <option value="all">Any</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
          <hr className="border-t border-gray-300" />
          {/* Fuel Type */}
          <div className="flex gap-2 items-center">
            <label htmlFor="fuel" className="whitespace-nowrap">
              Fuel Type:
            </label>
            <select
              onChange={handleChange}
              id="fuelType"
              className="border bg-white border-gray-300 rounded-md p-2 md:w-full"
            >
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
            <label htmlFor="sort_order" className="whitespace-nowrap">
              Sort By:
            </label>
            <select
              id="sort_order"
              onChange={handleChange}
              className="border bg-white border-gray-300 rounded-md p-2 md:w-full"
            >
              <option value="price_desc">Price: High to Low</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="createdAt_asc">Oldest</option>
              <option value="createdAt_desc">Latest</option>
            </select>
          </div>
          <hr className="border-t border-gray-300" />
          {/* submit button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-slate-500 text-white rounded-md px-4 py-2 hover:bg-slate-600 transition-colors duration-200 hover:opacity-95 w-full cursor-pointer "
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {/* right side results */}
      <div className="flex-1 md:min-h-screen bg-white">
        <h1 className="text-xl font-semibold p-4">Listing Details </h1>
        <hr className="border-t border-gray-300" />
        <div className="p-7 overflow-y-auto md:min-h-screen">
          {carData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {carData.map((car) => (
                <Listingdetails key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No cars found matching your criteria.
            </div>
          )}
        </div>
        <div className="p-4">
          {showMore && (
            <button
              onClick={showMoreListings}
              className="bg-slate-500 text-white rounded-md px-4 py-2 hover:bg-slate-600 transition-colors duration-200 hover:opacity-95 w-full cursor-pointer"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
