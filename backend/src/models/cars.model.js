import mongoose from "mongoose";
const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
    },
    offer: {
      type: Boolean,
      default: false,
    },
    mileage: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
    },
    transmission: {
      type: String,
      required: true,
      enum: ["Automatic", "Manual", "CVT"],
    },
    condition: {
      type: String,
      required: true,
      enum: ["New", "Used", "Damaged"],
    },
    location: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Sale", "Rent"],
    },
    seller: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
export default Car;
