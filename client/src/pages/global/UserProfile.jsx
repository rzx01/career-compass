import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const UserProfile = () => {
  const { user_id } = useParams(); //getting user id from the url

  //user details- replace with data from your database
  const [userDetails, setUserDetails] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    contact: "+1234567890",
    education: "BSc in Computer Science, XYZ University",
    job: "Software Engineer at ABC Corp",
    socialAccounts: {
      linkedin: "https://www.linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({ ...userDetails });

  const handleEditClick = () => {
    setEditedDetails({ ...userDetails }); // the edit form with current user details
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleSave = () => {
    setUserDetails(editedDetails);
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      
      <h1 className="text-4xl font-bold mb-6 text-center">Profile</h1>
      <div className="flex flex-col items-center">
        {/* card for user details with dark mode support */}
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden w-full max-w-3xl p-8">
          <div className="flex items-center mb-4 border-b pb-4 border-gray-300 dark:border-gray-600">
            <div className="text-6xl text-gray-700 dark:text-gray-300">
              <FaUserCircle />
            </div>
            <div className="ml-6 flex-grow">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 flex justify-between items-center">
                {userDetails.fullName}
                <FaEdit
                  className="text-gray-500 cursor-pointer hover:text-blue-500"
                  onClick={handleEditClick}
                />
              </h2>
              <div className="flex flex-col mt-3">
                <p className="text-gray-600 dark:text-gray-400 text-lg">Email: {userDetails.email}</p>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Contact: {userDetails.contact}</p>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Education: {userDetails.education}</p>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Job: {userDetails.job}</p>
              </div>
            </div>
          </div>

          {/* accounts sections */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Social Accounts</h3>
            <div className="flex gap-4 mt-2">
              <a href={userDetails.socialAccounts.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-3xl text-blue-700 hover:text-blue-800" />
              </a>
              <a href={userDetails.socialAccounts.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-3xl text-gray-700 hover:text-gray-800" />
              </a>
              <a href={userDetails.socialAccounts.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-3xl text-blue-400 hover:text-blue-500" />
              </a>
            </div>
          </div>

          {/* buttons inside the card */}
          <div className="mt-6 flex justify-between">
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 mr-2">
              Show Results
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* edit form */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Edit Profile</h2>
            {Object.keys(userDetails).slice(0, -1).map((key) => ( // exclude socialAccounts
              <div key={key} className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                <input
                  type="text"
                  name={key}
                  value={editedDetails[key]}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                />
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 ml-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
