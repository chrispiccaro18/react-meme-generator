import React, { PureComponent } from 'react';
import { getKanyeQuote } from '../services/kanyeApi';
import { getRandomPhoto } from '../services/loremPicsum';
import { getRandomQuote } from '../services/quotesOnDesignApi';

export default class App extends PureComponent {
  state = {
    kanyeQuote: '',
    randomImage: '',
    randomQuote: ''
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    return Promise.all([
      getKanyeQuote(),
      getRandomPhoto(),
      getRandomQuote()
    ])
      .then(([kanyeRes, randomImage, randomQuoteRes]) => {
        const kanyeQuote = kanyeRes.quote;
        const randomQuote = randomQuoteRes.slip.advice;
        this.setState({
          kanyeQuote,
          randomImage,
          randomQuote
        });
      });
  }

  render() {
    const { kanyeQuote, randomImage, randomQuote } = this.state;
    return (
      <>
        <p>{kanyeQuote}</p>
        <img src={randomImage} alt="random image" />
        <p>{randomQuote}</p>
      </>
    );
  }
}
