/* eslint react/prop-types: 0 */

// Popup component that uses material-ul
// check https://material-ui.com/ to understand its API

import React from 'react';
import Dialog from 'material-ui/Dialog';

const customContentStyle =
  window.screen.availWidth >= 900
    ? {
        width: '68%',
        borderRadius: '100px',
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
      <button className="btn btn__guide btn__guide--inPopup" onClick={this.handleClose}>
        OK
      </button>,
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
