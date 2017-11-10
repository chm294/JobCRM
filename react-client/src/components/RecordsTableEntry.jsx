import React from 'react';
import hf from '../HelperFuncStateStorage';
import axios from 'axios';
import LinkButton from './LinkButton.jsx';

// import Axios from 'axios';

export default class RecordsTableEntry extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      id: this.props.record.id,
      coverLetter: this.props.record.coverLetter,
			resume: this.props.record.resume,
			firstInterview: this.props.record.firstInterview,
			secondInterview: this.props.record.secondInterview,
			offer: this.props.record.offer,
			rejected: this.props.record.rejected
    }
  }

  delete() {
    let statusUpdate = {id : this.props.record.id}
    axios.post('deleteRecord', statusUpdate)
      .then(function(response) {
        console.log('deleted', response);
      }.bind(this))
      .catch(function(error) {
        console.error('error', error);
      });
    return null
  }

  render() {
    return (
      <tr>
      <td>{this.props.record.company}</td>
      <td>{this.props.record.location}</td>
      <td>{this.props.record.contact}</td>
      <td>{this.props.record.notes}</td>
      <td> <input type="checkbox" name="coverLetter" checked={this.state.coverLetter} onChange={(e) => {hf.postFieldValue(this, 'coverLetter', e)}} /></td>
      <td> <input type="checkbox" name="resume" checked={this.state.resume} onChange={(e) => {hf.postFieldValue(this, 'resume', e)}} /></td>
      <td> <input type="checkbox" name="firstInterview" checked={this.state.firstInterview} onChange={(e) => {hf.postFieldValue(this, 'firstInterview', e)}} /></td>
      <td> <input type="checkbox" name="secondInterview" checked={this.state.secondInterview} onChange={(e) => {hf.postFieldValue(this, 'secondInterview', e)}} /></td>
      <td> <input type="checkbox" name="offer" checked={this.state.offer} onChange={(e) => {hf.postFieldValue(this, 'offer', e)}} /></td>
      <td> <input type="checkbox" name="rejected" checked={this.state.rejected} onChange={(e) => {hf.postFieldValue(this, 'rejected', e)}} /></td>
      <td> <LinkButton title="Remove" clickFunction={this.delete.bind(this)}/> </td>
    </tr>
  )
  }
}

//RecordsTableEntry.proptypes = {
//  record: React.PropTypes.object.isRequired
//};
