import reducers from './reducers';
import {
	SEARCHED,
	SEARCHING,
	SEARCH_SUCCESS,
	SEARCH_FAIL
} from './actions';


describe('search reducers', () => {
	it('SEARCHED : new state should has searched "true"', () => {
		const oldState = {
			searched: false,
			searching: false,
			searchSuccess: true,
			results: {}
		};
		expect(reducers(oldState, {type: SEARCHED})).toEqual({
			...oldState,
			searched: true
		});
	});
	it('SEARCHING : new state should has searching "true" and page, queryParam and searchValue', () => {
		const oldState = {
			searching: false,
			searchSuccess: true,
			results: {},
		};
		expect(reducers(oldState, {
			type: SEARCHING,
			page: 1,
			pageSize: 20,
			queryParam: 'q',
			searchValue: 'test'
		})).toEqual({
			...oldState,
			searching: true,
			page: 1,
			pageSize: 20,
			queryParam: 'q',
			searchValue: 'test'
		});
	});
	it('SEARCH_SUCCESS : new state should has searching "false", searchSuccess "true" and new results', () => {
		const oldState = {
			searching: true,
			searchSuccess: false,
			results: null
		};
		expect(reducers(oldState, {
			type: SEARCH_SUCCESS,
			results: {},
		})).toEqual({
			...oldState,
			searching: false,
			searchSuccess: true,
			results: {},
		});
	});
	it('SEARCH_FAIL : new state should has searching "false", searchingSuccess "false"', () => {
		const oldState = {
			searching: true,
			searchSuccess: true,
			results: {}
		};
		expect(reducers(oldState, {
			type: SEARCH_FAIL,
			results: {}
		})).toEqual({
			...oldState,
			searching: false,
			searchSuccess: false,
		});
	});
});