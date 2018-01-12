import { Icon, Dropdown, Menu, Segment } from "semantic-ui-react"
import { connect } from "react-redux";
import React, { Component } from 'react';

import { triggerTimelineDetails, hideTimeline, compactTimeline } from "../../actions";
import FormatResultsMenu from "./FormatResultsMenu";
import FormatTimelineMenu from "./FormatTimelineMenu";
import Pager from "./Pager";
import Timeline from "./Timeline"

class TimelinePanel extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Segment basic className="top-attached left-attached">
						<FormatTimelineMenu {...this.props.timeline} />
						<FormatResultsMenu {...this.props.results}
							onItemsPerPageChange={this.props.onItemsPerPageChange}/>					
						<Pager {...this.props.pager} total={this.props.data.total} perPage={this.props.results.itemsPerPage} />
				</Segment>
				{!this.props.timeline.hidden &&
					<Segment basic>
						<Timeline data={this.props.data.graph}
										  showDetails={this.props.timeline.showDetails}
									    dataKey="count"/>
					</Segment>}

			</div>
		);
	}
}

export {TimelinePanel};
export default connect(
	state => ({...state.searchView}))(TimelinePanel);
