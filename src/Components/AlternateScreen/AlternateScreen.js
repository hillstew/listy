import React from 'react';
import PropTypes from "prop-types"

const AlternateScreen = ({ text }) => {
  return (
    <div className='container-404'>
      <h4 className='screen-text'>
        <i class="fas fa-exclamation-triangle"></i>
        <p className='text-404'>{text}</p>
      </h4>
    </div>
  )
}

export default AlternateScreen;

AlternateScreen.propTypes = {
  text: PropTypes.string.isRequired,
}