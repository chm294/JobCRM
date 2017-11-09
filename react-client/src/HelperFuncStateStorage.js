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

    axios.post('update', {
      id: inst.state.key,
      stateName: stateName,
      value: inst.state[stateName]
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      return null
  }

    loginRequest(inst, value) {
      console.log(value);
      axios.post('login', {
        user: value
      }).then(function (response) {
        console.log(response);
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
    axios.post('input', inst.state)
      .then(function(response) {
      })
      .catch(function(error) {
        console.error('error', error);
      });
      return null;
  }

  search(inst){
    axios.post('records', {searchValue: inst.state.searchValue})
      .then(function(response) {
      })
      .catch(function(error) {
        console.error('error', error);
      });
    return null;
  }

}

const instanceHelper = new HelperFuncStateStorage();
export default instanceHelper
