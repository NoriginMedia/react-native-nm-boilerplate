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

import DetailsProgramContainer from "../shared/containers/DetailsProgram";
import DetailsProgram from "./components/DetailsProgram";

import DetailsMovieContainer from "../shared/containers/DetailsMovie";
import DetailsMovie from "./components/DetailsMovie";

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
	},
	{
		pattern: "/tv",
		exactly: true,
		container: WatchLiveContainer,
		view: WatchLive,
		secure: true
	},
	{
		pattern: "/guide",
		exactly: true,
		container: ProgramGuideContainer,
		view: ProgramGuide
	},
	{
		pattern: "/movies",
		exactly: true,
		container: MoviesContainer,
		view: Movies
	},
	{
		pattern: "/details/program",
		exactly: true,
		container: DetailsProgramContainer,
		view: DetailsProgram
	},
	{
		pattern: "/details/movie",
		exactly: true,
		container: DetailsMovieContainer,
		view: DetailsMovie
	}
];
