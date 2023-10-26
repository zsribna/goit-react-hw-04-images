// import React, { PureComponent, useState } from 'react';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import api from 'services/api';
import Modal from './Modal/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(null);
  const [query, setQuery] = useState('');
  const [modalImage, setModalImage] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);

  const handleSearch = useCallback(searchText => {
    setQuery(searchText);
    setPage(1);
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const handleCloseModal = useCallback(() => {
    setModalImage(null);
  }, []);

  const handleKeyDown = useCallback(
    e => {
      if (e.keyCode === 27) {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (page) {
      async function fetchData() {
        setLoading(true);
        const showOnlyNew = page === 1;
        try {
          const [totalImages, fetchedImages] = await api.fetchImages(
            page,
            query
          );
          const newImages = showOnlyNew
            ? fetchedImages
            : [...images, ...fetchedImages];
          const isLastPage = totalImages <= newImages.length;

          setImages(newImages);
          setIsLastPage(isLastPage);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }
    // eslint-disable-next-line
  }, [page, query]);

  return (
    <div className={styles.App}>
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      <Searchbar onSubmit={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={setModalImage} />
      )}
      <Loader isLoading={loading} />
      {images.length > 0 && !loading && !isLastPage && (
        <Button onClick={handleLoadMore} />
      )}
      {modalImage && (
        <Modal image={modalImage} onClose={handleCloseModal}></Modal>
      )}
    </div>
  );
};

export default App;
