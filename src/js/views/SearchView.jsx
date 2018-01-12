import {
  Dropdown,
  Grid,
  Icon,
  Label,
  Menu,
  Segment,
  Tab,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import React, { PureComponent } from "react";
import duration from "humanize-duration";
import moment from 'moment';
import qs from "qs";

import { earliest, latest } from '../selectors/timerange';
import { getPage, getVisiblePages } from '../selectors/pager';
import { push } from '../utils/url';
import { resetSearch, updateTimerange, updateQuery, updateLocation, updateItemsPerPage, updatePage } from "../actions";
import { searchEvents } from "../actions-api";
import EventsPane from './events/EventsPane';
import SearchPane from './events/SearchPane';

const urlToPane = {
  "/search": 0,
  "/search/trace": 1,
  "/search/streams": 2
}

const ResultsLabel = (props) =>
  <span><Icon name="check" color="green"/> {props.data.total} events ({moment(props.data.earliest).utc().format("DD/M/YYYY hh:mm:ss.SSS A")} to {moment(props.data.latest).utc().format("DD/M/YYYY hh:mm:ss.SSS A")}) in {duration(props.data.took)}.</span>


export class SearchView extends PureComponent {

  constructor(props) {
    super(props);
    this.onPerformSearch = this.onPerformSearch.bind(this);

    this.syncUrlState = this.syncUrlState.bind(this);
  }

  syncUrlState(props, next) {

    const url = props.history.location.pathname;
    const search = props.history.location.search;

    if(next == undefined || (next.url!==url || next.search!==search)) {

      //bind location
      props.updateLocation(url, search);

      //bind URL to update state actions
      const params = qs.parse(search, { ignoreQueryPrefix: true });

      const page = getPage(params["page"])
      const query = params["query"]
      const perPage = isNaN(params["perPage"]) ? 50 : parseInt(params["perPage"])
      const timerange = params["timerange"];

      let offset = props.data.offsets[page]

      if(!params["page"]) {
        props.resetSearch()
        offset = null
      }

      props.updateQuery(query);
      props.updatePage(page);
      props.updateItemsPerPage(perPage);
      props.updateTimerange(timerange);

      //TODO: fetch data from API if search params changed only
      props.searchEvents({
        "search": query,
        "earliest": earliest(timerange),
        "latest": latest(timerange),
        "paging": {
          "limit": perPage,
          "pages": getVisiblePages(page, props.data.total, props.results.itemsPerPage)
        },
        page,
        offset,
      });
    }
  }

  componentDidMount() {
    console.log("++ SearchView.componentDidMount");
    this.syncUrlState(this.props);
  }

  componentWillReceiveProps(next) {
    console.log("++ SearchView.componentWillReceiveProps");
    this.syncUrlState(this.props, next);
  }

  onPerformSearch(query) {
    if(query || query === "") {
      push(this.props.history, {"query": query, "page": null});
    }
  }

  render() {

    console.log("++ SearchView.render()");

    const activeTabIndex = urlToPane[this.props.location.pathname] || 0
    const panes = [
      { menuItem: <Menu.Item as={Link} to="/search" key="events">Events<Label size="tiny" color="blue">{this.props.data.total}</Label></Menu.Item>, render: () => <EventsPane /> },
      { menuItem: <Menu.Item as={Link} to="/search/trace" key="trace">Trace</Menu.Item>, render: () => <Tab.Pane basic attached={false}>Trace tab content</Tab.Pane>},
      { menuItem: <Menu.Item as={Link} to="/search/streams" key="streams">Streams</Menu.Item>, render: () => <Tab.Pane basic attached={false}>Tab 3 Content</Tab.Pane> }
    ];

    return (
      <Grid centered>
        <Grid.Row className="bottom-attached">
          <Grid.Column width="16">
            <SearchPane
              value = {this.props.query}
              range={this.props.time.range}
              onSearch={this.onPerformSearch}
              loading={this.props.searchInProgress}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched className="bottom-attached top-attached">
          <Grid.Column width="8" className="right-attached">
            <Segment basic attached className="search top" size="tiny">
              {!this.props.searchInProgress && <ResultsLabel {...this.props} /> }
            </Segment>
          </Grid.Column>
          <Grid.Column width="8" textAlign="right" className="left-attached">
            <Segment basic attached className="search top" size="tiny">

              <Menu floated="right" size="tiny" borderless secondary>
    		        <Menu.Item as="a">
      			      <Icon name="cloud download" color="blue"/>
                  <Dropdown text="Export search" className="blue">
                  </Dropdown>
                </Menu.Item>
              </Menu>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="top-attached bottom-attached">
          <Grid.Column width="16">
            <Tab activeIndex={activeTabIndex}
                 menu={{size:"mini", tabular: true, className: "plain"}}
                 panes={panes} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="top-attached">
          <Grid.Column width="16">
            <Segment basic attached className="search"></Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
const toProps = (state) => {
  return {
    ...state.searchView,
    ...state.location
  }
};

export default connect(toProps, { resetSearch, updateTimerange, updateLocation, updateQuery, updateItemsPerPage, updatePage, searchEvents })(SearchView);
