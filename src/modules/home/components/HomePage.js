import React from 'react';
import {connect} from 'react-redux';
import Search from './Search';
import Results from './Results';
import classNames from 'classnames';
import './HomePage.scss';

export class HomePage extends React.Component {

	render() {
		const {searched, searching, searchSuccess, results} = this.props;
		console.log(searched, searching, searchSuccess, results);
		return (
			<div className="home">
				<div className={classNames('search-wrapper',{
					searched: searched
				})}>
					<Search />
				</div>
				{
					searched ?
						<div className="results-wrapper">
							<Results results={results}/>
						</div> : null
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const {searched, searching, searchSuccess, results} = state.search;
	return {searched, searching, searchSuccess, results};
};

export default connect(mapStateToProps, null)(HomePage);
