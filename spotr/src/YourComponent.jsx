import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from './firebase';

const YourComponent = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        setData(documents);
      };
  
      fetchData();
    }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount
  
    return (
      <div>
        <h1>Your Collection</h1>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {/* Render your data here */}
              {/* For example, assuming your document structure has a 'name' field */}
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default YourComponent;