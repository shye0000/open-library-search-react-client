import React from 'react';
import { SearchForm } from './Search';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';
import { shallow } from 'enzyme';

describe('Search', () => {

	const defaultProps = {
		searched: true,
		queryParam: 'title',
		searchValue: 'search',
		search: jest.fn(() => {})
	};
	const wrapper = shallow(<SearchForm {...defaultProps} />).dive();
	const queryParamSelect = wrapper.find(Select);
	const Search = Input.Search;
	const searchValueSearch = wrapper.find(Search);

	it('render correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('when searched fields rendered with size "undefined"', () => {
		expect(queryParamSelect.props().size).toEqual(undefined);
		expect(searchValueSearch.props().size).toEqual(undefined);
	});

	it('when not searched fields rendered with size "large"', () => {
		const props = {
			...defaultProps,
			searched: false,
		};
		const wrapper = shallow(<SearchForm {...props} />).dive();
		const queryParamSelect = wrapper.find(Select);
		const searchValueSearch = wrapper.find(Search);
		expect(queryParamSelect.props().size).toEqual('large');
		expect(searchValueSearch.props().size).toEqual('large');
	});

	it('rendered with default values from props for "queryParam" and "searchValue"', () => {
		expect(queryParamSelect.props().value).toEqual('title');
		expect(searchValueSearch.props().value).toEqual('search');
	});

	it('when no default values in props, "queryParam" should be set as "q"', () => {
		const wrapper = shallow(<SearchForm />).dive();
		const queryParamSelect = wrapper.find(Select);
		expect(queryParamSelect.props().value).toEqual('q');
	});

});