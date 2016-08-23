import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as uploadActions from '../../actions/uploadActions';
import {bindActionCreators} from 'redux';
import $ from 'jquery';

import {browserHistory} from 'react-router';

class UploadPic extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        file:'',
        imagePreviewUrl: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
  }

  handleUpload(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = (event) => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);

    // this.props.dispatch(uploadActions.uploadImage(this.state.pic));
  }

  // imageRow(image, index) {
  //   return <div key={index}>{image.img}</div>;
  // }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className="img-responsive img-thumbnail" alt="Responsive image" src={imagePreviewUrl} />);
    }

      return (
        <form onSubmit={this.handleSubmit}>
          <div className="fileUpload btn btn-primary">
            <span>Upload</span>
            <input type="file" className="upload" id="file-upload" onChange={this.handleUpload}/>
          </div>
          <div>{$imagePreview}</div>
        </form>
    );
  }
}
// //{this.props.images.map(this.imageRow)}
// UploadPic.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   images: PropTypes.object.isRequired
// };
//
// function mapStateToProps(state, ownProps) {
//   console.log(state.image);
//   return {
//     images: state.image
//   };
// }

// function mapDispatchToProps() {
//
// }

export default(UploadPic);
