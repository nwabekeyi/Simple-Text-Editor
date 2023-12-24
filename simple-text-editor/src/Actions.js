export const UPDATE_EDITOR_STATE = 'UPDATE_EDITOR_STATE';
export const TOGGLE_FONT_STYLE = 'TOGGLE_FONT_STYLE';
export const SET_FONT_TYPE = 'SET_FONT_TYPE';
export const SET_ALIGNMENT = 'SET_ALIGNMENT';
export const SET_FONT_COLOR = 'SET_FONT_COLOR';

export const updateEditorState = (newEditorState) => ({
  type: 'UPDATE_EDITOR_STATE',
  payload: newEditorState,
});

export const toggleFontStyle = (style) => ({
  type: 'TOGGLE_FONT_STYLE',
  payload: style,
});

export const FontType = (fontType) => ({
  type: 'SET_FONT_TYPE',
  payload: fontType,
});

export const Alignment = (alignment) => ({
  type: 'SET_ALIGNMENT',
  payload: alignment,
});

export const FontColor = (color) => ({
  type: 'SET_FONT_COLOR',
  payload: color,
});


