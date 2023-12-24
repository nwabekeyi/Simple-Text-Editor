import './App.css';
import React, { Component } from 'react';
import { EditorState, RichUtils, AtomicBlockUtils, Modifier } from 'draft-js';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createStaticToolbarPlugin from '@draft-js-plugins/static-toolbar';
import createTextAlignmentPlugin from '@draft-js-plugins/text-alignment';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import { ItalicButton, BoldButton, UnderlineButton } from '@draft-js-plugins/buttons';
import { ChromePicker } from 'react-color'; // Import ChromePicker from react-color
import createLinkPlugin from '@draft-js-plugins/anchor';
import createImagePlugin from '@draft-js-plugins/image';
import FontPopover from './FontPopover';


const textAlignmentPlugin = createTextAlignmentPlugin();
const linkifyPlugin = createLinkifyPlugin();
const staticToolbarPlugin = createStaticToolbarPlugin();
const linkPlugin = createLinkPlugin();
const imagePlugin = createImagePlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin, textAlignmentPlugin, linkifyPlugin, imagePlugin];
const text = 'hey, Welcome to Nwabekeyi editor';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      alignmentStyle: {},
      fontSize: 14,
      fontPopoverOpen: false,
      fontStyle: 'normal',
      fontFamily: 'Arial',
      colorPickerOpen: false,
      selectedColor: 'black',
    };
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  focus = () => this.editor.focus();

  handleAlignment = (alignment) => {
    const alignmentStyle = {};
    switch (alignment) {
      case 'left':
        alignmentStyle.textAlign = 'left';
        alignmentStyle.display = 'flex';
        alignmentStyle.justifyContent = 'flex-start';
        break;
      case 'center':
        alignmentStyle.textAlign = 'center';
        alignmentStyle.display = 'flex';
        alignmentStyle.justifyContent = 'center';
        break;
      case 'right':
        alignmentStyle.textAlign = 'right';
        alignmentStyle.display = 'flex';
        alignmentStyle.justifyContent = 'flex-end';
        break;
      default:
        break;
    }

    const { editorState } = this.state;
    const textAlignmentUtils = textAlignmentPlugin.TextAlignmentUtils;

    if (textAlignmentUtils && textAlignmentUtils.toggleAlignment) {
      this.onChange(textAlignmentUtils.toggleAlignment(editorState, alignment));
    }

    this.setState({ alignmentStyle });
  };

  handleFontSizeChange = (value) => {
    this.setState({ fontSize: value });
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, `FONT_SIZE_${value}`));
  };

  handleFontStyleChange = (value) => {
    this.setState({ fontStyle: value });
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, `FONT_STYLE_${value.toUpperCase()}`));
  };

  handleFontFamilyChange = (value) => {
    this.setState({ fontFamily: value });
    // Handle font family change if needed
  };

  // Function to toggle the font popover
  toggleFontPopover = () => {
    this.setState((prevState) => ({ fontPopoverOpen: !prevState.fontPopoverOpen }));
  };

  // Function to handle font selection from the popover
  handleFontSelect = (type, value) => {
    switch (type) {
      case 'fontSize':
        this.handleFontSizeChange(value);
        break;
      case 'fontStyle':
        this.handleFontStyleChange(value);
        break;
      case 'fontFamily':
        this.handleFontFamilyChange(value);
        break;
      default:
        break;
    }
  };

  addImage = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Create an object URL for the uploaded image
    const imageUrl = URL.createObjectURL(file);

    // Update the editor state with the new image
    const contentState = this.state.editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: imageUrl });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(this.state.editorState, { currentContent: contentStateWithEntity });

    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
    });

    // Clear the input to allow for uploading the same image again
    e.target.value = null;
  };

  // Function to toggle the color picker
  toggleColorPicker = () => {
    this.setState((prevState) => ({ colorPickerOpen: !prevState.colorPickerOpen }));
  };

  // Function to handle color change from the color picker
  handleColorChange = (color) => {
    this.setState({ selectedColor: color.hex });
  };

  render() {
    const editorStyle = {
      width: '95%',
      height: '300px',
      border: '1px solid #ccc',
      padding: '10px',
      margin: 'auto',
      ...this.state.alignmentStyle,
      fontSize: `${this.state.fontSize}px`,
      fontStyle: this.state.fontStyle,
      fontFamily: this.state.fontFamily,
      color: this.state.selectedColor,
    };

    const toolbarStyle = {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: '10px',
    };
    const buttonContainerStyle = {
      display: 'inline-flex',
    };
    const containerStyle = {
      backgroundColor: 'aliceblue',
      margin: 'auto',
      width: "90vw"
    };
    

    return (
      <div className='container' style={containerStyle}>
        <div className="toolbar" style={toolbarStyle}>
          <Toolbar >
            {(externalProps) => (
              <div style={buttonContainerStyle}>
                <ItalicButton {...externalProps} />
                <BoldButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <button onClick={() => this.handleAlignment('left')} title='Align left'>
                  &#x2190;
                </button>
                <button onClick={() => this.handleAlignment('center')} title='Align center'>
                  &#x2194;
                </button>
                <button onClick={() => this.handleAlignment('right')} title='Align right'>
                  &#x2192;
                </button>
                <button onClick={this.toggleColorPicker} title='Open Color Picker'>
                  Color Picker
                </button>

                {/* ColorPicker component */}
                {this.state.colorPickerOpen && (
                  <div className='colorPicker'>
                    <ChromePicker
                      color={this.state.selectedColor}
                      onChangeComplete={this.handleColorChange}
                    />
                    <button onClick={this.toggleColorPicker}>Close Color Picker</button>
                  </div>
                )}
              </div>
            )}
          </Toolbar>
          <button  onClick={this.toggleFontPopover} title='Open Font Popover'>
            Font Options
          </button>
          
          <input type='file' accept='image/*' onChange={this.addImage} />
        </div>
        <div style={editorStyle} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            plugins={plugins}
            ref={(element) => {
              this.editor = element;
            }}
          />
      
        </div>

        {this.state.fontPopoverOpen && (
          <FontPopover onSelect={this.handleFontSelect} onClose={this.toggleFontPopover} />
        )}
      </div>
    );
  }
}

export default TextField;
