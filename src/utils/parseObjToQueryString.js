const parseObjToQueryString = (params) => {
	return Object.keys(params).map(key => key + '=' + params[key]).join('&');
};

export default parseObjToQueryString;