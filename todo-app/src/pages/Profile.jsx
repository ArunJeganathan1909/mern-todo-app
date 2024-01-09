import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/components/Profile.css'

const Profile = () => {
  const [accountDetails, setAccountDetails] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get("/account", {
          // Add any necessary headers or configurations here
        });
        setAccountDetails(response.data);
      } catch (error) {
        setError("Error fetching account details");
      }
    };

    fetchAccountDetails();
  }, []);

  const navigateBack = () => {
    navigate(-1); // Redirects back to the previous page in history
  };

  return (
    <div className="profile-info">
      <div className="profile-page-header">
        <h2 className="profile-heading2">Account Details</h2>
        <button className="nav-button" onClick={navigateBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="edit-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      </div>

      <div className="profile-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="profile-theme"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </div>
      <div>
        <div className="profile-content">
          <h3 className="profile-heading3">Name:</h3>
          <span className="profile-text">{accountDetails.name}</span>
        </div>
        <div className="profile-content">
          <h3 className="profile-heading3">Email:</h3>
          <span className="profile-text">{accountDetails.email}</span>
        </div>
        <div className="profile-content">
          <h3 className="profile-heading3">Mobile: </h3>
          <span className="profile-text">{accountDetails.mobile}</span>
        </div>
      </div>      
    </div>
  );
};

export default Profile;
