import React, { Component, PropTypes } from 'react';

class MainCanvas extends Component {

  render() {
    return (
      <div>
        <img className="img-thumbnail" src={this.props.image} width="750" height="400"/>
      </div>
    );
  }
}

MainCanvas.propTypes = {
  image: PropTypes.string.isRequired
};
export default MainCanvas;
