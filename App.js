import React from 'react';
import {View, StatusBar} from 'react-native';
import MainNavigator from './components/MainNavigator';
import SideNavigator from './components/SideNavigator';

export default class App extends React.Component {
  constructor(props) {
    super();
  }
  componentDidMount() {}
  render() {
    return (
      <SideNavigator></SideNavigator>
    );
  }
}
