import React from "react";
import createRoutes from "../../shared/createRoutes";
import routes from "../routes";
import TopBar from "./TopBar";

const Layout = () => <div>
	<TopBar />
	{createRoutes(routes)}
</div>;

export default Layout;
