import asyncRoute from '../../utils/CodeSplitting/asyncRoute/asyncRoute';

const HomePage = asyncRoute(
	() => import(
		/* webpackChunkName: "homePage" */
		'./components/HomePage'),
	() => import(
		/* webpackChunkName: "rootReducers" */
		'./redux/reducers')
);

const routes = [{
	path: '/',
	exact: true,
	component: HomePage
}];

export default routes;