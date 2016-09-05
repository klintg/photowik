import React, {Component} from 'react';
import UploadedSec from './UploadedSec';


class HomePage extends Component {

  render() {
    return (
      <div className="main">
        <UploadedSec/>
      </div>
    );
  }
}

export default HomePage;

























// import React, { Component, PropTypes } from 'react';
// import Dropzone from 'react-dropzone';
//
// class HomePage extends React.Component {
//   constructor(props) {
//     super(props);
//       return {
//         files: []
//       };
//
//       this.onDrop = this.onDrop.bind(this);
//       this.onOpenClick = this.onOpenClick.bind(this);
//   }
//
//   onDrop(files) {
//     this.setState({
//       files: files
//     });
//   }
//
//   onOpenClick() {
//     this.refs.dropzone.open();
//   }
//
//     render() {
//       return (
//           <div>
//             <Dropzone onDrop={this.onDrop}>
//               <div>Try dropping some files here, or click to select files to upload.</div>
//             </Dropzone>
//
//             <button type="button" onClick={this.onOpenClick}>
//               open Dropzone
//             </button>
//             {this.state.files ? <div>
//               <h2>Uploading {this.state.files.length} files ...</h2>
//               <div>{this.state.files.map((file) => <img src={file.preview} />)}</div>
//               </div>: null
//             }
//           </div>
//       );
//     }
// }
//
// export default HomePage;






// const React = require('react');
// const Dropzone = require('react-dropzone');
//
// const DropzoneDemo = React.createClass({
//     getInitialState: function () {
//         return {
//           files: []
//         };
//     },
//
//     onDrop: function (image) {
//       this.setState({
//         files: image
//       });
//     },
//
//     onOpenClick: function () {
//       this.refs.dropzone.open();
//     },
//
//     handleSubmit:function() {
//
//       console.log(this.state.files);
//     },
//
//     render: function () {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <Dropzone ref="dropzone" onDrop={this.onDrop}>
//                     <div className="text-center">Try dropping some files here, or click to select files to upload.</div>
//                 </Dropzone>
//                 <br></br>
//                 <button type="button" className="btn btn-success" onClick={this.onOpenClick}>
//                     Open Dropzone
//                 </button>
//                 {this.state.files.length > 0 ? <div>
//                 <h2>Uploading {this.state.files.length} files...</h2>
//                 <div>{this.state.files.map((file, index) => <img key={index} src={file.preview} /> )}</div>
//                 </div> : null}
//             </form>
//         );
//     }
// });
//
// module.exports = DropzoneDemo;
