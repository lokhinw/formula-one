import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator, ListView} from 'react-native';

export default class DriverStandings extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    return fetch('http://ergast.com/api/f1/current/driverStandings.json').then((response) => response.json()).then((responseJson) => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.setState({
        isLoading: false,
        driverStandings: ds.cloneWithRows(responseJson.MRData.StandingsTable.StandingsLists[0].DriverStandings)
      }, function() {});
    }).catch((error) => {
      console.error(error);
    });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{
          flex: 1,
          paddingTop: 20
        }}>
          <ActivityIndicator/>
        </View>
      );
    }
    return (
      <View style={{
        flex: 1,
        paddingTop: 20
      }}>
        <ListView dataSource={this.state.driverStandings} renderRow={(rowData) => <Text>{rowData.Driver.givenName} {rowData.Driver.familyName}, {rowData.Constructors[0].name}, {rowData.wins}
          wins, {rowData.points}
          points</Text>}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
