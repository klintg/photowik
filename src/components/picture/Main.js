import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
//import * as pictureActions from '../../actions/pictureActions'
import {bindActionCreators} from 'redux';

import {browserHistory} from 'react-router';

// import MainCanvas from './MainCanvas';
// import Filters from './Filters';

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
      return (
        <div className="col m9">
          <h1>Canvas</h1>
        </div>
    );
  }
}

export default Main;
