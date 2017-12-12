import React from 'react';
import {TabNavigator} from 'react-navigation';
import DriverNavigator from './DriverNavigator';
import ConstructorNavigator from './ConstructorNavigator';

const MainNavigator = TabNavigator({
  DriverNavigator: {
    screen: DriverNavigator,
     navigationOptions: { title: 'Drivers' }
  },
  ConstructorNavigator: {
    screen: ConstructorNavigator,
     navigationOptions: { title: 'Constructors' }
  }
}, {
  tabBarOptions: {
    activeTintColor: '#d91e18',
    indicatorStyle: {
      backgroundColor: '#d91e18'
    },
    style: {
      backgroundColor: '#181f26',
      paddingTop: 24
    }
  }
});

export default MainNavigator;
