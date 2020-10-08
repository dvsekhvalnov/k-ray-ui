import {
  Button,
  Container,
  Dropdown,
  Grid,
  Icon,
  List,
  Menu
} from "semantic-ui-react";
import React from "react";
import ReactJson from "react-json-view"
import fastChunkString from "fast-chunk-string";
import filesize from "filesize";

import Clipboard from "../controls/Clipboard";
import ToggleButton from "../controls/ToggleButton";

const test = "ewogICAgImNvbnRleHQiOiB7CiAgICAgICAgImNvcnJlbGF0aW9uSWQiOiAiMzg0ZWJlNWUiLAogICAgICAgICJtZXNzYWdlVHlwZSI6ICJjb20ucGluZ2Nvbm5lY3Quc2Fhcy5sb2dnaW5nLmRvbWFpbi5Mb2dNZXNzYWdlRXZlbnQiLAogICAgICAgICJvY2N1cmVkQXQiOiAiMjAxOC0wMy0yM1QxODoxMDowNS40NTRaIiwKICAgICAgICAib3BlcmF0aW9uIjogIkNSRUFURUQiLAogICAgICAgICJvcmlnaW4iOiB7CiAgICAgICAgICAgICJkYyI6ICJ2aXIiLAogICAgICAgICAgICAiaG9zdCI6ICJjb20tdGVzdC12aXItdHBuLTE2LTYtODYtU05BUFNIT1QtMzFjYTA3NTAtNS0xNSIsCiAgICAgICAgICAgICJzZXJ2aWNlIjogInRva2VuLXNlcnZpY2UiCiAgICAgICAgfQogICAgfSwKICAgICJtZXNzYWdlIjogewogICAgICAgICJjb250ZXh0IjogewogICAgICAgICAgICAiQUNDT1VOVF9SRUdJT04iOiAiTkEiLAogICAgICAgICAgICAiQUdFTlQiOiAiTW96aWxsYS81LjBfKFgxMTtfTGludXhfeDg2XzY0KV9BcHBsZVdlYktpdC81MzcuMzZfKEtIVE1MLF9saWtlX0dlY2tvKV9DaHJvbWUvNDQuMC4yNDAzLjE1N19TYWZhcmkvNTM3LjM2IiwKICAgICAgICAgICAgIkFQUF9OQU1FIjogIlBpbmdPbmUiLAogICAgICAgICAgICAiQVVUSE5fSUQiOiAiNmIxOWJiM2UtZTNmZC00NTU2LWI1Y2EtZTU1Y2EzNTY1Mzg0IiwKICAgICAgICAgICAgIkNPTVBPTkVOVF9JRCI6ICJUT0tFTiIsCiAgICAgICAgICAgICJDT05ORUNUSU9OX0lEIjogIjJmMjU2MTUwLWNmNjItNDdjZS1hNWEyLWFlZTIyNWNjNDk5NCIsCiAgICAgICAgICAgICJESVNUUklCVVRPUl9JRCI6ICIyNzY1OGI4Mi01YzVkLTExZTEtYWViZC0wMDUwNTZiMTAwNTYiLAogICAgICAgICAgICAiSURQX0FDQ09VTlRfSUQiOiAiOWE1Yzk4ZGUtZDg1OS00M2JhLWJiMzItODJmMGNlZjY0OWZjIiwKICAgICAgICAgICAgIklEUF9BQ0NPVU5UX05BTUUiOiAiQ2hyaXN0aWFuc2VuIGFuZCBTb25zIiwKICAgICAgICAgICAgIklEUF9FTlRJVFlfSUQiOiAiaHR0cHM6Ly9waW5nb25lLmNvbS9pZHAvY2QtMTc2Njk4MTU5OS5waW5naWRlbnRpdHkiLAogICAgICAgICAgICAiSURQX0lEIjogImNkLTE3NjY5ODE1OTkucGluZ2lkZW50aXR5IiwKICAgICAgICAgICAgIklQQUREUkVTUyI6ICI1NC4xNDMuMjE1LjE0NSIsCiAgICAgICAgICAgICJFTUFJTF9GUk9NX0lEUCI6ICJnZW5vdmV2YS5ncmltZXNAeWFob28uY29tIiwKICAgICAgICAgICAgIkZJUlNUX05BTUVfRlJPTV9JRFAiOiAiRmVsaWNpdHkiLAogICAgICAgICAgICAiTEFTVF9OQU1FX0ZST01fSURQIjogIkZyYW1pIiwKICAgICAgICAgICAgIlNVQkpFQ1RfRlJPTV9JRFAiOiAiaWRwLmdlbm92ZXZhLmdyaW1lcyIsCiAgICAgICAgICAgICJTVUJKRUNUIjogImdlbm92ZXZhLmdyaW1lcyIsCiAgICAgICAgICAgICJSRVFVRVNUX1RZUEUiOiAiU1NPX0lEUCIsCiAgICAgICAgICAgICJTQUFTX0RPTUFJTiI6ICJkZXNrdG9wLnBpbmdvbmUuY29tIiwKICAgICAgICAgICAgIlNBQVNfSUQiOiAiZDRjNjgzMGUtYWYwYi00OGE2LWI4NDYtZDI4ZmZjNTRkNGEzIiwKICAgICAgICAgICAgIlNQX0FDQ09VTlRfSUQiOiAiNjA5YTY2OWEtYjc0Ni00NDNmLTkwMzktMWViNzFmOGY4ZTk1IiwKICAgICAgICAgICAgIlNQX0FDQ09VTlRfTkFNRSI6ICJXYXJkIGFuZCBTb25zIiwKICAgICAgICAgICAgIlRSQUNLSU5HX0lEIjogIjM4NGViZTVlIgogICAgICAgIH0sCiAgICAgICAgImlkIjogIjg2YWIxYjBmLTI2ZDAtNDUyOS1hMGYwLWEyOTRmZTUzZDBkNSIsCiAgICAgICAgImxvZ0xldmVsIjogIklORk8iLAogICAgICAgICJsb2dMZXZlbFZhbHVlIjogMjAwMDAsCiAgICAgICAgImxvZ2dlck5hbWUiOiAiY29tLnBpbmdjb25uZWN0LnNhYXMuc3NvLkF1ZGl0TG9nZ2VyIiwKICAgICAgICAibWVzc2FnZSI6ICJhdXRoU3VjY2VzcyIsCiAgICAgICAgInRhZ3MiOiBbCiAgICAgICAgICAgICJhdXRoU3VjY2VzcyIKICAgICAgICBdLAogICAgICAgICJ0aHJlYWROYW1lIjogImh0dHAtbmlvLTEyNy4wLjAuMS04MDgwLWV4ZWMtMTA4IiwKICAgICAgICAidGltZXN0YW1wIjogIjIwMTgtMDMtMjNUMTg6MTA6MDUuNDU0WiIKICAgIH0KfQ==";

const renderContent = (msg, ui) => {

  if(msg.type === "json") {

    const content = ui.key.prettyPrint
                      ? <ReactJson src={msg.structured} />
                      : msg.value;

    return <div className="text-wrap">{content}</div>
  }

  const rows = fastChunkString(msg.value, {size: 100, unicodeAware: false});

  return <pre>{_.map(rows, (value, index) => <div key={index}>{value}</div>)}</pre>
}

const KeyDetails = ({msg, ui}) => {

  //a lot of dups with EventRow
  const topic = msg.topic;
  const partition = msg.partition;
  const offset = msg.offset;
  const size = filesize(msg.key.size, {symbols: {B: "bytes"}});

	return (
		<Container fluid>
			<Grid className="fixed width">
				<Grid.Row className="bottom-attached">
					<Grid.Column floated="left" width={8} textAlign="left">
						<Menu borderless secondary size="mini">
							<Menu.Item fitted>
								<Dropdown text={`Raw (${ui.key.displayRawAs})`} icon={<Icon name="eye" />} pointing labeled button className="icon mini">
							    <Dropdown.Menu className="tiny">
										<Dropdown.Header content="Display raw value" />
							      <Dropdown.Item active={ui.key.displayRawAs==='Auto'}>Auto</Dropdown.Item>
							      <Dropdown.Item active={ui.key.displayRawAs==='Hex'}>Hexadecimal</Dropdown.Item>
							      <Dropdown.Item active={ui.key.displayRawAs==='Dec'}>Decimal</Dropdown.Item>
										<Dropdown.Divider />
										<Dropdown.Header content="Display as" />
							      <Dropdown.Item>Int32</Dropdown.Item>
							      <Dropdown.Item>Int64</Dropdown.Item>
							      <Dropdown.Item>UTF-8</Dropdown.Item>
							      <Dropdown.Item>UTF-16</Dropdown.Item>
							      <Dropdown.Item>UUID</Dropdown.Item>
							    </Dropdown.Menu>
							  </Dropdown>
							</Menu.Item>
						</Menu>
					</Grid.Column>
					<Grid.Column floated="right" width={8} textAlign="right">
              <Button.Group size="mini">
                <Clipboard text={msg.key.value} />
                <ToggleButton as="a" icon="code" checked={false} />
                <Button as="a" icon="cloud download" href="http://google.com" />
              </Button.Group>
            </Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={16}>
						<div className="scrollable">
							<Container fluid>{renderContent(msg.key, ui)}</Container>
						</div>
					</Grid.Column>
				</Grid.Row>
			</Grid>
      <List divided horizontal link size="small">
        <List.Item as="a">topic={topic}</List.Item>
        <List.Item as="a">partition={partition}</List.Item>
        <List.Item as="a">offset={offset}</List.Item>
        <List.Item as="a">size={size}</List.Item>
      </List>
		</Container>
)};

export default KeyDetails;
