import React from 'react';
import { HomePage } from './HomePage';
import { shallow } from 'enzyme';

describe('HomePage', () => {

	it('render correctly', () => {
		const props = {
			fetching: false,
			fetchSuccess: false,
			root: null
		};
		const wrapper = shallow(<HomePage {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

});