import HomeContainer from "../shared/containers/Home";
import Home from "./components/Home";

export default [
	{
		pattern: "/",
		exact: true,
		container: HomeContainer,
		view: Home
	}
];
