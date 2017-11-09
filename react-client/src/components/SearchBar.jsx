import React from 'react';
import hf from '../HelperFuncStateStorage';

export default class SearchBar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      searchValue: ''
    };
  }

  render() {
    console.log(this.state)
    return (
      <div className='SearchBar'>
        <input type="text" value={this.state.searchValue} onChange={(e) => {
          hf.updateFieldValue(this, 'searchValue', e)
        }}/>
        <button type="button" onClick={() => {
          hf.search(this);
        }}>
          Search
        </button>
      </div>
    )
  }
}
