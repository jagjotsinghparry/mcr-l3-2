import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from "./screens/Home";

const Stack = createStackNavigator({
    Home: Home
});

export default createAppContainer(Stack);
