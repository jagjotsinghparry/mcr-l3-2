import React from 'react';
import {AppRegistry, SafeAreaView} from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import configureStore from './reducers/index';

const RNRedux = () => (
    <Provider store={configureStore()}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
            <App />
        </SafeAreaView>
    </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
