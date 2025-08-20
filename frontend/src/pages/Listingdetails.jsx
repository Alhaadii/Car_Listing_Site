import { FaMapMarkerAlt } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { BsFillFuelPumpFill, BsSpeedometer } from "react-icons/bs";
import { Link } from "react-router-dom";
import moment from "moment";

const Listingdetails = ({ car }) => {
  return (
    <div className=" p-4 rounded-md w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
      <Link to={`/car_details/${car._id}`} className="block">
        <img
          src={car.images[0]}
          alt={car.name}
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
      </Link>
      <h2 className="text-lg font-semibold">{car.name}</h2>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <FaMapMarkerAlt className="inline-block mr-2 text-gray-600" />
          <p className="text-gray-600">{car.location}</p>
        </div>
        <p className="text-gray-600">{car.type}</p>
      </div>
      <p className="text-gray-600 truncate">{car.description}</p>
      <p className="text-gray-600">
        $ {car.offer ? car.price - car.discount : car.price}{" "}
        {car.type === "Rent" && "/Month"}
      </p>
      <hr className="border-gray-300 my-2" />
      <div className="text-gray-600 space-y-1 flex items-center justify-between flex-wrap gap-1">
        <p className="flex items-center">
          <GiGearStickPattern className="inline-block mr-2 text-gray-600" />
          <span className="text-gray-600">{car.transmission}</span>
        </p>
        <p className="flex items-center">
          <BsFillFuelPumpFill className="inline-block mr-2 text-gray-600" />
          <span className="text-gray-600">{car.fuelType}</span>
        </p>
        <p className="flex items-center">
          <BsSpeedometer className="inline-block mr-2 text-gray-600" />
          <span className="text-gray-600">{car.mileage}km</span>
        </p>
      </div>
      <hr className="border-gray-300 my-2" />
      <p className="text-white p-1 text-sm absolute top-0 right-1 bg-green-900 rounded-2xl ">
        {moment(car.createdAt).fromNow()}
      </p>
    </div>
  );
};

export default Listingdetails;
