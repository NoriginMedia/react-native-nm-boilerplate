import React from "react";
import {BrowserRouter} from "react-router";
import Store from "../shared/store";
import AuthWrapper from "../shared/containers/AuthWrapper";
import Layout from "./components/Layout";

export default <Store>
	<BrowserRouter basename="/app">
		<AuthWrapper component={Layout} />
	</BrowserRouter>
</Store>;
