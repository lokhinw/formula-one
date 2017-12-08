import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import DriverStandings from './DriverStandings';
import ConstructorStandings from './ConstructorStandings';

// TEMPORARY
import DriverCard from './DriverCard';
import RaceCard from './RaceCard';
import ConstructorCard from './ConstructorCard';
import RaceSchedule from './RaceSchedule';
import DriverNavigator from './DriverNavigator';
import RaceNavigator from './RaceNavigator';
import ConstructorNavigator from './ConstructorNavigator';

const FirstRoute = () => <View style={[
  styles.container, {
    backgroundColor: '#fff'
  }
]}>
  {/* <DriverStandings></DriverStandings> */}
  {/* <DriverNavigator></DriverNavigator> */}
  {/* <RaceSchedule></RaceSchedule> */}
  {/* <RaceCard></RaceCard> */}
  <RaceNavigator></RaceNavigator>
  {/* <DriverCard driverId='hamilton'></DriverCard> */}
  {/* <ConstructorCard constructorId='ferrari'></ConstructorCard> */}
</View>;
const SecondRoute = () => <View style={[
  styles.container, {
    backgroundColor: '#fff'
  }
]}>
  {/* <ConstructorStandings></ConstructorStandings> */}
  <ConstructorNavigator></ConstructorNavigator>
</View>;

export default class TabView extends PureComponent {
  state = {
    index: 0,
    routes: [
      {
        key: '1',
        title: 'Driver Standings'
      }, {
        key: '2',
        title: 'Team Standings'
      }
    ]
  };

  _handleIndexChange = index => this.setState({index});

  _renderHeader = props => <TabBar {...props}/>;

  _renderScene = SceneMap({'1': FirstRoute, '2': SecondRoute});

  render() {
    return (<TabViewAnimated style={styles.container} navigationState={this.state} renderScene={this._renderScene} renderHeader={this._renderHeader} onIndexChange={this._handleIndexChange}/>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
