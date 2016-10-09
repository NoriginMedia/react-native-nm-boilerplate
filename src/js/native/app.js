import React from "react";
import {MemoryRouter} from "react-router";
import Store from "../shared/store";
import Layout from "./components/Layout";
import AuthWrapper from "../shared/containers/AuthWrapper";

export default () => <Store>
	<MemoryRouter>
		<AuthWrapper component={Layout} />
	</MemoryRouter>
</Store>;
