// FontPopover.js
import React, { Component } from 'react';

class FontPopover extends Component {
  render() {
    const { onSelect, onClose } = this.props;
    return (
      <div style={{ position: 'absolute', top: '50px', left: '50px', padding: '10px', border: '1px solid #ccc', backgroundColor: '#D3D3D3'}}>
        <label htmlFor="fontStyleSelect">Font Style: </label>
        <select id="fontStyleSelect" onChange={(e) => onSelect('fontStyle', e.target.value)}>
          <option value="normal">Normal</option>
          <option value="italic">Italic</option>
          <option value="bold">Bold</option>
        </select>

        <label htmlFor="fontSizeSelect">Font Size: </label>
        <select id="fontSizeSelect" onChange={(e) => onSelect('fontSize', parseInt(e.target.value, 10))}>
          <option value={14}>14</option>
          <option value={16}>16</option>
          <option value={18}>18</option>
          <option value={20}>20</option>
          <option value={24}>24</option>
          <option value={30}>30</option>
          <option value={34}>34</option>
          <option value={42}>42</option>
        </select>

        <label htmlFor="fontFamilySelect">Font Family: </label>
        <select id="fontFamilySelect" onChange={(e) => onSelect('fontFamily', e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>

        <button onClick={onClose}>Close</button>
      </div>
    );
  }
}

export default FontPopover;
