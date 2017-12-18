import {
  List,
  Button,
  Dropdown,
  Label,
  Popup,
  Grid,
  Container,
  Table,
  Icon,
} from "semantic-ui-react";
import React, { Component } from "react"
import css from "classnames";
import filesize from "filesize"
import moment from "moment";

import { push } from '../../utils/url';
import Clipboard from "../controls/Clipboard"

import _ from "lodash";

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

    push(this.props.history, { [param]: paramValue.trim() }, { append:true });
  }

  render() {

    const key = this.props.msg.key.value || "null";
    const keySize = filesize(this.props.msg.key.size, {symbols: {B: "bytes"}});

    const messageType = this.props.msg.tags["messageType"] && this.props.msg.tags["messageType"].value;
    const messageAction = this.props.msg.tags["messageType"] && this.props.msg.tags["messageType"].details;
    const correlationId = this.props.msg.tags["correlationId"] && this.props.msg.tags["correlationId"].value;

    const maxLines = this.props.display[this.props.msg.type].maxLines;
    const wrapLines = (maxLines !== "all");

    const host = this.props.msg.tags["host"] && this.props.msg.tags["host"].value;
    const service = this.props.msg.tags["service"] && this.props.msg.tags["service"].value;

    const msg = this.props.msg.value.value;
    const topic = this.props.msg.topic;
    const partition = this.props.msg.partition;
    const offset = this.props.msg.offset;

    const msgStyles = css("text-wrap", {
      "lines": wrapLines,
      [maxLines]: wrapLines,
    });

    const timestampMs = this.props.msg.timestamp / 1000000

    return (
      <Table.Row>
        <Table.Cell><Icon name="chevron right"/></Table.Cell>
        <Table.Cell>{moment(timestampMs).utc().format("MM/DD/YYYY hh:mm:ss.SSS A ZZ")}</Table.Cell>
        <Table.Cell>
          <Container fluid>
            <Grid>
              <Grid.Column floated="left" width={14}>
                <Label.Group>
                  <Popup hoverable on="click" flowing trigger={<Tag color="blue" icon="key" details={keySize}>[{key}]</Tag>}>Detail</Popup>
                  { messageType &&
                  <Tag color="brown" details={`[${messageAction}]`}
                    onClick={() => this.onFilter("query", { messageType, messageAction })}
                  >[{messageType}]</Tag>
                  }
                  { correlationId &&
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
              <Grid.Column floated="right" width={2} textAlign="right">
                <Button.Group size="mini">
                  <Clipboard text={msg} />
                  <Button as="a" icon="expand"/>
                  <Button as="a" icon="cloud download"/>
                </Button.Group>
              </Grid.Column>
            </Grid>

            <div className={msgStyles}>{msg}</div>
          </Container>

          <List divided horizontal link size="small">
            { host &&
              <List.Item as="a"
                onClick={() => {this.onFilter("query", {host});}}>host={host}</List.Item>
              }
            { service &&
              <List.Item as="a"
                 onClick={() => {this.onFilter("query", {service});}}>service={service}</List.Item>
            }
            <List.Item as="a"
              onClick={() => {this.onFilter("query", {topic});}}>topic={topic}</List.Item>
            <List.Item as="a"
              onClick={()=>{this.onFilter("query", { topic, partition })}}>partition={partition}</List.Item>
            <List.Item as="a"
              onClick={()=>{this.onFilter("query", { topic, partition, offset })}}>offset={offset}</List.Item>
          </List>
        </Table.Cell>
      </Table.Row>
    );
  }
}

EventRow.Tag = Tag
export default EventRow
