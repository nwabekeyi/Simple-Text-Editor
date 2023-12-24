// src/components/MyComponent.js
import React from 'react';
import { connect } from 'react-redux';
import { Editor, EditorState, ContentState } from 'draft-js'; // Add import for Editor
import ToggleButton from './FontStyle';
import { updateEditorState } from './Actions';

const MyComponent = ({ editorState, dispatchUpdateEditorState }) => {
  const handleEditorChange = (newEditorState) => {
    dispatchUpdateEditorState(newEditorState);
  };

  return (
    <div>
      <h2>MyComponent</h2>
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
      />
      {/* Add other buttons or UI elements to trigger other actions */}
      <ToggleButton style="BOLD" />
      {/* Add other buttons or UI elements to trigger other actions */}
    </div>
  );
};

const mapStateToPropsMyComponent = (state) => ({
  editorState: state.editor.editorState,
});

const mapDispatchToPropsMyComponent = (dispatch) => ({
  dispatchUpdateEditorState: (newEditorState) =>
    dispatch(updateEditorState(newEditorState)),
});

export default connect(
  mapStateToPropsMyComponent, 
  mapDispatchToPropsMyComponent)(MyComponent);
