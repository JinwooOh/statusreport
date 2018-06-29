/* eslint react/prop-types: 0 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// const dropzoneStyles =
// window.screen.availWidth < 780 ?
// { 'width': '150px', 'height': '150px', 'border': 'none', 'borderRadius': '50%' }
// : { 'width': '200px', 'height': '200px', 'border': 'none', 'borderRadius': '50%' };

const customContentStyle =
  window.screen.availWidth >= 900
    ? {
        width: '65%',
        wrapper: {
          padding: '0.2rem',
        },
      }
    : {
        width: '95%',
        wrapper: {
          padding: '0.2rem',
        },
      };
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class Popup extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton style={customContentStyle.button} label="OK" onClick={this.handleClose} />,
    ];
    const { text } = this.props;

    return (
      <div style={customContentStyle.wrapper}>
        <button className="btn btn__guide" onClick={this.handleOpen}>
          {this.props.title}
        </button>
        <Dialog
          title={this.props.title}
          autoScrollBodyContent
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
        >
          {text}
        </Dialog>
      </div>
    );
  }
}
