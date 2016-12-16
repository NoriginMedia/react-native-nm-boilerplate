import React from "react";
import createRoutes from "../../shared/createRoutes";
import routes from "../routes";
import colors from "../../shared/styles/colors";
import {fullScreen, verticalFlex} from "../styles/layout";

const styles = {
	root: {
		...fullScreen,
		...verticalFlex,
		backgroundColor: colors.background
	}
};

const Layout = () => <div style={styles.root}>
	{createRoutes(routes)}
</div>;

export default Layout;
