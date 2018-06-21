import React from 'react';
import {connect} from 'react-redux';
import {search} from '../redux/actions';
import Spin from 'antd/lib/spin';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Result from './Result';
import './Results.scss';

export class Results extends React.Component {
	render() {
		const {searched, searching, results, searchSuccess} = this.props;
		return <div className="results">
			<div className="results-body">
				<Spin spinning={searching}>
					{
						searchSuccess && results.docs.length ?
							<Row
								gutter={20}
								type="flex"
								justify="center"
								align="top"
							>
								{
									results.docs.map(work => <Col
										key={work.key}
										xs={{ span: 24}}
										sm={{ span: 12}}
										md={{ span: 8}}
										lg={{ span: 6}}
										xl={{ span: 4}}
									>
										<Result result={work} />
									</Col>)
								}
							</Row>
							: null
					}
					{
						searchSuccess && !results.docs.length ?
							<div>Found nothing ...</div>
							: null
					}
					{
						!searchSuccess && !searching ?
							<div>Search failed ...</div>
							: null
					}
				</Spin>
			</div>
			<div className="pagination-wrapper">
				todo pagination
			</div>
		</div>;
	}
}

const mapStateToProps = (state) => {
	const {searched, searching, results, searchSuccess} = state.search;
	return {searched, searching, results, searchSuccess};
};

const mapDispatchToProps = (dispatch) => {
	return {search: (params) => dispatch(search(params))};
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);