import React from 'react';
import PropTypes from 'prop-types'
import s from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({propHits, onImgClick}) => {
  return propHits.map(el => (
    <li key={el.id} className={s.ImageGalleryItem} onClick={() => onImgClick(el.largeImageURL)}>
      <img src={el.webformatURL} alt="images" width="300" className={s.ImageGalleryItem_image}/>
    </li>
  ))}


export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  propHits: PropTypes.array.isRequired,
  onImgClick: PropTypes.func.isRequired
}