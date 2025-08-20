import Car from "../models/cars.model.js";

export const createCarList = async (req, res) => {
  const car = req.body;
  const newCar = new Car({
    name: car.name,
    make: car.make,
    model: car.model,
    year: car.year,
    price: car.price,
    description: car.description,
    discount: car.discount || 0,
    offer: car.offer || false,
    mileage: car.mileage,
    fuelType: car.fuelType,
    transmission: car.transmission,
    condition: car.condition,
    location: car.location,
    images: car.images || [],
    type: car.type,
    seller: car.seller,
  });

  try {
    await newCar.save();
    res.status(201).json({
      Message: "Car listing created successfully",
      Car: newCar,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error creating car listing",
      error: err.message,
    });
  }
};

//getCarBy the id of the currentyUser from verifyToken
export const getCarList = async (req, res) => {
  const userId = req.params.id;
  if (req.user.id !== userId) {
    return res.status(403).json({
      status: false,
      message: "You are not authorized to view this car listing",
    });
  }
  try {
    const car = await Car.find({ seller: userId });
    if (!car) {
      return res.status(404).json({
        status: false,
        message: "Car listing not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Car listing fetched successfully",
      car,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching car listing",
      error: error.message,
    });
  }
};

export const getSingleCar = async (req, res) => {
  if (!req.user.id) {
    return res.status(404).json({
      status: false,
      message: "Error User is not authorized",
    });
  }
  try {
    const carDetails = await Car.findById(req.params.id);

    if (!carDetails) {
      return res.status(404).json({
        status: false,
        message: "Car not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Fetched successfully",
      car: carDetails,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching car listing by id",
      error: error.message,
    });
  }
};

export const deleteCar = async (req, res) => {
  if (!req.user.id) {
    return res.status(404).json({
      status: false,
      message: "Error User is not authorized",
    });
  }
  try {
    const carDetails = await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: true,
      message: "Deleted successfully",
      car: carDetails,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error Deleting car by id",
      error: error.message,
    });
  }
};

export const UpdateCar = async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({
      status: false,
      message: "User is not authorized",
    });
  }

  try {
    // Optional: Check ownership of the car before updating
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({
        status: false,
        message: "Car not found",
      });
    }

    // Optional: Check if the car belongs to the user
    if (car.seller.toString() !== req.user.id) {
      return res.status(403).json({
        status: false,
        message: "You are not allowed to update this car",
      });
    }

    const carDetails = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: true,
      message: "Updated successfully",
      car: carDetails,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error updating car by ID",
      error: error.message,
    });
  }
};

// get All listings

export const getAllCars = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === "undefined" || offer === undefined || offer === null) {
      offer = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === "undefined" || type === undefined || type === "all") {
      type = { $in: ["Rent", "Sale"] };
    }

    let transmission = req.query.transmission;
    if (
      transmission === "undefined" ||
      transmission === undefined ||
      transmission === "all"
    ) {
      transmission = { $in: ["Automatic", "Manual", "CVT"] };
    }

    let condition = req.query.condition;
    if (
      condition === "undefined" ||
      condition === undefined ||
      condition === "all"
    ) {
      condition = { $in: ["New", "Used"] };
    }

    let fuelType = req.query.fuelType;
    if (
      fuelType === "undefined" ||
      fuelType === undefined ||
      fuelType === "all"
    ) {
      fuelType = { $in: ["Petrol", "Diesel", "Electric", "Hybrid"] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order === "desc" ? -1 : 1;

    const carListings = await Car.find({
      offer,
      type,
      transmission,
      condition,
      fuelType,
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { make: { $regex: searchTerm, $options: "i" } },
        { model: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    })
      .sort({ [sort]: order })
      .skip(startIndex)
      .limit(limit);

    return res.status(200).json({
      status: true,
      message: "All car listings fetched successfully",
      carListings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching all car listings",
      error: error.message,
    });
  }
};
