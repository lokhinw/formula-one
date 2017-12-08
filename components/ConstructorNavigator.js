import React from 'react';
import {View, Text} from 'react-native';
import {StackNavigator} from 'react-navigation';

import ConstructorStandings from './ConstructorStandings';
import ConstructorCard from './ConstructorCard';

const ConstructorNavigator = StackNavigator({
  ConstructorStandings: {
    screen: ConstructorStandings
  },
  ConstructorCard: {
    screen: ConstructorCard
  }
}, {
  headerMode: 'none',
  cardStyle: {
    backgroundColor: 'white'
  }
});

export default ConstructorNavigator;
