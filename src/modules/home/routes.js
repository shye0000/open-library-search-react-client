import asyncRoute from '../../utils/CodeSplitting/asyncRoute/asyncRoute';

const HomePage = asyncRoute(
	() => import(
		/* webpackChunkName: "homePage" */
		'./components/HomePage'),
	() => import(
		/* webpackChunkName: "searchReducers" */
		'./redux/reducers')
);

const routes = [{
	path: '/',
	exact: true,
	component: HomePage
}];

export default routes;