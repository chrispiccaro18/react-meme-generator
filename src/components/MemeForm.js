import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class MemeForm extends PureComponent {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired
  }

  render() {
    const { headerText, footerText, photoUrl } = this.props.state;
    const { handleChange } = this.props;
    return (
      <>
        <fieldset>
          <legend>Header Text</legend>
          <input onChange={handleChange} type="text" name="headerText" value={headerText}></input>
          <button onClick={() => {console.log('kanye header');}}>Kanye</button>
        </fieldset>
        <fieldset>
          <legend>Footer Text</legend>
          <input onChange={handleChange} type="text" name="footerText" value={footerText}></input>
          <button onClick={() => {console.log('kanye footer');}}>Kanye</button>
        </fieldset>
        <fieldset>
          <legend>Background Image</legend>
          <input onChange={handleChange} type="text" name="photoUrl" value={photoUrl}></input>
          <button onClick={() => {console.log('random url');}}>Random</button>
        </fieldset>
      </>
    );
  }
}
