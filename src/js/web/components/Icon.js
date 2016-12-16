import React, {PropTypes} from "react";

const iconsMap = {
	"account-box": 59473,
	"exit-to-app": 59513,
	"play-arrow": 57399,
	"replay": 57410,
	"play-circle-filled": 57400,
	"info": 59534,
	"keyboard-arrow-left": 58132,
	"home": 59530,
	"tv": 58163,
	"view-list": 59631,
	"theaters": 59610
};

const styles = {
	icon: {
		fontFamily: "Material-Icons"
	}
};

const Icon = (props) => <div>
	{iconsMap[props.name] ? <div
		style={{
			...styles.icon,
			...props.style || {}
		}}
	>{String.fromCharCode(iconsMap[props.name])}</div> : null}
</div>;

Icon.propTypes = {
	name: PropTypes.oneOf(Object.keys(iconsMap)),
	style: PropTypes.object
};

export default Icon;
