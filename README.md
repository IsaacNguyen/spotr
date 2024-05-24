# Spotr


## Submitted to LA Hacks 2024
Spotr is a full-stack application that allows users to share their favorite locations via interactive pins on a map, utilizing the Google Maps API. The app provides a seamless experience for users to mark and share their favorite spots, view locations shared by others, and manage their own personalized maps.

## Features

- **Interactive Map with Google Maps API**: Users can drop pins on the map to mark their favorite locations.
- **User Authentication**: Secure login and registration system using username and password authentication.
- **Personalized Content**: Each user has their own personalized map displaying their saved pins.
- **Real-time Data Storage and Retrieval**: Efficient data handling with Firebase for storing and retrieving location data.
- **Smooth Frontend Experience**: Responsive and dynamic user interface built with React.
- **Robust Backend Communication**: Server-side operations managed with Node.js and Express.js for reliable data processing and API interactions.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: Firebase
- **Authentication**: Firebase Authentication (Username-Password)
- **APIs**: Google Maps API

## Installation

To set up Spotr on your local machine, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/spotr.git
    cd spotr
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your Google Maps API key and Firebase configuration:
    ```env
    REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    FIREBASE_API_KEY=your_firebase_api_key
    FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    FIREBASE_PROJECT_ID=your_firebase_project_id
    FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    FIREBASE_APP_ID=your_firebase_app_id
    ```

4. **Run the Application**:
    ```bash
    npm start
    ```

    This will start the development server and open the application in your default web browser.

## Usage

1. **Register/Login**: Create a new account or log in with existing credentials.
2. **Add a Pin**: Navigate the map and click to add a new pin marking your favorite location.
3. **View Pins**: Explore the map to see pins added by other users.
4. **Manage Your Locations**: View and manage the pins you've added to your personalized map.
