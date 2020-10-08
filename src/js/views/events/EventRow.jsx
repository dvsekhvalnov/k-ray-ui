import {
  Button,
  Dropdown,
  Grid,
  Icon,
  Label,
  List,
  Popup,
  Table,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import React, { Component } from "react"
import ReactJson from "react-json-view"
import _ from "lodash";
import css from "classnames";
import filesize from "filesize"
import moment from "moment";

import { EXPORT_MSG_URL } from '../../api';
import { push } from '../../utils/url';
import { toggleRowPrettyPrint } from '../../actions';
import Clipboard from "../controls/Clipboard"
import KeyDetails from './KeyDetails';
import ToggleButton from '../controls/ToggleButton';

class Tag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, color, icon, details, ...rest } = this.props

    return (
      <Label horizontal color={color} {...rest} as="a">
        {icon && <Icon name={icon} />}
        {children}
        {details && <Label.Detail>{details}</Label.Detail>}
      </Label>
    );
    }
}

class EventRow extends Component {

  constructor(props) {
    super(props);
    this.onFilter = this.onFilter.bind(this);
  }

  onFilter(param, values) {
    const paramValue = _.reduce(values, (result, value, name) => {
      return result + " " + name + "=" + value;
    }, "");

    push(this.props.history, { [param]: paramValue.trim(), page:null }, { append:true });
  }

  render() {

    const event = this.props.row.msg;
    const ui = this.props.row.ui.value;

    const key = _.truncate(event.key.value || "null", { "length": 50 });
    const keySize = filesize(event.key.size, {symbols: {B: "bytes"}});
    const valueSize = filesize(event.value.size, {symbols: {B: "bytes"}});

    const type = event.value.type;

    const messageType = event.tags["messageType"] && event.tags["messageType"].value;
    const messageAction = event.tags["messageType"] && event.tags["messageType"].details;
    const correlationId = event.tags["correlationId"] && event.tags["correlationId"].value;

    const maxLines = this.props.display[event.value.type].maxLines;
    const wrapLines = (maxLines !== "all");
    const showTopicInfo = this.props.display.general.topicDetails;
    const showTimestampInfo = this.props.display.general.extendedTimestampDetails;
    const showEnrichments = this.props.display.general.enrichmentDetails;

    const host = event.tags["host"] && event.tags["host"].value;
    const service = event.tags["service"] && event.tags["service"].value;

    const msg = event.value.value;
    const topic = event.topic;
    const partition = event.partition;
    const offset = event.offset;

    const msgStyles = css("text-wrap", {
      "lines": wrapLines,
      [maxLines]: wrapLines,
    });

    const timestampMs = event.timestamp / 1000000;
    const blockTimestampMs = event.blockTimestamp / 1000000;

    const downloadUrl = EXPORT_MSG_URL(topic, partition, offset);

    const message = (type === "json" && ui.prettyPrint)
                      ? <ReactJson src={event.value.structured} />
                      : event.value.value;

    return (
      <Table.Row>
        <Table.Cell><Icon name="chevron right"/></Table.Cell>
        <Table.Cell>{moment(timestampMs).utc().format("MM/DD/YYYY hh:mm:ss.SSS A ZZ")}</Table.Cell>
        <Table.Cell>
          <Grid stackable>
            <Grid.Column width={13}>
              <Label.Group>
                <Popup flowing hoverable={false} on="click" trigger={<Tag color="blue" icon="key" details={keySize}>[{key}]</Tag>}>
                  <KeyDetails {...this.props.row} />
                </Popup>
                { showEnrichments && messageType &&
                <Tag color="brown" details={`[${messageAction}]`}
                  onClick={() => this.onFilter("query", { messageType, messageAction })}
                >[{messageType}]</Tag>
                }
                { showEnrichments && correlationId &&
                <Dropdown className="blue" inline trigger={<Tag color = "green" icon="random">{correlationId}</Tag>}>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      text="Filter"
                      icon="filter"
                      onClick={()=>{this.onFilter("query", { correlationId })}}/>
                    <Dropdown.Item text="Trace" icon="random" disabled/>
                    <Dropdown.Item
                      as="a"
                      target="_blank"
                      href={`https://splunk.pingidentity.com/en-US/app/saas_ops/search?q=search ${correlationId}&earliest=0&latest=`}
                      text="Splunk"
                      icon={{name: "chevron right", color:"green"}} />
                  </Dropdown.Menu>
                </Dropdown>
                }
              </Label.Group>
            </Grid.Column>
            <Grid.Column width={3} textAlign="right">
              <Button.Group size="mini">
                <Clipboard text={msg} />
                <ToggleButton as="a" icon="code" checked={ui.prettyPrint} onClick={
                  () => this.props.toggleRowPrettyPrint(this.props.row.index)
                }/>
                <Button as="a" icon="expand"/>
                <Button as="a" icon="cloud download" href={downloadUrl}/>
              </Button.Group>
            </Grid.Column>
          </Grid>

          <div className={msgStyles}>{message}</div>

          <List divided horizontal link size="small">
            { showEnrichments && host &&
              <List.Item as="a"
                onClick={() => {this.onFilter("query", {host});}}>host={host}</List.Item>
              }
            { showEnrichments && service &&
              <List.Item as="a"
                 onClick={() => {this.onFilter("query", {service});}}>service={service}</List.Item>
            }
            { showTopicInfo &&
            <List.Item as="a"
              onClick={() => {this.onFilter("query", {topic});}}>topic={topic}</List.Item>
            }
            { showTopicInfo &&
            <List.Item as="a"
              onClick={()=>{this.onFilter("query", { topic, partition })}}>partition={partition}</List.Item>
            }
            { showTopicInfo &&
            <List.Item as="a"
              onClick={()=>{this.onFilter("query", { topic, partition, offset })}}>offset={offset}</List.Item>
            }
            <List.Item as="a">size={valueSize}</List.Item>
            { showTimestampInfo &&
            <List.Item as="a">timestamp={moment(timestampMs).valueOf()}</List.Item>
            }
            { showTimestampInfo &&
            <List.Item as="a">block timestamp={moment(blockTimestampMs).valueOf()}</List.Item>
            }
          </List>
        </Table.Cell>
      </Table.Row>
    );
  }
}

EventRow.Tag = Tag
export { EventRow };
export default connect(null, { toggleRowPrettyPrint })(EventRow);
