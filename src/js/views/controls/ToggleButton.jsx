import { Button } from "semantic-ui-react";
import React, { Component } from "react";
import css from "classnames";

class ToggleButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const color = css({ "green": this.props.checked }) || undefined;

    return (
      <Button color={color} {...this.props} />
    );
  }

}

export default ToggleButton;
