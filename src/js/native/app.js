import React from "react";
import {MemoryRouter} from "react-router";
import Store from "../shared/store";
import Layout from "./components/Layout";
import Loader from "./components/Loader";
import AuthWrapper from "../shared/containers/AuthWrapper";

export default () => <Store>
	<MemoryRouter>
		<AuthWrapper component={Layout} loader={Loader} />
	</MemoryRouter>
</Store>;
