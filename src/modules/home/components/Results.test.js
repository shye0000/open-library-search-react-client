import React from 'react';
import { Results } from './Results';
import Result from './Result';
import { shallow } from 'enzyme';

describe('Results', () => {

	const props = {
		searching: false,
		results: {
			numFound: 20,
			docs: [
				{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5},
				{key: 6}, {key: 7}, {key: 8}, {key: 9}, {key: 10}
			]
		},
		searchSuccess: true,
		page: 1,
		pageSize: 10,
		searchValue: 'test',
		queryParam: 'q',
		search: jest.fn(() => {})
	};

	it('render correctly', () => {
		const wrapper = shallow(<Results {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('when searchSuccess with 10 results, 10 Result should be rendered.', () => {
		const wrapper = shallow(<Results {...props} />);
		expect(wrapper.find(Result)).toHaveLength(10);
	});

	it('when searchSuccess with results and multiple pages, when pagination change call search with new page or new page size.', () => {
		const wrapper = shallow(<Results {...props} />);
		const paginationOnChangeSpy = jest.spyOn(wrapper.instance(), 'paginationOnChange');
		paginationOnChangeSpy(2, 20);
		expect(props.search).toBeCalledWith('q', 'test', 2, 20);
	});

	it('when not searchSuccess and not searching, "search-failed" should be rendered.', () => {
		const props = {
			searching: false,
			results: undefined,
			searchSuccess: false,
			page: 1,
			pageSize: 10,
			searchValue: 'test',
			queryParam: 'q',
		};
		const wrapper = shallow(<Results {...props} />);
		expect(wrapper.find('.search-failed')).toHaveLength(1);
	});

	it('when searchSuccess with empty result, "not-found" should be rendered.', () => {
		const props = {
			searching: false,
			results: {
				numFound: 0,
				docs: []
			},
			searchSuccess: true,
			page: 1,
			pageSize: 10,
			searchValue: 'test',
			queryParam: 'q',
		};
		const wrapper = shallow(<Results {...props} />);
		expect(wrapper.find('.not-found')).toHaveLength(1);
	});

});