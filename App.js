import React from 'react';
import MainNavigator from './components/MainNavigator';

export default class App extends React.Component {
  constructor(props) {
    super();
  }
  componentDidMount() {}
  render() {
    return (
      <MainNavigator></MainNavigator>
    );
  }
}
