import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { fetchImage } from './Fetch/fetch';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState('');
  const [loadMore, setLoadMore] = useState(null);
  

  const handleLoadMore = () => {
    setPageNumber(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal );
  };
  
  const handlResult = value => {
    
      setSearch(value);
      setPageNumber(1);
      setImages([]);
    setLoadMore(null);
    
  };

  const handlImg = largeImageUrl => {
    setLargeImageUrl( largeImageUrl );
    toggleModal();
  };

  useEffect(() => {
    if (!search) {
      return
    }
    setStatus('load');
    fetchImage(search, pageNumber)
      .then(e => {
        setImages(prevState => [...prevState, ...e.hits]);
        setStatus('idle');
        setLoadMore(12 - e.hits.length);}
        
          )
        
        .catch(error => console.log(error));
  }, [pageNumber, search]);

  
 
    return (
      <Container>
        <Searchbar onSubmit={handlResult} />
        <ImageGallery images={images} onClick={handlImg} />
        
        {loadMore === 0 && <Button onClick={handleLoadMore} />}
        {status === 'load' && <Loader />}
        {showModal && (
          <Modal img={largeImageUrl} toggleModal={toggleModal} />
        )}
      </Container>
    );
  }

