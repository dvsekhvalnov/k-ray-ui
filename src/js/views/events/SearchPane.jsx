import { Button, Icon, Input, Segment, Select } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import { push } from '../../utils/url';

const options = [
  { key: 'last_5_min', text: 'Last 5 minutes', value: 'last_5_min' },
  { key: 'last_15_min', text: 'Last 15 minutes', value: 'last_15_min' },
  { key: 'today', text: 'Today', value: 'today' },
  { key: 'week_to_date', text: 'Last week', value: 'week_to_date' },
  { key: 'month_to_date', text: 'Last month', value: 'month_to_date' },
  { key: 'all', text: 'All the time', value: 'all' }
]

class SearchPane extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };

    this.onSearchChange = this.onSearchChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onTimerangeChange = this.onTimerangeChange.bind(this)
  }

  componentWillReceiveProps(next) {
    if(next.value !== this.props.value) {
      this.onSearchChange(next.value);
    }
  }

  onTimerangeChange(e, d) {
    push(this.props.history,
      {
        "timerange": d.value,
        "page": null,
      });
  }

  onKeyUp(e) {
    if (e.key === "Enter") {
      this.props.onSearch(this.state.value);
    }
    else if (e.key === "Escape") {
      this.setState({value:""});
    }
  }

  onCancel(e) {
    if (this.state.value) {
      this.setState({value:""});
      this.props.onSearch("");
    }
  }

  onSearchChange(value) {
    this.setState({
      value: value,
    });
  }

  render() {

    const icon = this.state.value ? "cancel" : "search";

    return (
      <Segment basic className="search">
        <Input fluid action iconPosition="left" placeholder="Search..."
               value={this.state.value}
               loading={this.props.loading}
               disabled={this.props.loading}
               onChange={(e, data) => { this.onSearchChange(data.value); }}
               onKeyUp={ this.onKeyUp }>
          <input />
          <Icon className="link" name={icon} onClick={this.onCancel}/>
          <Select options={options} value={this.props.range} onChange={this.onTimerangeChange}/>
          <Button
            onClick={(e, d) => { this.props.onSearch(this.state.value); }}
            icon><Icon name="search" /></Button>
        </Input>
      </Segment>
    );
  }
}

export default withRouter(SearchPane);
