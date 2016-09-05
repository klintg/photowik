import React, { Component, PropTypes } from 'react';


class Filtered extends Component {

  render() {
    return (
      <div>
        <img className="img-rounded" src={this.props.url} width="204" height="136"/>
      </div>
    );
  }
}

Filtered.propTypes = {
  url: PropTypes.string
};

export default Filtered;
