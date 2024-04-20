import axios from 'axios';

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
