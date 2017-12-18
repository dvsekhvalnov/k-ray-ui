import { Icon, Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import { push } from '../../utils/url';

const pagesPerSheet = 4;

class Pager extends Component {

	constructor(props) {
		super(props);

		this.onNextClick = this.onNextClick.bind(this);
		this.onPrevClick = this.onPrevClick.bind(this);
		this.onPageChange = this.onPageChange.bind(this);
	}

	onPageChange(nextPage) {
    push(this.props.history, {"page": nextPage});
	}

	onNextClick(e, d) {
		this.onPageChange(this.props.currentPage + 1);
	}

	onPrevClick(e, d) {
		this.onPageChange(this.props.currentPage - 1);
	}

	render() {

		const currentPage = this.props.currentPage;
		const visiblePages = this.props.visiblePages;

		const lastPage = Math.floor(this.props.total / this.props.perPage);

		let rightPage = 0;
		let leftPage = 0;

		if (visiblePages.length > 0) {
			rightPage= visiblePages[visiblePages.length-1];
			leftPage = visiblePages[0];
		}

		const morePages = lastPage > rightPage;
		const lessPages = leftPage > 1;		

		let items = [];

		for (let i = 0; i < visiblePages.length; i++) {
			const page = visiblePages[i]
			items.push(
				<Menu.Item key={page} as="a" active={page===currentPage}
					onClick={(e,d) => {this.onPageChange(page)}}>{page}</Menu.Item>
			)
		}

		return (
			<Menu floated="right" size="mini" borderless secondary color="blue">
					<Menu.Item as="a" icon disabled={currentPage === 1} onClick={this.onPrevClick}>
						<Icon name="left chevron" />
					</Menu.Item>
					{ lessPages &&  <Menu.Item>...</Menu.Item> }
					{ items }
					{ morePages && <Menu.Item>...</Menu.Item> }
			    <Menu.Item as="a" icon disabled={currentPage === lastPage} onClick={this.onNextClick}>
			      <Icon name="right chevron" />
			    </Menu.Item>
			</Menu>
		);
	}
}

export { Pager };
export default withRouter(Pager);
