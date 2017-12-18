import { Container, Grid } from 'semantic-ui-react';
import React, { Component } from 'react';

export default class SettingsView extends Component {
	render() {
		return (
			<Grid centered>
        <Grid.Row className="bottom-attached">
          <Grid.Column width="16">
            <Container fluid>
                Settings are not implemented today. But we accepting contributions and patch sets :)
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
	  )}
  }
