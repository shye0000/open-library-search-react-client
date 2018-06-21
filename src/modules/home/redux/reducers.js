import {SEARCHING, SEARCH_SUCCESS, SEARCH_FAIL, SEARCHED} from './actions';

const initialState = {
	searched: false,
	searching: false,
	searchSuccess: false,
	results: null
};

const reducers = (state = initialState, action) => {
	switch (action.type) {
		case SEARCHED: {
			return {
				...state,
				searched: true
			};
		}
		case SEARCHING: {
			return {
				...state,
				searching: true
			};
		}
		case SEARCH_SUCCESS: {
			return {
				...state,
				searching: false,
				searchSuccess: true,
				results: action.results
			};
		}
		case SEARCH_FAIL: {
			return {
				...state,
				searching: false,
				searchSuccess: false
			};
		}

		default: {
			return state;
		}
	}
};

reducers.reducer = 'search';

export default reducers;