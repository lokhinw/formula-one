import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator, ListView} from 'react-native';

export default class RaceSchedule extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    return fetch('http://ergast.com/api/f1/current.json').then((response) => response.json()).then((responseJson) => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.setState({
        isLoading: false,
        raceSchedule: ds.cloneWithRows(responseJson.MRData.RaceTable.Races)
      }, function() {});
    }).catch((error) => {
      console.error(error);
    });
  }
  render() {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
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
    return (<ListView dataSource={this.state.raceSchedule} renderRow={(rowData) => <View style={{}}>
      <Text>{rowData.raceName}</Text>
      <Text>{rowData.Circuit.Location.locality}</Text>
      <Text>{months[Number(rowData.date.substring(5,7)) - 1]} {rowData.date.substring(8, 10)}</Text>
      <Text>{rowData.time.substring(0, 5)}</Text>
    </View>}/>);
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
