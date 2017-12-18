import { Container, Table, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import _ from "lodash";

import EventRow from "./EventRow"

class EventsPanel extends Component {

	render() {

		const rows = _.map(this.props.data.rows, (event) =>
			<EventRow key={`${event.topic}-${event.partition}-${event.offset}`}
								msg={event}
								history={this.props.history}
								display={this.props.results} />
		);

		return (
			<Container fluid>
				<Table celled selectable structured attached="top" size="small" compact className="plain">
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell><Icon name="info" /></Table.HeaderCell>
								<Table.HeaderCell>Time</Table.HeaderCell>
								<Table.HeaderCell>Event</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>{rows}</Table.Body>
				</Table>
			</Container>
		);
	}
}

export { EventsPanel };
export default withRouter(connect((state) => ({...state.searchView}))(EventsPanel));
