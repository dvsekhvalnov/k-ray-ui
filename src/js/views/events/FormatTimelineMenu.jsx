import { Icon, Menu, Dropdown } from "semantic-ui-react"
import { connect } from 'react-redux';
import React from "react"

import {
  compactTimeline,
  hideTimeline,
  triggerTimelineDetails,
} from '../../actions';

const FormatTimelineMenu = (props) =>
  <Menu floated size="tiny" borderless secondary>
    <Menu.Item as="a">
      <Icon name="paint brush" color="blue"/>
      <Dropdown text="Format timeline" className="blue">
        <Dropdown.Menu>
          <Dropdown.Item text="Hidden" onClick={ (e,d) => {
            props.hideTimeline();
          }} active={props.hidden} />
          <Dropdown.Item text="Compact" onClick={ (e,d) => {
            props.compactTimeline();
          }} active={props.compact} />
          <Dropdown.Divider />
          <Dropdown.Item text="Show details" onClick={ (e,d) => {
            props.triggerTimelineDetails();
          }} active={props.showDetails} />
        </Dropdown.Menu>
      </Dropdown>
      </Menu.Item>
  </Menu>

export { FormatTimelineMenu };
export default connect(null,
  { triggerTimelineDetails, hideTimeline, compactTimeline })(FormatTimelineMenu);
