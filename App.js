// @flow

//Regular imports
import React from 'react';
import { Text, View } from 'react-native';
//Redux imports, in order of use
import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//Apollo imports, in order of use
import { createNetworkInterface, ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
//Navigation imports, in order of use
import { TabNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
//Notification imports, in order of use
import { Notifications } from 'expo';
//Relative imports, in order of use
import HomeScreen from './home.screen';
import SettingsScreen from './settings.screen';
import ExploreScreen from './explore.screen';

//reducers
const reducers = client =>
  combineReducers({
    apollo: client.reducer(),
  });

//store
const networkInterface = createNetworkInterface({
  uri: 'http://178.79.186.237/graphql',
});

const apolloclient = new ApolloClient({ networkInterface });

const middlewares = [apolloclient.middleware(), thunk]; //add logger

const reducer = reducers(apolloclient);
const preloadedState = undefined;
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(reducer, preloadedState, enhancer);
//strange effects of the ingellisense, the 'preloadedstate' doesn't always show up.
//read this shit: http://redux.js.org/docs/basics/Store.html

const routeConfigMap = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: <FontAwesome name="home" size={30} />,
    },
  },
  Explore: {
    screen: ExploreScreen,
    navigationOptions: {
      tabBarIcon: <FontAwesome name="book" size={30} />,
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarIcon: <FontAwesome name="cog" size={30} />,
    },
  },
};

const drawConfig = {};
const Nav = TabNavigator(routeConfigMap, drawConfig);

export default class App extends React.Component<{}> {
  render() {
    return (
      <ApolloProvider store={store} client={apolloclient}>
        <Nav />
      </ApolloProvider>
    );
  }
}
/**
 * flow may have had a problem because I was flowing in the wrong dir! 
 * 
 * In the end... I did it. It took way too long however... This can be done in 10 minutes. 
 * It took me 2 hours...
 * 
 * It seems flow isn't quite stable right now but it sort of works. I included
 */
