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
				searched: true,
			};
		}
		case SEARCHING: {
			return {
				...state,
				searching: true,
			};
		}
		case SEARCH_SUCCESS: {
			const {page, results, params} = action;
			return {
				...state,
				searching: false,
				searchSuccess: true,
				results,
				page,
				params,
			};
		}
		case SEARCH_FAIL: {
			return {
				...state,
				searching: false,
				searchSuccess: false,
			};
		}

		default: {
			return state;
		}
	}
};

reducers.reducer = 'search';

export default reducers;