import {
  Button,
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

import { getPage, getVisiblePages } from '../selectors/pager';
import { push } from '../utils/url';
import { searchEvents } from "../actions-api";
import { updateQuery, updateLocation, updateItemsPerPage, updatePage } from "../actions";
import EventsPane from './events/EventsPane';
import SearchPane from './events/SearchPane';

const urlToPane = {
  "/search": 0,
  "/search/trace": 1,
  "/search/streams": 2
}

export class SearchView extends PureComponent {

  constructor(props) {
    super(props);
    this.onPerformSearch = this.onPerformSearch.bind(this);

    this.syncUrlState = this.syncUrlState.bind(this);
  }

  syncUrlState(props, next) {

    console.log("store", this.context.store);

    const url = props.history.location.pathname;
    const search = props.history.location.search;

    if(next == undefined || (next.url!==url || next.search!==search)) {

      //bind location
      props.updateLocation(url, search);

      //bind URL to update state actions
      const params = qs.parse(search, { ignoreQueryPrefix: true });

      const page = getPage(params["page"], props.data.total, props.results.itemsPerPage)
      const visiblePages = getVisiblePages(page, props.data.total, props.results.itemsPerPage)
      const query = params["query"]
      const perPage = isNaN(params["perPage"]) ? 50 : parseInt(params["perPage"])

      props.updateQuery(query);
      props.updatePage(page, visiblePages);
      props.updateItemsPerPage(perPage);

      //TODO: fetch data from API if search changed
      props.searchEvents({
        "search": query,
        "earliest": 1513357200000,
        "latest": 1513360628804,
        "paging": {
          "limit": perPage,
          "pages": visiblePages
        },
        "page": page,
        "offset": props.data.offsets[page]
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
      push(this.props.history, {"query": query});
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
            <SearchPane value = {this.props.query} onSearch={this.onPerformSearch} loading={this.props.searchInProgress}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched className="bottom-attached top-attached">
          <Grid.Column width="8" className="right-attached">
            <Segment basic attached className="search top" size="tiny">
              <Icon name="check" color="green"/> {this.props.data.total} events ({moment(this.props.data.earliest).utc().format("DD/M/YYYY hh:mm:ss.SSS A")} to {moment(this.props.data.latest).utc().format("DD/M/YYYY hh:mm:ss.SSS A")}) in {duration(this.props.data.took)}.
            </Segment>
          </Grid.Column>
          <Grid.Column width="8" textAlign="right" className="left-attached">
            <Segment basic attached className="search top" size="tiny">
              <Button.Group size="tiny">
                <Button as="a" content="Export" icon="cloud download" labelPosition="right" />
              </Button.Group>
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

export default connect(toProps, { updateLocation, updateQuery, updateItemsPerPage, updatePage, searchEvents })(SearchView);
