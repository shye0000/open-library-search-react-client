import parseObjToQueryString from '../../../utils/parseObjToQueryString';

export const SEARCHING = 'SEARCHING';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAIL = 'SEARCH_FAIL';
export const SEARCHED = 'SEARCHED';

export const search = (params, page = 1) => {
	return (dispatch) => {
		dispatch(searched());
		dispatch(searching());
		let query = {page: page};
		if (params) {
			query = {
				...query,
				[params.queryParam]: params.searchValue
			};
		}
		const queryString = parseObjToQueryString(query);
		return fetch(`https://openlibrary.org/search.json${queryString ? `?${queryString}` : ''}`)
			.then(resp => resp.json())
			.then((results) => dispatch(searchSuccess(results, page, params)))
			.catch(error => {
				dispatch(searchFail());
				throw(error);
			});
	};
};

const searched = () => {
	return {
		type: SEARCHED
	};
};

const searching = () => {
	return {
		type: SEARCHING
	};
};

const searchSuccess = (results, page, params) => {
	return {
		type: SEARCH_SUCCESS,
		results,
		page,
		params
	};
};

const searchFail = () => {
	return {
		type: SEARCH_FAIL
	};
};