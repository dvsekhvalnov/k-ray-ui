import { Icon, Menu, Dropdown } from "semantic-ui-react"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import {
  updateItemsPerPage,
  updateMaxLinesBinary,
  updateMaxLinesJson,
} from '../../actions';

import { push } from "../../utils/url";

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
    				  	<Dropdown.Header content="Max lines (JSON)" />
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
    				  	<Dropdown.Header content="Max lines (binary)" />
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
	{ updateMaxLinesBinary, updateMaxLinesJson, updateItemsPerPage })(FormatResultsMenu));
