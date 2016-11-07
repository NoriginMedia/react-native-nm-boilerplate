import HomeContainer from "../shared/containers/Home";
import Home from "./components/Home";

import LoginContainer from "../shared/containers/Login";
import Login from "./components/Login";

import WatchLiveContainer from "../shared/containers/WatchLive";
import WatchLive from "./components/WatchLive";

import ProgramGuideContainer from "../shared/containers/ProgramGuide";
import ProgramGuide from "./components/ProgramGuide";

import MoviesContainer from "../shared/containers/Movies";
import Movies from "./components/Movies";

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
		view: Home,
		alwaysRender: true
	},
	{
		pattern: "/tv",
		exactly: true,
		container: WatchLiveContainer,
		view: WatchLive,
		alwaysRender: true
	},
	{
		pattern: "/guide",
		exactly: true,
		container: ProgramGuideContainer,
		view: ProgramGuide,
		alwaysRender: true
	},
	{
		pattern: "/movies",
		exactly: true,
		container: MoviesContainer,
		view: Movies,
		alwaysRender: true
	}
];
