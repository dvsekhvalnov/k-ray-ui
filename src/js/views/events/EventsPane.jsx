import React, { Component } from "react";
import { Tab, Grid } from "semantic-ui-react"
import TimelinePanel from "./TimelinePanel"
import EventsPanel from "./EventsPanel"

class EventsPane extends Component {
	render() {
		return (
			<Tab.Pane as={Grid}>
				<Grid.Row>
					<Grid.Column width={16}>
						<TimelinePanel {...this.props} />
						<EventsPanel />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={16}></Grid.Column>
				</Grid.Row>
			</Tab.Pane>
		)
	}
}

export default EventsPane;
