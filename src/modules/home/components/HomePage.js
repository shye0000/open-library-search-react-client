import React from 'react';
import {connect} from 'react-redux';
import './HomePage.scss';

export class HomePage extends React.Component {

	render() {
		return (
			<div className="home">
				home page
			</div>
		);
	}
}

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
