import React from "react";
import createRoutes from "../../shared/createRoutes";
import routes from "../routes";

const Layout = () => <div>
	{createRoutes(routes)}
</div>;

export default Layout;
