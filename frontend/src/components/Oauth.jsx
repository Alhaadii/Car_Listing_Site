import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "../firebase";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Oauth = () => {
  const { signInSuccess } = useAppContext();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      // Logic for Google Sign-In
      const auth = getAuth(firebaseApp);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Google sign-in failed");
        throw new Error(data.message || "Google sign-in failed");
      }
      signInSuccess(data);
      toast.success("Google sign-in successful!");
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      type="button"
      className="bg-red-500 text-white p-2  mt-2 cursor-pointer rounded w-full hover:bg-red-600 transition duration-200"
    >
      Sign in with Google
    </button>
  );
};

export default Oauth;
