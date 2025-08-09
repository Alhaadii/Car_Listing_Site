import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useAppContext } from "../context/AppContext";
import { FaShare } from "react-icons/fa";

SwiperCore.use([Navigation]);

const CarDetails = () => {
  const { currentUser } = useAppContext();
  const { user } = currentUser;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [carDetails, setCarDetails] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const getCarDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/car/${params.carId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch car details");
      }

      setCarDetails(data.car);
    } catch (error) {
      setError(`ERROR: ${error.message}`);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/car/delete/${params.carId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete car");
      }

      toast.success("Car deleted successfully");
      navigate("/"); // Redirect to home or car list
    } catch (err) {
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCarDetails();
  }, [params.carId]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : carDetails ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold mb-4">{carDetails.name}</h2>
            <FaShare
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Car details link copied to clipboard!");
              }}
              className="ml-2 cursor-pointer w-14 h-14 text-white bg-gray-500 rounded-full p-4 text-2xl"
            />
          </div>

          {/* Swiper for car images */}
          {carDetails.images && carDetails.images.length > 0 && (
            <Swiper navigation className="rounded-lg overflow-hidden mb-6">
              {carDetails.images.map((url, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={url}
                    alt={`Car ${index}`}
                    className="w-full h-96 object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <div className="bg-white p-4 rounded shadow mb-4">
            <p>
              <strong>Model:</strong> {carDetails.model}
            </p>
            <p>
              <strong>Year:</strong> {carDetails.year}
            </p>
            <p>
              <strong>Price:</strong> ${carDetails.price}
            </p>
            <p>
              <strong>Description:</strong> {carDetails.description}
            </p>
          </div>

          <button
            onClick={handleDeleteCar}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete Car
          </button>
          {carDetails.seller !== user._id ? (
            <Link to={`/owner-contact/${carDetails.seller}`}>
              <button className="bg-green-600 p-2 ml-4 float-end text-white rounded-sm cursor-pointer">
                Contact The Owner
              </button>
            </Link>
          ) : (
            ""
          )}
        </>
      ) : (
        <p className="text-center text-4xl">No car found.</p>
      )}
    </div>
  );
};

export default CarDetails;
