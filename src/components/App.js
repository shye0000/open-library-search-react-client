import React from 'react';
import { renderRoutes } from 'react-router-config';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import LocaleProvider from 'antd/lib/locale-provider';
import antI18n from 'antd/lib/locale-provider/en_US.js';
import './App.scss';
import '../styles/ant-theme.less';

class App extends React.Component {
	render() {
		const supportsHistory = typeof window !== 'undefined' && 'pushState' in window.history;
		return (
			<LocaleProvider locale={antI18n}>
				<Provider store={this.props.store}>
					<ConnectedRouter history={this.props.history} forceRefresh={!supportsHistory}>
						{renderRoutes(this.props.routes)}
					</ConnectedRouter>
				</Provider>
			</LocaleProvider>
		);
	}

}

export default App;


