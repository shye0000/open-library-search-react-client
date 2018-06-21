import React from 'react';
import {renderRoutes} from 'react-router-config';
import './Layout.scss';

class Layout extends React.Component {
	render() {
		return (
			<div className="layout">
				<div className="body-wrapper">
					{renderRoutes(this.props.route.routes)}
				</div>
				<div className="api-link-wrapper">
					<span>{'Powered by '}</span>
					<span><a href="https://openlibrary.org/dev/docs/api/search" target="_blank" rel="noopener noreferrer" >OPEN LIBRARY</a></span>
				</div>
			</div>
		);
	}
}

export default Layout;
