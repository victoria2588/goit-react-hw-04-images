import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { fetchImages } from 'api';
import { SearchBar } from './SearchBar/SearchBar';
import { Gallery } from './ImageGallery/ImageGallery';
import { Pagination } from './Button/Button';
import { Wrapper } from './App.styled';
import { Loader } from './Loader/Loader';
import { notifyInfo, notifyInputQuerry } from './Notify/notify';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (query === '') return;
    const loadResult = async () => {
      try {
        setLoading(true);
        const { hits: img, totalHits } = await fetchImages(query, page);

        if (img.length) {
          setImages(prevImages => (page > 1 ? [...prevImages, ...img] : img));
          setTotalImages(totalHits);
          setLoading(false);
        } else {
          notifyInfo();
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    loadResult();
  }, [query, page]);

  const changeQuery = newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (event.target.elements.query.value.trim() === '') {
      notifyInputQuerry();
      return;
    }
    changeQuery(event.target.elements.query.value);

    event.target.reset();
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <Wrapper>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {images.length > 0 && <Gallery imgItems={images} />}
      {images.length > 0 && images.length < totalImages && (
        <Pagination onClick={handleLoadMore}>Load More</Pagination>
      )}
      <Toaster position="top-right" reverseOrder={true} />
    </Wrapper>
  );
};
