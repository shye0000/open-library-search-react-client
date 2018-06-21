import React from 'react';
import {connect} from 'react-redux';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import {search} from '../redux/actions';
import './Search.scss';

export class Search extends React.Component {

	handleSubmit = (ev) => {
		ev.preventDefault();
		const {form, search} = this.props;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}
			search(values);
		});
	}

	render() {
		const {searched, searching} = this.props;
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
						<Select size={size} style={{width: '100px'}} disabled={searching} >
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
						<Input placeholder="Tape something ..." style={{width: '300px'}} size={size}  disabled={searching} />
					)}
				</FormItem>
			</div>
		</Form>;
	}
}

const mapStateToProps = (state) => {
	const {searched, searching} = state.search;
	return {searched, searching};
};

const mapDispatchToProps = (dispatch) => {
	return {search: (params) => dispatch(search(params))};
};

const SearchForm = Form.create()(Search);

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);