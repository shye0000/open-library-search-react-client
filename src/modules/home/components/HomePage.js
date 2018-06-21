import React from 'react';
import {connect} from 'react-redux';
import Search from './Search';
import Results from './Results';
import classNames from 'classnames';
import './HomePage.scss';

export class HomePage extends React.Component {

	render() {
		const {searched} = this.props;
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
							<Results />
						</div> : null
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const {searched} = state.search;
	return {searched};
};

export default connect(mapStateToProps, null)(HomePage);
