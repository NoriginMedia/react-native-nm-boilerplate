import React from "react";
import {BrowserRouter} from "react-router";
import Store from "../shared/store";
import createRoutes from "../shared/createRoutes";
import routes from "./routes";

export default <Store>
	<BrowserRouter basename="/app">
		<div>
			{createRoutes(routes)}
		</div>
	</BrowserRouter>
</Store>;
