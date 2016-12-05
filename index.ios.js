import React from "react";
import {AppRegistry} from "react-native";
import NativeApp from "./src/js/native/app";
import configureStore from "./src/js/native/configureStore";

const store = configureStore();

AppRegistry.registerComponent("reactNativeNmBoilerplate", () => () => <NativeApp store={store} />);
