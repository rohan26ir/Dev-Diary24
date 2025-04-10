import React, { useState, useContext } from "react";
import { AuthContext } from "../../Provider/Provider";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const SignUp = () => {
  const { createNewUser } = useContext(AuthContext); // Firebase Auth Context
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null); // State for the uploaded image URL
  const [error, setError] = useState(""); // Error state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axiosPublic.post(imageHostingAPI, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setImage(response.data.data.url); // Set the uploaded image URL
      } catch (err) {
        console.error("Image Upload Error:", err);
        setError("Failed to upload image");
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const { name, phone, email, password } = formData;

    if (!name || !phone || !email || !password || !image) {
      setError("All fields are required!");
      return;
    }

    // Firebase Authentication Signup
    try {
      const result = await createNewUser(email, password);
      console.log("Firebase Signup Success:", result.user);

      // Prepare user data
      const userInfo = {
        name,
        phone,
        email,
        image, // Include image URL in the user data
      };

      // Send user data to the backend
      const res = await axiosPublic.post("/users", userInfo);
      console.log("User saved in DB:", res.data);

      // Success message and redirect after successful signup
      setSuccessMessage("Account created successfully!");
      navigate("/");
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.message);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="px-2">
          {/* Name */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">What is your name?</legend>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="Type here"
            />
          </fieldset>

          {/* Image Upload */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">Pick an image</legend>
            <input
              type="file"
              className="file-input"
              onChange={handleImageChange}
            />
            <label className="fieldset-label text-white">Max size 2MB</label>
          </fieldset>

          {/* Email */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">What is your email?</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mail@site.com"
                required
              />
            </label>
            <div className="validator-hint hidden">Enter a valid email address</div>
          </fieldset>

          {/* Password */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">What is your password?</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, and uppercase letter"
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
              <br />
              At least one uppercase letter
            </p>
          </fieldset>

          <button
            type="submit"
            className="w-full border-[2px] bg-[#FB2C36] text-white font-bold border-gray-300 py-2 rounded-lg cursor-pointer"
          >
            Create Account
          </button>
        </form>

        {error && <p className="error-message text-red-500">{error}</p>}
        {successMessage && (
          <p className="success-message text-green-500">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
