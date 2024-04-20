import express from 'express';
import db from './server.js';

const router = express.Router();

// POST request to add a new place
router.post('/places', async (req, res) => {
    try {
        const { name, imageUrl, latitude, longitude, description, username } = req.body;

        // Validate data
        if (!name || !imageUrl || !latitude || !longitude || !description || !username) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create new document in "places" collection
        const placeRef = await db.collection('places').add({
            name,
            imageUrl,
            latitude: parseInt(latitude),
            longitude: parseInt(longitude),
            description,
            username,
        });

        // Add reference to the newly created place in the user's collection
        const userRef = db.collection('users').doc(username);
        await userRef.collection('uploadedPlaces').doc(placeRef.id).set({
            placeId: placeRef.id,
        });

        res.status(201).json({ message: 'Place added successfully', id: placeRef.id });
    } catch (error) {
        console.error('Error adding place:', error);
        res.status(500).json({ error: 'Failed to add place' });
    }
});

// GET request to retrieve all places
router.get('/places', async (req, res) => {
    try {
        // Query all documents in the "places" collection
        const snapshot = await db.collection('places').get();
        const places = snapshot.docs.map(doc => doc.data());

        res.status(200).json(places);
    } catch (error) {
        console.error('Error retrieving places:', error);
        res.status(500).json({ error: 'Failed to retrieve places' });
    }
});

// POST request for user signup
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate data
        if (!username || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if the username already exists
        const userSnapshot = await db.collection('users').doc(username).get();
        if (userSnapshot.exists) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Create new user document in "users" collection
        await db.collection('users').doc(username).set({
            username,
            password, // Note: You should hash and salt the password before saving it
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// POST request for user login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username exists
        const userSnapshot = await db.collection('users').doc(username).get();
        if (!userSnapshot.exists) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare the password provided with the password in the database
        const storedPassword = userSnapshot.data().password;
        // Compare passwords securely (e.g., using bcrypt.compare)

        if (password !== storedPassword) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // If authentication succeeds, return a success response
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Failed to login user' });
    }
});


export default router;
