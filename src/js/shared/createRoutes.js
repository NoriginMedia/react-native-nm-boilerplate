import React from "react";
import {Match} from "react-router";

export default (routeConfigs) => routeConfigs.map((routeConfig, index) => {
	const Container = routeConfig.container;
	const View = routeConfig.view;

	return (
		<Match
			key={index}
			exact={routeConfig.exact === true}
			pattern={routeConfig.pattern}
			component={() => <Container>
				<View />
			</Container>}
		/>
	);
});
