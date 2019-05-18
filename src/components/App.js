import React, { PureComponent } from 'react';
import { getKanyeQuote } from '../services/kanyeApi';
import { getRandomPhoto } from '../services/loremPicsum';
import { getRandomQuote } from '../services/quotesOnDesignApi';
import MemeForm from './MemeForm';

export default class App extends PureComponent {
  state = {
    headerText: '',
    footerText: '',
    photoUrl: ''
  }

  componentDidMount() {
    // this.fetch();
  }

  submitForm = event => {
    event.preventDefault();
    // this is where we will save to user's disk
    console.log(this.state);
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
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
    const { headerText, footerText, photoUrl } = this.state;
    return (
      <>
        <MemeForm handleChange={this.handleChange} state={this.state} />
        <p>{headerText}</p>
        <img src={photoUrl} alt="random image" />
        <p>{footerText}</p>
        <button onClick={this.submitForm}>Download Meme</button>
      </>
    );
  }
}
