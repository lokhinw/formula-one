import React from 'react';
import {StackNavigator} from 'react-navigation';
import DriverStandings from './DriverStandings';
import DriverCard from './DriverCard';

const DriverNavigator = StackNavigator({
  DriverStandings: {
    screen: DriverStandings
  },
  DriverCard: {
    screen: DriverCard
  }
}, {
  headerMode: 'none',
  cardStyle: {
    backgroundColor: 'white'
  }
});

export default DriverNavigator;
