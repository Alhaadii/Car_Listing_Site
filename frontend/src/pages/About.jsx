const About = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <p className="mb-4">
        Welcome to our car listing site! We are dedicated to helping you find
        the perfect car for your needs.
      </p>
      <p>
        Our team is passionate about cars and is here to provide you with the
        best service possible. Thank you for choosing us!
      </p>
      <h2 className="text-xl font-semibold mt-6">Our Mission</h2>
      <p className="mb-4">
        To connect car buyers and sellers in a seamless and efficient manner,
        making the car buying experience enjoyable and hassle-free.
      </p>
      <h2 className="text-xl font-semibold mt-6">Contact Us</h2>
      <p className="mb-4">
        If you have any questions or need assistance, feel free to reach out to
        us at{" "}
        <a href="mailto:support@carlistingsite.com">
          support@carlistingsite.com
        </a>
        .
      </p>
      <h2 className="text-xl font-semibold mt-6">Follow Us</h2>
      <p className="mb-4">
        Stay updated with our latest listings and news by following us on social
        media:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </li>
        <li>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </li>
      </ul>
    </div>
  );
};

export default About;
