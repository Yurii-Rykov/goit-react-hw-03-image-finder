import React from 'react';
import s from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({propHits}) => {

  return propHits.map(el => (
    <li key={el.id} className={s.ImageGalleryItem}>
      <img src={el.webformatURL} alt="" width="300"  className={s.ImageGalleryItem_image}/>
    </li>
  ))}

export default ImageGalleryItem;
