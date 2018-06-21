import React from 'react';
import {connect} from 'react-redux';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';
import debounce from 'lodash.debounce';
import {search} from '../redux/actions';
import './Search.scss';

export class Search extends React.Component {

	constructor(props) {
		super(props);
		this.searchValueOnChange = debounce(this.searchValueOnChange, 500);
	}

	handleSubmit = (ev) => {
		if (ev) {
			ev.preventDefault();
		}
		const {form, search} = this.props;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}
			search(values);
		});
	}

	queryParamOnChange = (value) => {
		const {form} = this.props;
		const searchValue = form.getFieldValue('searchValue');
		if (value && searchValue) {
			this.handleSubmit();
		}
	}

	searchValueOnChange = (value) => {
		const {form} = this.props;
		const queryParam = form.getFieldValue('queryParam');
		if (value && queryParam) {
			this.handleSubmit();
		}
	}

	render() {
		const {searched} = this.props;
		const FormItem = Form.Item;
		const { getFieldDecorator } = this.props.form;
		const Option = Select.Option;
		const size = searched ? undefined : 'large';
		return <Form
			className="search"
			onSubmit={this.handleSubmit}
		>
			<div className="search-inner">
				<FormItem>
					{getFieldDecorator('queryParam', {
						rules: [{required: true, message: 'Field required' }],
						initialValue: 'q'
					})(
						<Select
							size={size}
							style={{width: '100px'}}
							onChange={(value) => this.queryParamOnChange(value)}
						>
							<Option value="q">All</Option>
							<Option value="title">Title</Option>
							<Option value="author">Author</Option>
						</Select>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('searchValue', {
						rules: [{required: true, message: 'Field required' }],
					})(
						<Input
							placeholder="Tape something ..."
							style={{width: '300px'}}
							size={size}
							onChange={(value) => this.searchValueOnChange(value)}
						/>
					)}
				</FormItem>
			</div>
		</Form>;
	}
}

const mapStateToProps = (state) => {
	const {searched} = state.search;
	return {searched};
};

const mapDispatchToProps = (dispatch) => {
	return {search: (params) => dispatch(search(params))};
};

const SearchForm = Form.create()(Search);

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);