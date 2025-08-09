import {} from "react-router-dom";
import Header from "./components/Header";
import SellerHome from "./pages/SellerHome";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import CarListing from "./pages/CarListing";
import CarDetails from "./pages/CarDetails";
import ContactOwner from "./pages/ContactOwner";
import Footer from "./pages/Footer";
import Search from "./pages/Search";
import CarListingUpdate from "./pages/CarListingUpdate";

function App() {
  return (
    <>
      <Header />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seller-home" element={<SellerHome />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/owner-contact/:seller" element={<ContactOwner />} />
          <Route path="/search" element={<Search />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/cars" element={<CarListing />} />
            <Route path="/cars/edit/:carId" element={<CarListingUpdate />} />
            <Route path="/car_details/:carId" element={<CarDetails />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
