// src/redux/editorReducer.js
import { EditorState, RichUtils } from 'draft-js';
import * as ActionTypes from './Actions'; // Import all actions from the same folder

const initialState = {
  editorState: EditorState.createEmpty(),
  fontStyles: {
    bold: false,
    italic: false,
    underline: false,
  },
  fontType: 'DefaultFont',
  alignment: 'left',
  fontColor: 'black',
};

const applyFontStyle = (editorState, style) => {
  return RichUtils.toggleInlineStyle(editorState, style);
};

const setFontType = (editorState, fontType) => {
  // Implement your logic to set the font type in the editorState
  // This could involve creating a custom style map or using Draft.js custom styles
  return RichUtils.toggleInlineStyle(editorState, fontType);
};

const setAlignment = (editorState, alignment) => {
  // Toggle the block type for the current selection to the specified alignment
  return RichUtils.toggleBlockType(editorState, `text-${alignment}`);
};

const setFontColor = (editorState, color) => {
  // Toggle the inline style for the current selection to the specified color
  const newEditorState = RichUtils.toggleInlineStyle(editorState, `color-${color}`);
  return newEditorState;
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_EDITOR_STATE:
      return { ...state, editorState: action.payload };
    case ActionTypes.TOGGLE_FONT_STYLE:
      return {
        ...state,
        editorState: applyFontStyle(state.editorState, action.payload),
        fontStyles: { ...state.fontStyles, [action.payload]: !state.fontStyles[action.payload] },
      };
    case ActionTypes.SET_FONT_TYPE:
      return {
        ...state,
        editorState: setFontType(state.editorState, action.payload),
        fontType: action.payload,
      };
    case ActionTypes.SET_ALIGNMENT:
      return {
        ...state,
        editorState: setAlignment(state.editorState, action.payload),
        alignment: action.payload,
      };
    case ActionTypes.SET_FONT_COLOR:
      return {
        ...state,
        editorState: setFontColor(state.editorState, action.payload),
        fontColor: action.payload,
      };
    default:
      return state;
  }
};

export default editorReducer;
