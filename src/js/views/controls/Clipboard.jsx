import { Button, Popup } from "semantic-ui-react";
import React, { Component } from "react";
import copy from "copy-to-clipboard";

class Clipboard extends Component {

  constructor(props) {
    super(props);
    this.state = { popupVisible: false };
    this.onPopupOpen = this.onPopupOpen.bind(this);
    this.onPopupClose = this.onPopupClose.bind(this);
  }

  onPopupOpen() {
    copy(this.props.text);
    this.setState({ popupVisible: true });

    this.timeout = setTimeout(() => {
      this.setState({ popupVisible: false })
    }, 750);
  }

  onPopupClose() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <Popup inverted trigger={<Button as="a" className="icon" icon="copy" /> }
             content="Copied !"
             on="click"
             onOpen={this.onPopupOpen}
             onClose={this.onPopupClose}
             open={this.state.popupVisible}
             hoverable={false} position="top center" size="mini"
      />
    );
  }
}

export default Clipboard;
