import express from 'express';
import db from './server.js';

const router = express.Router();

// POST request to add a new place to a specific city
router.post('/cities/:city/places', async (req, res) => {
    try {
      const { city } = req.params;
      const { name, imageUrl, latitude, longitude, description } = req.body;
  
      // Validate data
      if (!name || !imageUrl || !latitude || !longitude || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Create new document in "places" subcollection of the specified city
      const cityRef = db.collection('cities').doc(city);
      const placesCollectionRef = cityRef.collection('places');
      const docRef = await placesCollectionRef.add({
        name,
        imageUrl,
        latitude: parseInt(latitude),
        longitude: parseInt(longitude),
        description,
      });
  
      res.status(201).json({ message: 'Place added successfully', id: docRef.id });
    } catch (error) {
      console.error('Error adding place:', error);
      res.status(500).json({ error: 'Failed to add place' });
    }
});
  
  // GET request to retrieve all places in a specific city
  router.get('/cities/:city/places', async (req, res) => {
    try {
      const { city } = req.params;
      const cityRef = db.collection('cities').doc(city);
      const placesCollectionRef = cityRef.collection('places');
      
      // Query all documents in the "places" subcollection of the specified city
      const snapshot = await placesCollectionRef.get();
      const places = snapshot.docs.map(doc => doc.data());
      
      res.status(200).json(places);
    } catch (error) {
      console.error('Error retrieving places:', error);
      res.status(500).json({ error: 'Failed to retrieve places' });
    }
});

export default router;