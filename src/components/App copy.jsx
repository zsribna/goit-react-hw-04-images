import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import React, { Component } from 'react'
import { imagesItems } from "api";
import { LoadMore } from "./Button/Button.styled";
import { RotatingLines } from 'react-loader-spinner';


export class App extends Component {
  state = {
    items: [],
    galerryValue: '',
    loading: false,
    error: false,
    page: 1,
    totalPage: false
  };

  async componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.galerryValue !== prevState.galerryValue
    ) {
      try {
        this.setState({ loading: true, error: false });
        const itemsImg = await imagesItems(this.state.galerryValue,this.state.page);
        if (itemsImg.totalHits < 1) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        const totalPageMath =
          this.state.page < Math.ceil(itemsImg.totalHits / 12);
        console.log(totalPageMath)
        this.setState(prev => ({
          items: [...prev.items, ...itemsImg.hits],
          totalPage: totalPageMath,
        }));
      } catch (error) {
        this.setState({ error: true });
        console.error('erere');
      } finally {
        this.setState({ loading: false });
      }
    }
  }
  hendleSubmit = data => {
    this.setState({
      items: [],
      page: 1,
      totalPage: false,
      loading: true,
      error: false,
      galerryValue: data,
    });

  };
  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { items, loading, error, totalPage } = this.state;
    return (
      <>
        <Searchbar onSubmitForm={this.hendleSubmit} />
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
          <LoadMore onClick={this.handleLoadMore}>Load more</LoadMore>
        )}
      </>
    );
  }
}

export default App