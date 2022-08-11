import React from 'react';

class ImageGalleryItem extends React.Component {
// console.log(propHits);
// state = {
//   gallery: []
// }
// constructor(props){
//   super(props)
//   console.log(this.state.gallery);
//   const newGallery = [...this.state.gallery, ...props.propHits]
//   console.log(newGallery);
//   this.state= {gallery: newGallery}
// }

render(){
  // console.log(this.props);
  // const oldGallery = this.state.gallery || []
  // console.log(oldGallery, this.props);
  
  // console.log(newGallery);
 
  return this.props.propHits.map(el => (
    <li key={el.id} className="gallery-item">
      <img src={el.webformatURL} alt="" width="300" />
    </li>
  ));
}};

export default ImageGalleryItem;
