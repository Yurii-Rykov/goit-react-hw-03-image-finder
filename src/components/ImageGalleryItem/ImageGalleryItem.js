import React from 'react';

const ImageGalleryItem = ({ propHits }) => {
console.log(propHits);
  return propHits.map(el => (
    <li key={el.id} className="gallery-item">
      <img src={el.webformatURL} alt="" width="300" />
    </li>
  ));
};

export default ImageGalleryItem;
