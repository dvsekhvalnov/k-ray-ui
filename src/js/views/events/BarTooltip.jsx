import { Comment, Segment } from "semantic-ui-react"
import React from "react";
import moment from "moment";

const BarTooltip = (props) => {
	const { payload } = props;
	const data = payload && payload[0] && payload[0].payload
	const count = data && data.count;
	const start = data && data.start;
	const end = data && data.end;

	return (
		<Segment size="tiny" compact secondary className="tip">
			<Comment.Group size="tiny">
				<Comment>
				  <Comment.Content>
					<Comment.Author>{count} events</Comment.Author>
					<Comment.Metadata>
					  { start && end &&
							<div>{moment(start).utc().format("DD/M/YYYY hh:mm:ss A")} - {moment(end).utc().format("DD/M/YYYY hh:mm:ss A")}</div>
						}
					</Comment.Metadata>
				  </Comment.Content>
				</Comment>
			  </Comment.Group>
		</Segment>
)};

export default BarTooltip;
