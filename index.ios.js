import React from "react";
import {AppRegistry} from "react-native";
import NativeApp from "./src/js/native/app";
import configureStore from "./src/js/shared/configureStore";

/* eslint-disable no-underscore-dangle */
// https://github.com/jhen0409/react-native-debugger
const composer = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = configureStore(composer);

AppRegistry.registerComponent("reactNativeNmBoilerplate", () => () => <NativeApp store={store} />);
