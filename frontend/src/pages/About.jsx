import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-10">
        <div className="flex items-center mb-8">
          <img
            src="https://res.cloudinary.com/himadwise/image/upload/v1754222335/jorhixbz9hns1yx1jrwv.jpg"
            alt="Team"
            className="w-16 h-16 rounded-full border-4 border-blue-500 shadow-md mr-4"
          />
          <div>
            <h1 className="text-3xl font-extrabold text-blue-700 mb-1">
              About Us
            </h1>
            <p className="text-gray-500 text-sm">
              Driven by Passion. Focused on You.
            </p>
          </div>
        </div>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Welcome to{" "}
          <span className="font-semibold text-blue-600">Car Listing Site</span>!
          Our mission is to connect car buyers and sellers with ease,
          transparency, and trust. We believe in making your car search seamless
          and enjoyable.
        </p>
        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-600 mb-2">Our Mission</h2>
          <p className="text-gray-700">
            To empower you with the best tools and support, ensuring a
            hassle-free car buying and selling experience. Our dedicated team is
            always here to guide you every step of the way.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-600 mb-2">Contact Us</h2>
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-blue-500" />
            <a
              href="mailto:support@carlistingsite.com"
              className="text-blue-700 underline hover:text-blue-900 transition"
            >
              support@carlistingsite.com
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-2">Follow Us</h2>
          <div className="flex space-x-5 mt-2">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition text-2xl"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 transition text-2xl"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-700 transition text-2xl"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
