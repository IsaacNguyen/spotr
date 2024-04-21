import React from 'react';

function DisplayInfo({ place }) {
  return (
    <div className="display-info-container">
      <div className="display-info">
        {place.image && (
          <div className="place-image-container">
            <img src={place.image} alt={place.name} className="place-image" />
          </div>
        )}
        <div className="place-details">
          <div className="place-name">{place.name}</div>
          <div className="place-description">{place.description}</div>
          {/* Add other attributes as needed */}
          <div className='place-description'>uploaded by user: {place.user}</div>
        </div>
      </div>
    </div>
  );
}

export default DisplayInfo;
