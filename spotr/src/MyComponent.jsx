import React, { useEffect, useState } from 'react';
import firebase from './firebase'; // Import your Firebase instance

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firebase.firestore().collection('users').get();
        const documents = snapshot.docs.map(doc => doc.data());
        setData(documents);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data && data.map(doc => (
        <div key={doc.id}>
          <p>{doc.name}</p>
          {/* Access other fields as needed */}
        </div>
      ))}
    </div>
  );
};

export default MyComponent;