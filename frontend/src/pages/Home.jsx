import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { Link } from "react-router-dom";

const Home = () => {
  const [carList, setCarList] = useState([]);
  const { currentUser, error, setError, loading, setLoading } = useAppContext();
  const { user } = currentUser;

  useEffect(() => {
    getCarListbySeller();
  }, []);

  // getCar Filtering with the seller
  const getCarListbySeller = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/car/list/${user._id}`);
      const data = await response.json();
      const cars = data.car;
      setCarList(cars);
      setLoading(false);
    } catch (error) {
      setError(`ERROR: ${error.message}`);
      toast.error(error);
    }
  };

  const handleDeleteCar = async (carId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (!confirmDelete) return; // User clicked "Cancel"

    try {
      setLoading(true);
      const response = await fetch(`/api/car/delete/${carId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete car");
      }
      toast.success("Car deleted successfully");
      setCarList((prevList) => prevList.filter((car) => car._id !== carId));
      setLoading(false);
    } catch (error) {
      setError(`ERROR: ${error.message}`);
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-4">
      <h1 className="text-center text-2xl uppercase font-bold">Car Lists</h1>
      {/* Showing errors and Loadings */}
      <div className="text-center">
        {error && (
          <div className="text-red-500 text-center text-4xl bg-amber-200">
            {error}
          </div>
        )}
        {loading && <HashLoader color="#1bb310" speedMultiplier={1} />}
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-center items-center gap-4">
        {/* CarList */}
        {carList &&
          carList?.map((car, index) => {
            return (
              <div
                key={index}
                className="w-full shadow-lg rounded-xl bg-gray-100 space-x-2 p-4 hover:bg-gray-600 cursor-pointer"
              >
                <Link to={`/car_details/${car._id}`}>
                  {" "}
                  <img className="h-52 w-full" src={car?.images[0]} alt="" />
                </Link>
                <h1 className=" ml-2 mx-2 font-bold text-green-700 flex justify-between">
                  <span> {car.name}</span>
                  <span>{car.price}</span>
                </h1>
                <h3 className=" ml-2 mx-2 font-bold flex justify-between">
                  <span>{car.condition}</span>
                  <span>{car.type}</span>
                </h3>
                <button className="w-full border border-green-500 p-2 hover:bg-green-500 hover:text-white cursor-pointer">
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteCar(car._id)}
                  className="w-full border border-red-500 mt-2 p-2 hover:bg-red-500 hover:text-white cursor-pointer"
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
