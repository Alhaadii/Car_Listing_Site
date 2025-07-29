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
