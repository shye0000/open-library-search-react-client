import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {search} from './actions';
import {SEARCH_SUCCESS, SEARCHING, SEARCHED} from './actions';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('search actions', () => {
	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	it('creates SEARCH_SUCCESS when search has been successfully done', () => {

		const expectedResults = {test: 'data'};

		fetchMock.getOnce('https://openlibrary.org/search.json?page=1&limit=20', {
			body: expectedResults,
			headers: { 'content-type': 'application/json' }
		});

		const expectedActions = [
			{ type: SEARCHED },
			{ type: SEARCHING,
				page: 1,
				queryParam: 'q',
				searchValue: undefined,
				pageSize: 20,
			},
			{ type: SEARCH_SUCCESS,
				results: expectedResults,
			}
		];
		const store = mockStore({ root: [] });
		return store.dispatch(search()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

});