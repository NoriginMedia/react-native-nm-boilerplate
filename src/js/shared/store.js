import React from "react";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import reducer from "./reducer";

const store = createStore(reducer, applyMiddleware(thunk, createLogger()));

export default (props) => <Provider store={store}>{props.children}</Provider>;
