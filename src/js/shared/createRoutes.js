import React from "react";
import {Match} from "react-router";
import FullAuthWrapper from "./containers/FullAuthWrapper";

// import createTransition from "./containers/Transition";

export default (routeConfigs) => routeConfigs.map((routeConfig, index) => {
	const Container = routeConfig.container;
	const View = routeConfig.view;

	let MatchingComponent = (props) => <Container component={View} {...props} />;

	if (routeConfig.secure) {
		MatchingComponent = (props) => <FullAuthWrapper
			container={Container}
			component={View}
			{...props}
		/>;
	}

	return (
		<Match
			key={index}
			exactly={routeConfig.exactly === true}
			pattern={routeConfig.pattern}
			component={MatchingComponent}
		/>
	);
});
