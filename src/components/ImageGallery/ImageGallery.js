import PropTypes from 'prop-types'
import s from './ImageGallery.module.css' 

const ImageGallery = ({hits, children}) => {
  return <ul className={s.gallery}>{children}</ul>;
};

export default ImageGallery;

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired
}