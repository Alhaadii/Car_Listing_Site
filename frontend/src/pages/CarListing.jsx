import { use, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import { set } from "mongoose";

const CarListing = () => {
  const clearRefFiles = useRef(null);
  const { currentUser, error, setError, loading, setLoading } = useAppContext();
  const { user } = currentUser || {};
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [carDetails, setCarDetails] = useState({
    name: "",
    make: "",
    model: "",
    year: 2002,
    price: 0,
    description: "",
    discount: 0,
    mileage: 0,
    fuelType: "Petrol",
    transmission: "Manual",
    condition: "New",
    location: "",
    type: "Sale",
    offer: false,
    seller: user?._id || "",
    images: [],
  });

  // file change function handler
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log(selectedFiles.length + files.length);
    if (files.length + selectedFiles.length > 6) {
      toast.error("You can only upload a maximum of 6 images.");
      setImageUploadError("You can only upload a maximum of 6 images.");
      if (clearRefFiles.current) clearRefFiles.current.value = null; // Clear the input field
      setFiles([]);
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setImageUploadError(null);
  };

  // Upload one file funtion
  const uploadImageFun = async (image) => {
    toast.info("Uploading image...");
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "car-listing-site");
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    if (res.ok && data.secure_url) {
      return data.secure_url;
    }
    toast.error("Failed to upload image. Please try again.");
  };

  // Uploading Multiple images
  const uploadMultipleImagesFun = async () => {
    console.log(files.length);
    if (files.length === 0) {
      toast.error("Please select images to upload.");
      return;
    }
    setUploadingImages(true);
    const uploadedUrls = [];
    try {
      for (const image of files) {
        const url = await uploadImageFun(image);
        if (url) {
          uploadedUrls.push(url);
        }
      }
      setImageUrls((prev) => [...prev, ...uploadedUrls]);
      setCarDetails((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
      setFiles([]);
      toast.success("Images uploaded successfully!");
      setUploadingImages(false);
    } catch (error) {
      setUploadingImages(false);
      setImageUploadError("An error occurred while uploading images.");
      toast.error(imageUploadError);
      return;
    } finally {
      setUploadingImages(false);
    }
  };
  // Handle removing an image
  const handleRemoveImage = (index) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
    setCarDetails((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Handle change in form fields
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setCarDetails({
        ...carDetails,
        type: e.target.checked
          ? e.target.id === "sale"
            ? "Sale"
            : "Rent"
          : carDetails.type,
      });
      return;
    }
    if (e.target.id === "offer") {
      setCarDetails({
        ...carDetails,
        offer: e.target.checked,
      });
      return;
    }
    setCarDetails({
      ...carDetails,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    if (
      !carDetails.name ||
      !carDetails.description ||
      !carDetails.make ||
      !carDetails.model ||
      !carDetails.year ||
      !carDetails.mileage ||
      !carDetails.fuelType
    ) {
      setError("Please fill in all required fields.");
      toast.error(error);
      return;
    } else if (carDetails.images.length <= 0) {
      setError("Please upload at least one image.");
      toast.error(error);
      return;
    } else if (+carDetails.price < +carDetails.discount) {
      setError("Discount price cannot be greater than regular price.");
      toast.error(error);
      return;
    }
    // Submit form data
    try {
      setLoading(true);
      const response = await fetch("/api/car/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carDetails),
      });
      if (!response.ok) {
        toast.error("Failed to create car listing.");
        setLoading(false);
        throw new Error("Failed to create car listing.");
      }
      toast.success("Car listing created successfully!");
      setTimeout(() => {
        clearAll();
      }, 1000);
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // clear handler
  const clearAll = () => {
    setCarDetails({
      name: "",
      make: "",
      model: "",
      year: 0,
      price: 0,
      description: "",
      discount: 0,
      mileage: 0,
      fuelType: "Petrol",
      transmission: "Manual",
      condition: "New",
      location: "",
      type: "Sale",
      offer: false,
      seller: user?._id || "",
      color: "",
      images: [],
    });
    setImageUrls([]);
    if (clearRefFiles.current) clearRefFiles.current.value = null; // Clear the input field
    setFiles([]);
    setLoading(false);
    setError(null);
    window.location.reload();
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-center font-semibold text-3xl my-7">
        Create Car Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        {/* Left Side Form */}
        <div className="flex-1">
          <div className="mb-4 bg-white">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              defaultValue={carDetails.name}
              id="name"
              required
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter car name"
            />
          </div>
          {/* description */}
          <div className="mb-4  bg-white">
            <textarea
              name="description"
              onChange={handleChange}
              defaultValue={carDetails.description}
              id="description"
              required
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter car description"
              rows="4"
            ></textarea>
          </div>
          {/* make */}
          <div className="mb-4  bg-white">
            <input
              name="make"
              id="make"
              required
              onChange={handleChange}
              defaultValue={carDetails.make}
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Make. e.g., Toyota, Ford, etc."
            />
          </div>
          {/* model */}
          <div className="mb-4  bg-white">
            <input
              name="model"
              id="model"
              required
              onChange={handleChange}
              defaultValue={carDetails.model}
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter car model"
            />
          </div>
          {/* year */}
          <div className="mb-4  bg-white">
            <input
              name="year"
              id="year"
              required
              onChange={handleChange}
              defaultValue={carDetails.year}
              type="number"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Year. e.g., 2020, 2021, etc."
            />
          </div>
          {/* Mileage */}
          <div className="mb-4  bg-white">
            <input
              id="mileage"
              required
              name="mileage"
              onChange={handleChange}
              defaultValue={carDetails.mileage}
              type="number"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Mileage. e.g., 10000"
            />
          </div>
          {/* Fuel Type */}
          <div className="mb-4  bg-white">
            <select
              name="fuelType"
              id="fuelType"
              required
              onChange={handleChange}
              defaultValue={carDetails.fuelType}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          {/* Transmission */}
          <div className="mb-4  bg-white">
            <select
              name="transmission"
              id="transmission"
              required
              onChange={handleChange}
              defaultValue={carDetails.transmission}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="" disabled>
                Transmission
              </option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
          {/* Condition */}
          <div className="mb-4  bg-white">
            <select
              name="condition"
              id="condition"
              required
              onChange={handleChange}
              defaultValue={carDetails.condition}
              className="border  border-gray-300 rounded-md p-2 w-full"
            >
              <option disabled>Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>
          {/* Location */}
          <div className="mb-4  bg-white">
            <input
              type="text"
              id="location"
              required
              name="location"
              onChange={handleChange}
              defaultValue={carDetails.location}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter location"
            />
          </div>
          {/* Type */}
          <div className="mb-4 flex gap-2 flex-wrap bg-white p-2 rounded-md">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Sale"
                id="sale"
                onChange={handleChange}
                checked={carDetails.type === "Sale"}
                className="mr-2 bg-white"
              />
              <span>Sale</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="Rent"
                id="rent"
                onChange={handleChange}
                checked={carDetails.type === "Rent"}
                className="mr-2 bg-white"
              />
              <span>Rent</span>
            </label>

            <label className="flex items-center justify-center">
              <input
                type="checkbox"
                id="offer"
                onChange={handleChange}
                checked={carDetails.offer}
                name="offer"
                className="mr-2  bg-white "
              />
              <span>Offer</span>
            </label>
          </div>
          {/* Price */}
          <div className="mb-4  bg-white flex space-x-2">
            <input
              type="number"
              name="price"
              id="price"
              required
              onChange={handleChange}
              defaultValue={carDetails.price}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Price. e.g., 20000"
            />
            <div className=" flex w-full items-center  border border-gray-300 rounded-md p-2">
              <p>Regular Price</p>
              {carDetails.type === "Rent" ? <span>($/Month)</span> : ""}
            </div>
          </div>
          {/* Discount */}
          {carDetails.offer && (
            <div className="mb-4  bg-white flex space-x-2">
              <input
                type="number"
                name="discount"
                id="discount"
                onChange={handleChange}
                defaultValue={carDetails.discount}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Discount. e.g., 20000"
              />
              <div className=" flex w-full items-center  border border-gray-300 rounded-md p-2">
                <p>Discount Price</p>
                {carDetails.type === "Rent" ? <span>($/Month)</span> : ""}
              </div>
            </div>
          )}
        </div>
        {/* Right Side Form */}
        <div className="flex-1">
          <div className="flex gap-2 mb-4 rounded-md">
            <p className="font-semibold">Images:</p>
            <span className="text-gray-500">
              The First Image will be the cover (Max:6)
            </span>
          </div>
          <div className=" p-2 border border-gray-300 rounded-md mb-4 flex gap-2">
            <input
              type="file"
              onChange={handleFileChange}
              ref={clearRefFiles}
              name="images"
              multiple
              accept="image/*"
              className="border border-gray-300 rounded-md p-2 w-full cursor-pointer"
            />
            <button
              disabled={uploadingImages}
              type="button"
              onClick={uploadMultipleImagesFun}
              className="text-green-900 border border-green-600 rounded-md p-3 hover:shadow-lg cursor-pointer transition-colors duration-300 disabled:opacity-95"
            >
              {uploadingImages ? "Uploading..." : "Upload"}
            </button>
          </div>
          <div className="">
            <p>Uploaded Images:</p>
            <div className="flex gap-2 flex-col">
              {imageUrls?.map((image, index) => (
                <div
                  key={index}
                  className="relative border border-gray-300 rounded-md p-2"
                >
                  <img
                    src={image}
                    alt={`Uploaded Preview ${index + 1}`}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-lg p-4 cursor-pointer w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            disabled={uploadingImages}
            type="submit"
            className="w-full uppercase text-white bg-green-600 mt-4 rounded-md p-3 hover:shadow-lg cursor-pointer transition-colors duration-300 disabled:opacity-95"
          >
            Create Car Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CarListing;
