import {} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import CarListing from "./pages/CarListing";
import CarDetails from "./pages/CarDetails";
import ContactOwner from "./pages/ContactOwner";

function App() {
  return (
    <>
      <Header />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/owner-contact/:seller" element={<ContactOwner />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/cars" element={<CarListing />} />
            <Route path="/car_details/:carId" element={<CarDetails />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
