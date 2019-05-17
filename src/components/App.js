import React, { PureComponent } from 'react';
import { getKanyeQuote } from '../services/kanyeApi';

export default class App extends PureComponent {
  state = {
    kanyeQuote: ''
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    getKanyeQuote()
      .then(res => {
        const kanyeQuote = res.quote;
        this.setState({ kanyeQuote });
      });
  }

  render() {
    const { kanyeQuote } = this.state;
    return (
      <>
        <p>{kanyeQuote}</p>
      </>
    );
  }
}
