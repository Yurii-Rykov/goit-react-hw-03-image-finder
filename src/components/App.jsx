import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Serchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import LoadMore from './Button/Button';
import { FetchApi } from './FetchApi/FetchApi';
import Modal from './Modal/Modal';
import { ThreeDots } from 'react-loader-spinner';

import s from './App.module.css';

export default class App extends Component {
  state = {
    hits: null,
    search: '',
    status: 'resolved',
    error: null,
    page: 1,
    gallery: [],
    isModalOpen: false,
    imgUrl: '',
    imgAlt: '',
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  hendleFormSubmit = search => {
    if (!search.length) return;

    this.setState({ search, page: 1, gallery: [] });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  onImgClick = (url, alt) => {
    this.setState(() => ({
      imgUrl: url,
      imgAlt: alt,
    }));

    this.openModal();
  };

  // componentDidMount() {
  //   this.setState({ status: 'pending' });
  //   const query = this.state.search || '';

  //   FetchApi(query, this.state.page)
  //     .then(({ hits }) => {
  //       this.setState({ gallery: hits, status: 'resolved' });
  //     })
  //     .catch(error => this.setState({ error, status: 'rejected' }));
  // }

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
    const { status, imgUrl, imgAlt, isModalOpen, gallery, search } = this.state;

    return (
      <div className={s.app}>
        <Serchbar propSubmit={this.hendleFormSubmit} />
        <ImageGallery>
          {status !== 'rejected' && gallery.length > 0 && (
            <ImageGalleryItem propHits={gallery} onImgClick={this.onImgClick} />
          )}

          {status === 'pending' && (
            <div className={s.loading}>
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#3F51B5"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </div>
          )}
          {status === 'rejected' && <div>No images</div>}
        </ImageGallery>

        {gallery.length === 0 && search !== '' && status !== 'pending' && (
          <div>No images</div>
        )}

        {search !== '' && gallery.length !== 0 && (
          <LoadMore more={this.loadMore} />
        )}

        <ToastContainer autoClose={3000} />

        {isModalOpen && (
          <Modal propModalUrl={imgUrl} propClose={this.closeModal} />
        )}
      </div>
    );
  }
}
