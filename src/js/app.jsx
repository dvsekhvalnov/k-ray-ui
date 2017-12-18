import "semantic-ui-css/semantic.min.css";

import "../css/main.css";

import { Menu } from "semantic-ui-react";
import { NavLink, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import React, { Component } from "react";

import DashboardView from "./views/DashboardView";
import SearchView from "./views/SearchView";
import SettingsView from "./views/SettingsView";

class App extends Component {
	render() {
		return (
			<div>
				<Menu icon fixed="top" borderless inverted color="grey">
					<Menu.Item name="Search" activeClassName="active" as={NavLink} to="/search"/>
					<Menu.Item name="Dashboard" activeClassName="active" as={NavLink} to="/dashboard" />
					<Menu.Item name="Settings" activeClassName="active" as={NavLink} to="/settings" />
				</Menu>

        <Switch>
  				<Route exact path="/" render={ () =>
            <Redirect to={{
              pathname: "/search",
              search: this.props.location.search,
            }} />
          } />
  				<Route path="/search" component={SearchView} />
  				<Route path="/dashboard" component={DashboardView} />
          <Route path="/settings" component={SettingsView} />
        </Switch>
			</div>
		)
	}
};

export default withRouter(App);
