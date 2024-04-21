import React from 'react';

function DisplayInfo({ place, close }) {
  return (
    <div className="display-info-container">
      <div className='button-container'>
        <button>SAVE</button>
        <button onClick={close}>x</button>
      </div>

      <div className="display-info">
        {place.image && (
          <div className="place-image-container">
            <img src={place.image} alt={place.name} className="place-image" />
          </div>
        )}
        <div className="place-details">
          <div className="place-name">{place.name}</div>
          <div className="place-description">{place.description}</div>
        </div>
      </div>
    </div>
  );
}

export default DisplayInfo;
