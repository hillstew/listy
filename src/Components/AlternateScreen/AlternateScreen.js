import React from 'react';
import PropTypes from "prop-types"

const AlternateScreen = ({ text }) => {
  return <h4 className='screen-text'>{text}</h4>
}

export default AlternateScreen;

AlternateScreen.propTypes = {
  text: PropTypes.string.isRequired,
}