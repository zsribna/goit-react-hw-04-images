import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { useState } from 'react'
import { imagesItems } from "api";
import { LoadMore } from "./Button/Button.styled";
import { RotatingLines } from 'react-loader-spinner';
import { useEffect } from "react";


export const App = () => {
  
  const [items, setItems] = useState([])
  const [galerryValue, setGalerryValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setEror] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPage , setTotalPage ] = useState(false)
 
  const hendleSubmit = data => {
    setItems([])
    setPage(1)
    setTotalPage(false)
    setLoading(true)
    setEror(false)
    setGalerryValue(data)

  };
  const handleLoadMore = () => {
      setPage( prev => prev + 1)
  };
   
   useEffect(() => {
     if (!galerryValue){
       return
     }
     async function getImages() {
       try {
         setLoading(true)
         setEror(false)
        
         const itemsImg = await imagesItems(galerryValue,page);
         if (itemsImg.totalHits < 1) {
           throw new Error(
             'Sorry, there are no images matching your search query. Please try again.'
           );
         }

         const totalPageMath =
         page < Math.ceil(itemsImg.totalHits / 12);
         setItems(prev => [...prev, ...itemsImg.hits])
         setTotalPage(totalPageMath)
      
       } catch (error) {
         setEror(true)
         console.error('erere');
       } finally {
        setLoading(false)
       }
     }

    getImages()


  },[galerryValue,page])


    return (
      <>
        <Searchbar onSubmitForm={hendleSubmit} />
        {loading && (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={true}
          />
        )}
        {error && <b>Wooopss error please reload webSite...</b>}

        <ImageGallery items={items} />

        {totalPage && (
          <LoadMore onClick={handleLoadMore}>Load more</LoadMore>
        )}
      </>
    );
}

export default App