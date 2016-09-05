import React, {Component, PropTypes} from 'react';
import {bindAll} from 'lodash';
import $ from 'jquery';
import MainCanvas from './MainCanvas';
import Filtered from './Filtered';
import toastr from 'toastr';

class UploadedSec extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data_uri: null,
      processing: false,
      imagePreviewUrl:''
    };

    bindAll(this, 'handleFile', 'handleSubmit');
  }

  handleSubmit(e) {
    e.preventDefault();
    const _this = this;

    this.setState({
      processing: true
    });

    const promise = $.ajax({
      url: '/api/v1/image',
      type: "POST",
      data: {
        data_uri: this.state.data_uri,
        filename: this.state.filename,
        filetype: this.state.filetype
      },
      dataType: 'json'
    });

    promise.done(function(data){
      _this.setState({
        processing: false,
        uploaded_uri: data.uri
      });
    });
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let processing;
    let uploaded;

    if (this.state.uploaded_uri) {
      uploaded = (
        <div>
          <img className="img-thumbnail" src={this.state.uploaded_uri} width="304" height="236"/>
        </div>
      );
    }

    if (this.state.processing) {
      processing = toastr.success("Processing image, hang tight");
    }

    const { dispatch, isAuthenticated } = this.props;

    return (
      <div className="row">
          <div className="col-xs-6 col-md-4">
            <label>Choose an Image File</label>
              <br/>
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <input type="file" onChange={this.handleFile} />
                <br/>
                <label>click below</label>
                <br/>
              <input disabled={this.state.processing} className="btn btn-info" type="submit" value="Upload" />
                <br/>
              {processing}
            </form>

              <br/>
              <br/>

            <div>
              {uploaded}
            </div>
          </div>

          <div className="col-xs-12 col-md-8">
            <MainCanvas image={this.state.imagePreviewUrl}/>
            <br/>
            <br/>
            <Filtered url={this.state.uploaded_uri}/>
          </div>
      </div>
    );
  }
}


export default UploadedSec;
