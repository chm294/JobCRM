import React from 'react';
import axios from 'axios';

class HelperFuncStateStorage {
  //don't console.log here if you're trying to debug.
  //console.log where the function is being called before return and after render


  postFieldValue(inst, stateName, e) {
    e.stopPropagation()
    let stateUpdate = {};
    stateUpdate[stateName] = !inst.state[stateName];
    inst.setState(stateUpdate);
    //--> this started throwing strange errors.
    // now kind of unclear how this works. helpdesk material.

    console.log(inst.props.record);
    console.log(inst.props.record.id);

    axios.post('update', {
      id: inst.props.record.id,
      stateName: stateName,
      value: !inst.state[stateName]
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      return null
  }

  requestRecords(inst) {
    return axios.get('records')
    .then((records) => {
      //console.log(records);
      return records;
    });
  }

    loginRequest(inst, value) {
      console.log(value);
      axios.post('login', {
        user: value
      }).then(function (response) {
        //console.log(response);
      }).catch(function(error) {
        console.log(error);
      });
      return null;
    }

  updateFieldValue(inst, stateName, e) {
  	//e.stopPropagation()
    let stateUpdate = {};
    stateUpdate[stateName] = e.target.value;
    inst.setState(stateUpdate);
    return null
  }

  toggleCheckBox(inst, boxName, e) {
    let stateUpdate = {};
    stateUpdate[boxName] = !inst.state[boxName]
    inst.setState(stateUpdate)
    return null;
  }

  onSubmit(inst) {
    axios.post('insert', inst.state)
      .then(function(response) {
        console.log('works', response);
      })
      .catch(function(error) {
        console.error('error', error);
      });
      return null;
  }

  // search(inst) {
  //   axios.post('search', { searchValue: inst.state.searchValue })
  //     .then(function (response) {
  //       console.log(response.data)
  //       return response.data;
  //     })
  //     .catch(function (error) {
  //       console.error('error', error);
  //     });
  //   return null;
  // }

}

const instanceHelper = new HelperFuncStateStorage();
export default instanceHelper
