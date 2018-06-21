import React from 'react';
import HomeLink from '../../components/HomeLink';
import './NotFoundPage.scss';

export class NotFoundPage extends React.Component {
	render() {
		return (
			<div className="not-found">
				<h1>404</h1>
				<h2>Nothing here!</h2>
				<p>
					<HomeLink />
				</p>
			</div>
		);
	}
}

export default NotFoundPage;
