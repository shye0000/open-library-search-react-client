import React from 'react';
import {connect} from 'react-redux';
import Search from './Search';
import './HomePage.scss';

export class HomePage extends React.Component {

	render() {
		const {searched, searching, searchSuccess, results} = this.props;
		console.log(searched, searching, searchSuccess, results);
		return (
			<div className="home">
				<Search />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const {searched, searching, searchSuccess, results} = state.search;
	return {searched, searching, searchSuccess, results};
};

export default connect(mapStateToProps, null)(HomePage);
