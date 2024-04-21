import express from 'express';
import {storage, db} from './server.js';

const router = express.Router();


// POST request to add a new place
router.post('/places', async (req, res) => {
    try {
        const { description, image, lat, lng, name, user } = req.body;

        // Validate data
        if (!name || !image || !lat || !lng || !description || !user) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create new document in "places" collection
        const placeRef = await db.collection('places').add({
            description,
            image,
            lat,
            lng,
            name,
            user,
        });

        // Add reference to the newly created place in the user's collection
        const userRef = db.collection('users').doc(user);
        await userRef.collection('uploadedPlaces').doc(placeRef.id).set({
            placeId: placeRef.id,
        });

        res.status(201).json({ message: 'Place added successfully', id: placeRef.id });
    } catch (error) {
        console.error('Error adding place:', error);
        res.status(500).json({ error: 'Failed to add place' });
    }
});

router.post('/savePlace', async (req, res) => {
    try {
        const { username, name } = req.body;

        // Validate data
        if (!username || !name) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const placesQuery = await db.collection('places').where('name', '==', name).get();

        // Check if any places match the name
        if (placesQuery.empty) {
            return res.status(404).json({ error: 'Place not found' });
        }

        // Retrieve the ID of the first matched place
        const placeSnapshot = placesQuery.docs[0]; // Assuming only one place has this name
        const placeId = placeSnapshot.id;

        // Add placeId to the user's 'savedPlaces' collection
        const userRef = db.collection('users').doc(username);
        await userRef.collection('savedPlaces').add({
            placeId: placeId // Use the ID of the existing place
        });

        res.status(201).json({ message: 'PlaceID saved successfully'});
    } catch (error) {
        console.error('Error posting placeID:', error);
        res.status(500).json({ error: 'Failed to saved placeID' });
    }
});

router.get('/checkIfPlaceSaved', async (req, res) => {
    try {
      const { name, username } = req.query;
  
      // Validate data
      if (!name || !username) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      // Check if the place is saved for the given user
      const userRef = db.collection('users').doc(username);
      const savedPlacesSnapshot = await userRef.collection('savedPlaces').where('name', '==', name).get();
      // If there's at least one document, the place is saved
      const isSaved = !savedPlacesSnapshot.empty;
      
      if (isSaved){
        res.status(200).json({message:'found'});
      }
      else {
        res.status(404).json({message:'not found'});
      }
    } catch (error) {
      console.error('Error checking if place is saved:', error);
      res.status(500).json({ error: 'Failed to check if place is saved' });
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
