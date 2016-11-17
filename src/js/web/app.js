import React from "react";
import {HashRouter} from "react-router";
import Store from "../shared/store";
import AuthWrapper from "../shared/containers/AuthWrapper";
import Layout from "./components/Layout";
import Loader from "./components/Loader";

/* eslint-disable no-underscore-dangle */
export default <Store composer={window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__}>
	<HashRouter>
		<AuthWrapper component={Layout} loader={Loader} />
	</HashRouter>
</Store>;
