import React, {PropTypes} from "react";
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import Layout from "./components/Layout";
import Loader from "./components/Loader";
import AuthWrapper from "../shared/containers/AuthWrapper";

const NativeApp = (props) => <Provider store={props.store}>
	<MemoryRouter>
		<AuthWrapper component={Layout} loader={Loader} />
	</MemoryRouter>
</Provider>;

NativeApp.propTypes = {
	store: PropTypes.object.isRequired
};

export default NativeApp;
