import React, {Children} from "react";

export default (props) => React.cloneElement(Children.only(props.children), props);
