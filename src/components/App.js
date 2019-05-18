import React, { PureComponent } from 'react';
import { getKanyeQuote } from '../services/kanyeApi';
import { getRandomPhoto } from '../services/loremPicsum';
import { getRandomQuote } from '../services/quotesOnDesignApi';
import MemeForm from './MemeForm';
import '../main.css';

export default class App extends PureComponent {
  state = {
    headerText: '',
    footerText: '',
    photoUrl: 'https://imgflip.com/s/meme/Success-Kid.jpg'
  }

  submitForm = event => {
    event.preventDefault();
    // this is where we will save to user's disk
    console.log(this.state);
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleKanye = ({ target }) => {
    let stateKey = null;
    target.name.startsWith('headerText') ? stateKey = 'headerText' : stateKey = 'footerText';
    getKanyeQuote()
      .then(kanyeRes => {
        const kanyeQuote = kanyeRes.quote;
        this.setState({ [stateKey]: kanyeQuote });
      });
  }

  handleRandomPhoto = () => {
    getRandomPhoto()
      .then(photoUrl => {
        this.setState({ photoUrl });
      });
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
    const memeProps = {
      handleChange: this.handleChange,
      handleKanye: this.handleKanye,
      handleRandomPhoto: this.handleRandomPhoto,
      state: this.state,
    };

    const { headerText, footerText, photoUrl } = this.state;

    const divStyle = {
      backgroundImage: `url(${photoUrl})`,
      width: '500px',
      height: '500px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    };

    return (
      <>
        <MemeForm {...memeProps} />
        <div style={divStyle}>
          <p className="memeHeader">{headerText}</p>
          <p className="memeFooter">{footerText}</p>
        </div>
        <button onClick={this.submitForm}>Download Meme</button>
      </>
    );
  }
}
