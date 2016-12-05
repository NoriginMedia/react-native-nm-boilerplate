import React, {PropTypes} from "react";
import {HashRouter} from "react-router";
import {Provider} from "react-redux";
import AuthWrapper from "../shared/containers/AuthWrapper";
import Layout from "./components/Layout";
import Loader from "./components/Loader";

const WebApp = (props) => <Provider store={props.store}>
	<HashRouter>
		<AuthWrapper component={Layout} loader={Loader} />
	</HashRouter>
</Provider>;

WebApp.propTypes = {
	store: PropTypes.object.isRequired
};

export default WebApp;
