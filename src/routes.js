import Layout from './components/Layout';
import NotFoundRoutes from './modules/notFound/routes';
import HomeRoutes from './modules/home/routes';

const moduleRoutes = [
	...HomeRoutes,
	// todo routes to be completed with other modules
];

const routes = [{
	path: '/',
	component: Layout,
	routes: [
		...moduleRoutes,
		...NotFoundRoutes
	]
}];

export default routes;