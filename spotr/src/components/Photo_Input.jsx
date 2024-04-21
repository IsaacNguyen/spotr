import './styles.css';
import { useState } from 'react';
import { addPlace } from '../api';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// ... your Firebase configuration (replace with your actual values)
const firebaseConfig = {
    apiKey: "AIzaSyAjMSsqHg7kNlcLbDAhwOjQqN11q0o3AeQ",
    authDomain: "spotr-258a2.firebaseapp.com",
    databaseURL: "https://spotr-258a2-default-rtdb.firebaseio.com",
    projectId: "spotr-258a2",
    storageBucket: "spotr-258a2.appspot.com",
    messagingSenderId: "940149876291",
    appId: "1:940149876291:web:43b8fdf03acb27464296f6",
    measurementId: "G-MTW78WL73N"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function Photo_Input(props) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false); // Track upload status

  const storage = getStorage(firebaseApp);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async () => {
    if (!image) {
      console.error('Please select an image to upload');
      return;
    }

    setUploading(true); // Set uploading state for UI feedback

    try {
      // Create a unique filename to avoid conflicts
      const filename = `<span class="math-inline">\{Date\.now\(\)\}\-</span>{image.name}`;
      const storageRef = ref(storage, `images/${filename}`);

      // Upload the image to Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Update progress (optional)
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Error uploading image:', error);
          setUploading(false); // Reset upload state on error
        },
        async () => {
          // Get the downloadable URL after successful upload
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('Image uploaded successfully:', downloadURL);

          // Now use downloadURL for further processing (e.g., call addPlace)
          await addPlace({
            description,
            image: downloadURL,
            lat: gpsData.latitude,
            lng: gpsData.longitude,
            name,
            user: props.username,
          });

          props.close(); // Close the modal or component (if applicable)
          setUploading(false); // Reset upload state
        }
      );
    } catch (error) {
      console.error('Error:', error);
      setUploading(false); // Reset upload state on error
    }
  };

  return (
    <div className="main-input">
      <div style={{ padding: '10px' }}>Input Your Spot</div>
      <button className="close-button" onClick={props.close}>
        X
      </button>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {image && (
        <div
          style={{ flexDirection: 'column', display: 'flex', alignItems: 'center' }}
        >
          <img
            style={{ margin: '5px' }}
            className="uploaded-image"
            src={URL.createObjectURL(image)}
            alt="Uploaded"
          />
          <input
            onChange={handleNameChange}
            label="Name"
            placeholder="Name your Spot"
            style={{ marginBottom: '5px' }}
          />
          <textarea
            onChange={handleDescriptionChange}
            cols="20"
            rows="10"
            className="description"
            value={description}
            label="Description"
            placeholder="Give your Spot a short description"
          />
          <button onClick={handleSubmit} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      )}
    </div>
  );
}

