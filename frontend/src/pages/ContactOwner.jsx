import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const ContactOwner = () => {
  const { seller } = useParams();
  const [sellerDetails, setSellerDetails] = useState(null);
  const [message, setMessage] = useState();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const getSellerDetails = async () => {
      const response = await fetch(`/api/user/${seller}`);
      const data = await response.json();
      setSellerDetails(data.seller);
    };
    getSellerDetails();
  }, [seller]);

  if (sent) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-green-100 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-green-800 mb-4">Message Sent!</h2>
        <p className="text-green-700">
          Your message has been sent to {sellerDetails?.username}. We will
          notify you when they respond.
        </p>
        <Link
          to="/"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-4xl mx-auto shadow-lg rounded-lg p-6 bg-gray-50">
      <p readOnly className="w-full  mb-3 text-lg">
        <span className="font-bold capitalize"> Contact The owner: </span>
        {sellerDetails && sellerDetails.username}
      </p>
      <textarea
        name="message"
        id="message"
        cols={20}
        rows={8}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message to the owner..."
        className="w-full bg-gray-100 p-3 text-base rounded border border-gray-300 focus:outline-none"
      ></textarea>
      <a
        onClick={() => setSent(true)}
        className="bg-green-600 w-full block text-center rounded-sm text-white text-2xl cursor-pointer p-4"
        href={`mailto:${sellerDetails?.email}?subject=Regarding%20${
          sellerDetails?.username
        }&body=${encodeURIComponent(message)}`}
      >
        Send Message
      </a>
    </div>
  );
};

export default ContactOwner;
