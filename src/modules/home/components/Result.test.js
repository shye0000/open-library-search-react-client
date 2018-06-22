import React from 'react';
import Result from './Result';
import { shallow } from 'enzyme';

describe('Result', () => {

	const props = {
		result: {
			title: 'title',
			author_name: ['author_name_1', 'author_name_2'],
			first_publish_year: 2018,
			cover_i: 'COVER_I',
			key: 'key'
		}
	};

	it('render correctly', () => {
		const wrapper = shallow(<Result {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

});