import React from 'react';
import {View, Text} from 'react-native';
import {StackNavigator} from 'react-navigation';

import RaceSchedule from './RaceSchedule';
import RaceCard from './RaceCard';

const RaceNavigator = StackNavigator({
  RaceSchedule: {
    screen: RaceSchedule
  },
  RaceCard: {
    screen: RaceCard
  }
}, {
  headerMode: 'none',
  cardStyle: {
    backgroundColor: 'white',
    paddingTop: 24
  }
});

export default RaceNavigator;
