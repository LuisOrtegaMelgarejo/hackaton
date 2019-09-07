import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PedidosScreen from '../screens/PedidosScreen';
import ListScreen from '../screens/ListScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  ListDetected: ListScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Principal',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const PedidosStack = createStackNavigator({
  Home: PedidosScreen
});

PedidosStack.navigationOptions = {
  tabBarLabel: 'Principal',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  PedidosStack
});
