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

	paginationOnChange = (page, pageSize) => {
		const {searchValue, queryParam, search} = this.props;
		search(queryParam, searchValue, page, pageSize);
	}

	render() {
		const {searching, results, searchSuccess, page, pageSize} = this.props;
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
							<div className="not-found">Found nothing ...</div>
							: null
					}
					{
						!searchSuccess && !searching ?
							<div className="search-failed">Search failed ...</div>
							: null
					}
				</Spin>
			</div>
			{
				searchSuccess && results.docs.length ?
					<div className="pagination-wrapper">
						<Pagination
							showSizeChanger
							pageSize={pageSize} total={total} current={page}
							pageSizeOptions={['10', '20', '50', '100']}
							onChange={(page, pageSize) => this.paginationOnChange(page, pageSize)}
							onShowSizeChange={(current, size) => this.paginationOnChange(current, size)}
						/>
					</div>
					: null
			}
		</div>;
	}
}

const mapStateToProps = (state) => {
	const {searching, results, searchSuccess, page, pageSize, searchValue, queryParam} = state.search;
	return {searching, results, searchSuccess, page, pageSize, searchValue, queryParam};
};

const mapDispatchToProps = (dispatch) => {
	return {search: (queryParam, searchValue, page, pageSize) => dispatch(search(queryParam, searchValue, page, pageSize))};
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);