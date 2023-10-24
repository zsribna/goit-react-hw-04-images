import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import { GalerryList, ListItem } from './ImageGallery.styled';

const ImageGallery = ({items}) => {
  return (
    <GalerryList>
      {items.map(item => (
        <ListItem key={item.id}><ImageGalleryItem item={ item} /></ListItem>
      ))}
    </GalerryList>
  );
};

export default ImageGallery;
