import React from 'react';
import {connect} from 'react-redux';
import {search} from '../redux/actions';
import Spin from 'antd/lib/spin';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Pagination from 'antd/lib/pagination';
import Result from './Result';
import './Results.scss';

export class Results extends React.Component {

	paginationOnChange = (page) => {
		const {params, search} = this.props;
		search(params, page);
	}

	render() {
		const {searching, results, searchSuccess, page} = this.props;
		let total;
		if (results) {
			const {numFound} = results;
			total = numFound;
		}
		return <div className="results">
			<div className="results-body">
				<Spin spinning={searching}>
					{
						searchSuccess && results.docs.length ?
							<Row
								gutter={20}
								type="flex"
								align="top"
							>
								{
									results.docs.map(work => <Col
										key={work.key}
										xs={{ span: 24}}
										sm={{ span: 12}}
										md={{ span: 8}}
										lg={{ span: 8}}
										xl={{ span: 6}}
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
			{
				searchSuccess && results.docs.length ?
					<div className="pagination-wrapper">
						<Pagination
							pageSize={100} total={total} current={page}
							onChange={(page) => this.paginationOnChange(page)}
						/>
					</div>
					: null
			}
		</div>;
	}
}

const mapStateToProps = (state) => {
	const {searched, searching, results, searchSuccess, page, params} = state.search;
	return {searched, searching, results, searchSuccess, page, params};
};

const mapDispatchToProps = (dispatch) => {
	return {search: (params, page) => dispatch(search(params, page))};
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);