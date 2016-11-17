import React from "react";
import {MemoryRouter} from "react-router";
import Store from "../shared/store";
import Layout from "./components/Layout";
import Loader from "./components/Loader";
import AuthWrapper from "../shared/containers/AuthWrapper";

/* eslint-disable no-underscore-dangle */
export default () => <Store composer={global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__}>
	<MemoryRouter>
		<AuthWrapper component={Layout} loader={Loader} />
	</MemoryRouter>
</Store>;
