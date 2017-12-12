import React from 'react';
import {DrawerNavigator} from 'react-navigation';

import MainNavigator from './MainNavigator'
import RaceNavigator from './RaceNavigator'

const SideNavigator = DrawerNavigator({
  MainNavigator: {
    screen: MainNavigator,
     navigationOptions: { title: 'Standings' }
  },
  RaceNavigator: {
    screen: RaceNavigator,
     navigationOptions: { title: 'Schedule' }
  }
}, {

});

export default SideNavigator;
