import React from "react";
import {Match} from "react-router";
import FullAuthWrapper from "./containers/FullAuthWrapper";

export default (routeConfigs) => routeConfigs.map((routeConfig, index) => {
	const Container = routeConfig.container;
	const View = routeConfig.view;

	let MatchingComponent = (props) => <Container component={View} {...props} />;

	if (routeConfig.authProtected) {
		MatchingComponent = (props) => <FullAuthWrapper
			container={Container}
			component={View}
			{...props}
		/>;
	}

	const renderingProps = routeConfig.alwaysRender ?
		{children: MatchingComponent} :
		{component: MatchingComponent};

	return (
		<Match
			key={index}
			exactly={routeConfig.exactly === true}
			pattern={routeConfig.pattern}
			{...renderingProps}
		/>
	);
});
