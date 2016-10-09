import React from "react";
import {Match} from "react-router";

export default (routeConfigs) => routeConfigs.map((routeConfig, index) => {
	const Container = routeConfig.container;

	return (
		<Match
			key={index}
			exact={routeConfig.exact === true}
			pattern={routeConfig.pattern}
			component={(props) => <Container component={routeConfig.view} {...props} />}
		/>
	);
});
