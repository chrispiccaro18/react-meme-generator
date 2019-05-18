import React, { PureComponent } from 'react';
import domToImage from 'dom-to-image';
// eslint-disable-next-line
import { saveAs } from 'file-saver';
import { getKanyeQuote } from '../services/kanyeApi';
import { getRandomPhoto } from '../services/loremPicsum';
import { getRandomQuote } from '../services/quotesOnDesignApi';
import MemeForm from './MemeForm';
import '../main.css';

export default class App extends PureComponent {
  state = {
    headerText: '',
    footerText: '',
    photoUrl: 'https://picsum.photos/id/387/500/500'
  }

  submitForm = event => {
    event.preventDefault();
    domToImage.toBlob(document.getElementById('meme'))
      .then(blob => {
        window.saveAs(blob, 'my-meme.png');
      });
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
        <div style={divStyle} id="meme">
          <p className="memeHeader">{headerText}</p>
          <p className="memeFooter">{footerText}</p>
        </div>
        <button onClick={this.submitForm}>Download Meme</button>
      </>
    );
  }
}
