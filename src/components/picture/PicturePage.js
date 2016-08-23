import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
//import * as pictureActions from '../../actions/pictureActions'
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

import UploadPic from './UploadPic';
import Main from './Main';

class PicturePage extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
      return (

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4"><UploadPic/></div>
              <div className="col-md-8"><Main /></div>
            </div>
          </div>

    );
  }
}

export default PicturePage;
