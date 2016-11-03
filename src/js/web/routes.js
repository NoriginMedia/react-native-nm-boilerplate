import HomeContainer from "../shared/containers/Home";
import Home from "./components/Home";

import LoginContainer from "../shared/containers/Login";
import Login from "./components/Login";

export default [
	{
		pattern: "/login",
		exactly: true,
		container: LoginContainer,
		view: Login
	},
	{
		pattern: "/",
		exactly: true,
		container: HomeContainer,
		view: Home
	}
];
