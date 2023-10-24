import React, { useState } from 'react'
import {  GalleryImg,   ModalStyled, } from './ImageGalleryItem.styled';
import Modal from 'react-modal';

Modal.setAppElement('#root');



export const ImageGalleryItem = ( {item:{webformatURL,tags,largeImageURL}} ) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div onClick={handleOpenModal}>
        <GalleryImg
          src={webformatURL}
          alt={tags}
        />
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        style={ModalStyled}
        contentLabel="Example Modal"
      >
        <img src={largeImageURL} alt={tags} />
      </Modal>
    </>
  );
};


export default ImageGalleryItem
