import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Serchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem'
import LoadMore from './Button/Button';

export default class App extends Component {
  
  state = {
    hits: null,
    search: '',
    status: 'idle',
    error: null,
    page: 1,
    gallery: []
  };
  
  loadMore = () =>{
    // this.componentDidMount(this.state.search);
    this.setState(prevState => ({page:prevState.page + 1, gallery: [...prevState.hits.hits, ...prevState.gallery]}), this.componentDidMount)
  
    
    // this.setState(prevState => ({gallery: [...prevState.hits.hits, ...prevState.gallery]}))
  }
  hendleFormSubmit(search){
    if(search !== this.state.search){
    this.setState({ search, page: 1 }, this.componentDidMount);
    console.log(this.state.page)
    this.setState(prevState =>({gallery: [...prevState.hits.hits]}))
    // console.log(this.state.search, search);
    // this.componentDidMount(search)
  }
  };
  
  componentDidMount( ) {
    console.log(this.state.page)
      this.setState({status: 'pending'});
      const query = this.state.search || ''

      fetch(
        `https://pixabay.com/api/?q=${query}&page=${this.state.page}&key=28565156-d6a8869547fee06a320be5b89&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response =>{
        if(response.ok){
          return response.json();
        }
        return Promise.reject(
          new Error(`Error please try again letter`)
        );
      }).then(hits => {
        if(hits.total > 0){
          this.setState({hits, status: 'resolved'})
          
          // this.setState(prevState => ({gallery: [...hits.hits, ...prevState.gallery]}))
        }else{
          this.setState({status: 'rejected'})
        }
      })
      .catch(error => this.setState({error, status: 'rejected'}))
        
  }

  render() {
    const { status} = this.state
    // console.log(search, error,  status, );
      if (status === 'idle') {
        return <div>Enter name</div>
      }
      if (status === 'pending') {
        return <div>Loading...</div>
      }
      if (status === 'rejected') {
        return <>
        <Serchbar propSubmit={this.hendleFormSubmit} />
        <div>No images</div>
        </>
      }
      if (status === 'resolved') {
        return(
        <div>
          <Serchbar propSubmit={this.hendleFormSubmit} />
          <ImageGallery >
          <ImageGalleryItem propHits={this.state.gallery}/>
          </ImageGallery>
          <LoadMore more={this.loadMore}/>
          <ToastContainer autoClose={3000}/>
        </div>
        )
      }

      
  }
}
