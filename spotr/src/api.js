import axios from 'axios';
import qs from 'qs';


const baseURL = 'http://localhost:3000/';
// Create an instance of axios with custom configuration
const axiosClient = axios.create({
  baseURL: baseURL, // Base URL for all requests
  timeout: 5000, // Timeout in milliseconds
});

// Define functions to make POST and GET requests

// Function to add a new place
export const addPlace = async (placeData) => {
  try {
    // Make a POST request to the server endpoint for adding a place to a city
    
    const response = await axiosClient.post(`/places`, placeData);
    
    return response.data; // Return the response data
  } catch (error) {
    throw new Error('Failed to add place'); // Throw an error if request fails
  }
};

export const checkIfPlaceSaved = async (placeData) => {
  try {
    // Make a GET request to your backend API endpoint to check if the place is saved
    const response = await axios.get(`/checkIfPlaceSaved`, placeData);

    // Assuming the backend returns a boolean indicating whether the place is saved
    return response.request.status;
  } catch (error) {
    console.error('Error checking if place is saved:', error);
    // Handle errors appropriately (e.g., return false if an error occurs)
    return false;
  }
};

export const savePlace = async (placeData) => {
  try {
    // Make a POST request to the server endpoint for saving a place to a city
    const response = await axiosClient.post(`/savePlace`, placeData);
    
    return response.data; // Return the response data
  } catch (error) {
    throw new Error('Failed to save place'); // Throw an error if request fails
  }
};

// Function to retrieve all places within a specific city
export const getPlaces= async () => {
  try {
    // Make a GET request to the server endpoint for retrieving places in a city
    const response = await axiosClient.get(`/places`);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error('Failed to retrieve places'); // Throw an error if request fails
  }
};

// Function to sign up a new user
export const signupUser = async (userData) => {
    try {

      const response = await axiosClient.post('/signup', userData);
      
      return response.data;
    } catch (error) {
      throw new Error('Failed to sign up user');
    }
  };
  
  // Function to log in a user
  export const loginUser = async (userData) => {
    try {
      const response = await axiosClient.post('/login', userData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to log in user');
    }
  };



export default axiosClient;
