import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from "./screens/Home";
import Album from "./screens/Album";

const Stack = createStackNavigator({
    Home: Home,
    Album: Album
});

export default createAppContainer(Stack);
