import React from "react";
import {HashRouter} from "react-router";
import Store from "../shared/store";
import AuthWrapper from "../shared/containers/AuthWrapper";
import Layout from "./components/Layout";
import Loader from "./components/Loader";

export default <Store>
	<HashRouter>
		<AuthWrapper component={Layout} loader={Loader} />
	</HashRouter>
</Store>;
