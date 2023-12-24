// src/components/ToggleButton.js
import React from 'react';
import { connect } from 'react-redux';
import { toggleFontStyle } from './Actions';

const ToggleButton = ({ style, dispatchToggleFontStyle }) => {
  return (
    <button onClick={() => dispatchToggleFontStyle(style)}>
      Toggle {style.charAt(0).toUpperCase() + style.slice(1)}
    </button>
  );
};

const mapDispatchToPropsToggleButton = (dispatch) => ({
  dispatchToggleFontStyle: (style) => dispatch(toggleFontStyle(style)),
});

export default connect(null, mapDispatchToPropsToggleButton)(ToggleButton);
