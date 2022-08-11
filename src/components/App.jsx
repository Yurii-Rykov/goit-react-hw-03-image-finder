import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Serchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import LoadMore from './Button/Button';
import { FetchApi } from './FetchApi/FetchApi';
import s from './App.module.css'

export default class App extends Component {
  state = {
    hits: null,
    search: '',
    status: 'resolved',
    error: null,
    page: 1,
    gallery: [],
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  hendleFormSubmit = search => {
    if (!search.length) return;

    this.setState({ search, page: 1, gallery: [] });
  };

  componentDidMount() {
    this.setState({ status: 'pending' });
    const query = this.state.search || '';

    FetchApi(query, this.state.page)
      .then(({ hits }) => {
        this.setState({ gallery: hits, status: 'resolved' });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.search !== this.state.search
    ) {
      this.setState({ status: 'pending' });
      const query = this.state.search || '';

      FetchApi(query, this.state.page)
        .then(({ hits }) => {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...hits],
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { status } = this.state;

    return (
      <div className={s.app}>
        <Serchbar propSubmit={this.hendleFormSubmit} />
        <ImageGallery>
          {status !== 'rejected' && this.state.gallery.length > 0 && (
            <ImageGalleryItem propHits={this.state.gallery} />
          )}
          {status === 'pending' && <div>Loading...</div>}
          {status === 'rejected' && <div>No images</div>}
        </ImageGallery>
        <LoadMore more={this.loadMore} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
