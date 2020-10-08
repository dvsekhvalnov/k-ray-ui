import { Icon, Menu, Dropdown } from "semantic-ui-react"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import { push } from "../../utils/url";
import {
  toggleEnrichmentDetails,
  toggleExtendedTimestamp,
  toggleJsonPrettyPrint,
  toggleTopicDetails,
  updateItemsPerPage,
  updateMaxLinesBinary,
  updateMaxLinesJson,
} from '../../actions';

class FormatResultsMenu extends Component {

  constructor(props) {
    super(props);

    this.onItemsPerPageChange = this.onItemsPerPageChange.bind(this);
  }

  onItemsPerPageChange(count) {
    push(this.props.history, {
      "perPage": count,
      "page": null
    });
  }

  render() {
    return (
      <Menu floated size="tiny" borderless secondary>
    		<Menu.Item as="a">
    			<Icon name="paint brush" color="blue"/>
    			<Dropdown text="Format results" className="blue">
    		    <Dropdown.Menu>
    				  <Dropdown.Header content="Items to display" />
    			      <Dropdown.Item
                  text="10 per page"
                  active={ this.props.itemsPerPage === 10 }
                  onClick={ (e,d) => { this.onItemsPerPageChange(10); }}
                />
    			      <Dropdown.Item
                  text="20 per page"
                  active={ this.props.itemsPerPage === 20 }
                  onClick={ (e,d) => { this.onItemsPerPageChange(20); }}
                />
    			      <Dropdown.Item
                  text="50 per page"
                  active={ this.props.itemsPerPage === 50 }
                  onClick={ (e,d) => { this.onItemsPerPageChange(50); }}
                />
    			      <Dropdown.Divider />
                <Dropdown.Header content="General" />
                <Dropdown.Item
                  text="Topic details"
                  active={ this.props.general.topicDetails } onClick={ (e,d) => {
                  this.props.toggleTopicDetails()
                }}
                />
                <Dropdown.Item
                  text="Extended timestamp info"
                  active={ this.props.general.extendedTimestampDetails } onClick={ (e,d) => {
                  this.props.toggleExtendedTimestamp()
                }}
                />
                <Dropdown.Item
                  text="Enrichement details"
                  active={ this.props.general.enrichmentDetails } onClick={ (e,d) => {
                  this.props.toggleEnrichmentDetails()
                }}
                />
                <Dropdown.Divider />
    				  	<Dropdown.Header content="JSON formatting" />
                <Dropdown.Item text="Always pretty-print" active={ this.props.json.prettyPrint } onClick={ (e,d) => {
                  this.props.toggleJsonPrettyPrint()
                }}
                />
    			      <Dropdown.Item text="5 lines" active={ this.props.json.maxLines == "five" } onClick={ (e,d) => {
                	this.props.updateMaxLinesJson("five");
              	}} />
    			      <Dropdown.Item text="10 lines" active={ this.props.json.maxLines == "ten" } onClick={ (e,d) => {
                	this.props.updateMaxLinesJson("ten");
              	}} />
    			      <Dropdown.Item text="15 lines" active={ this.props.json.maxLines == "fifteen" } onClick={ (e,d) => {
                	this.props.updateMaxLinesJson("fifteen");
              	}} />
    			      <Dropdown.Item text="All lines" active={ this.props.json.maxLines == "all" } onClick={ (e,d) => {
                	this.props.updateMaxLinesJson("all");
              	}} />
    				  	<Dropdown.Header content="Binary formatting" />
    			      <Dropdown.Item text="1 line" active={ this.props.binary.maxLines == "one" } onClick={ (e,d) => {
                	this.props.updateMaxLinesBinary("one");
              	}} />
    			      <Dropdown.Item text="2 lines" active={ this.props.binary.maxLines == "two" } onClick={ (e,d) => {
                	this.props.updateMaxLinesBinary("two");
              	}} />
    			      <Dropdown.Item text="5 lines" active={ this.props.binary.maxLines == "five" } onClick={ (e,d) => {
                	this.props.updateMaxLinesBinary("five");
              	}} />
    			      <Dropdown.Item text="All lines" active={ this.props.binary.maxLines == "all" } onClick={ (e,d) => {
                	this.props.updateMaxLinesBinary("all");
              	}} />
    		    </Dropdown.Menu>
    		  </Dropdown>
    	  </Menu.Item>
    	</Menu>
    );
  }
}

export { FormatResultsMenu };

export default withRouter(connect(null,
	{ updateMaxLinesBinary, updateMaxLinesJson, updateItemsPerPage,
    toggleJsonPrettyPrint, toggleTopicDetails, toggleExtendedTimestamp, toggleEnrichmentDetails })(FormatResultsMenu));
