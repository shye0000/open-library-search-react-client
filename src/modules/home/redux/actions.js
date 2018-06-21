import parseObjToQueryString from '../../../utils/parseObjToQueryString';

export const SEARCHING = 'SEARCHING';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAIL = 'SEARCH_FAIL';
export const SEARCHED = 'SEARCHED';

export const search = (params, page = 1, pageSize = 20) => {
	return (dispatch) => {
		dispatch(searched());
		dispatch(searching(page, params, pageSize));
		let query = {
			page,
			limit: pageSize,
		};
		if (params) {
			query = {
				...query,
				[params.queryParam]: params.searchValue
			};
		}
		const queryString = parseObjToQueryString(query);
		return fetch(`https://openlibrary.org/search.json${queryString ? `?${queryString}` : ''}`)
			.then(resp => resp.json())
			.then((results) => dispatch(searchSuccess(results)))
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

const searching = (page, params, pageSize) => {
	return {
		type: SEARCHING,
		page,
		pageSize,
		params,
	};
};

const searchSuccess = (results) => {
	return {
		type: SEARCH_SUCCESS,
		results,
	};
};

const searchFail = () => {
	return {
		type: SEARCH_FAIL
	};
};