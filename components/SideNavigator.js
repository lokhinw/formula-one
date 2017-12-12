import React from 'react';
import {DrawerNavigator} from 'react-navigation';
import MainNavigator from './MainNavigator'
import RaceNavigator from './RaceNavigator'

const SideNavigator = DrawerNavigator({
  MainNavigator: {
    screen: MainNavigator,
    navigationOptions: {
      title: 'Standings'
    }
  },
  RaceNavigator: {
    screen: RaceNavigator,
    navigationOptions: {
      title: 'Schedule'
    }
  }
}, {
  drawerBackgroundColor: '#25303a',
  contentOptions: {
    activeTintColor: '#d91e18',
    activeBackgroundColor: '#25303a',
    inactiveBackgroundColor: '#25303a',
    inactiveTintColor: '#ffffff',
    itemsContainerStyle: {
      paddingTop: 24
    },
    itemStyle: {
      marginVertical: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#3e5060'
    }
  }
});

export default SideNavigator;
