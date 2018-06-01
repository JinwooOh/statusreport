import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";

const customContentStyle = {
  wrapper: {
    padding: "0.2rem"
  },
  button: {
    borderRadius: "1.2rem",
    backgroundColor: "#cba6c3",
    boxShadow: "0 1rem 2rem rgba(#fff, 0.2)"
  }
};
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class Popup extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton label="OK" primary={true} onClick={this.handleClose} />
    ];
    const text = this.props.text;

    return (
      <div style={customContentStyle.wrapper}>
        <RaisedButton
          primary={true}
          buttonStyle={customContentStyle.button}
          style={customContentStyle.button}
          overlayStyle={customContentStyle.button}
          className="btn btn__guide"
          label={this.props.title}
          onClick={this.handleOpen}
        />
        <Dialog
          title={this.props.title}
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
