import React from 'react';
import { HomePage } from './HomePage';
import Results from './Results';
import { shallow } from 'enzyme';

describe('HomePage', () => {

	it('render correctly', () => {
		const props = {searched: true};
		const wrapper = shallow(<HomePage {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('when searched is true in props, Results should be rendered, and "search-wrapper" rendered with class "rendered"', () => {
		const props = {searched: true};
		const wrapper = shallow(<HomePage {...props} />);
		expect(wrapper.find('.search-wrapper.searched')).toHaveLength(1);
		expect(wrapper.find(Results)).toHaveLength(1);
	});

});