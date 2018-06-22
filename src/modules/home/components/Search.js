import React from 'react';
import {connect} from 'react-redux';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';
import debounce from 'lodash.debounce';
import {search} from '../redux/actions';
import './Search.scss';

export class Search extends React.Component {

	handleSubmit = (ev) => {
		if (ev) {
			ev.preventDefault();
		}
		const {form, search} = this.props;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}
			const {queryParam, searchValue} = values;
			search(queryParam, searchValue);
		});
	}

	render() {
		const {searched} = this.props;
		const FormItem = Form.Item;
		const { getFieldDecorator } = this.props.form;
		const Option = Select.Option;
		const Search = Input.Search;
		const size = searched ? undefined : 'large';
		return <Form
			className="search"
			onSubmit={this.handleSubmit}
		>
			<div className="search-inner">
				<FormItem>
					{getFieldDecorator('queryParam', {
						rules: [{required: true, message: 'Field required' }],
					})(
						<Select
							size={size}
							style={{width: '100px'}}
						>
							<Option value="q">All</Option>
							<Option value="title">Title</Option>
							<Option value="author">Author</Option>
						</Select>
					)}
				</FormItem>
				<FormItem className="search-value-field">
					{getFieldDecorator('searchValue', {
						rules: [{required: true, message: 'Field required' }],
					})(
						<Search
							enterButton={!searched}
							placeholder="Tape something ..."
							size={size}
						/>
					)}
				</FormItem>
			</div>
		</Form>;
	}
}

const mapStateToProps = (state) => {
	const {searched, queryParam, searchValue} = state.search;
	return {searched, queryParam, searchValue};
};

const mapDispatchToProps = (dispatch) => {
	return {search: (queryParam, searchValue) => dispatch(search(queryParam, searchValue))};
};


export const SearchForm = Form.create({
	mapPropsToFields(props) {
		const {queryParam, searchValue} = props;
		return {
			queryParam: Form.createFormField({
				value: queryParam || 'q',
			}),
			searchValue: Form.createFormField({
				value: searchValue || undefined,
			}),
		};
	},
	onValuesChange(props, changedValues, allValues) {
		const {search} = props;
		const changedField = Object.keys(changedValues)[0];
		if (changedField === 'queryParam') {
			valuesOnChange(allValues, search);
		} else if (changedField === 'searchValue') {
			debouncedValuesOnChange(allValues, search);
		}
	}
})(Search);

const valuesOnChange = (values, search) => {
	const {queryParam, searchValue} = values;
	if (searchValue && queryParam) {
		search(queryParam, searchValue);
	}
};

const debouncedValuesOnChange = debounce(valuesOnChange, 500);

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
