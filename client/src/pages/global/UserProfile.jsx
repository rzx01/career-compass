import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/getProfile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          navigate('/authenticate');
        }

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserDetails(data.user);
        setEditedDetails(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token, navigate]);

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const data = await response.json();
      alert(data.message);
      // Redirect after successful deletion
      navigate('/authenticate'); // Redirect to the login or another page after user is deleted
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      const updatedUser = await response.json();
      setUserDetails(updatedUser.user);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Profile</h1>
      <div className="flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden w-full max-w-3xl p-8">
          <div className="flex items-center mb-4 border-b pb-4 border-gray-300 dark:border-gray-600">
            <div className="text-6xl text-gray-700 dark:text-gray-300">
              <FaUserCircle />
            </div>
            <div className="ml-6 flex-grow">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 flex justify-between items-center">
                {userDetails.name}
                <FaEdit
                  className="text-gray-500 cursor-pointer hover:text-blue-500"
                  onClick={handleEditClick}
                />
              </h2>
              <div className="flex flex-col mt-3">
                <p className="text-gray-600 dark:text-gray-400 text-lg">Email: {userDetails.email}</p>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Contact: {userDetails.contact_number}</p>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Education: {userDetails.education}</p>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Job: {userDetails.job}</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-between">
            <Link to="/results">
              <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 mr-2">
                Show Results
              </button>
            </Link>
            
            {/* <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
              Change Password
            </button> */}
            
            <button
              className="bg-red-500 flex flex-wrap justify-center items-center text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
              onClick={handleDeleteUser}
            >
              <FaTrashAlt className="mr-2" />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Edit form */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Edit Profile</h2>
            {Object.keys(userDetails).slice(0, -1).map((key) => (
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
