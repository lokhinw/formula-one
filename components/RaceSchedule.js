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
    return (<ListView dataSource={this.state.raceSchedule} renderRow={(rowData) => <View style={{
      flex: 1,
      flexDirection: 'row',
      marginTop: 10
    }}>
      <View style={{
        flex: 1,
        marginLeft: 40,
      }}>
        <Text style={styles.dateTime}>{months[Number(rowData.date.substring(5, 7)) - 1]} {rowData.date.substring(8, 10)}</Text>
        <Text style={styles.dateTime}>{rowData.time.substring(0, 5)}</Text>
      </View>
      <View style={{
        flex: 3
      }}>
        <Text style={styles.raceName}>{rowData.raceName}</Text>
        <Text style={styles.raceLocation}>{rowData.Circuit.Location.locality}</Text>
      </View>
    </View>}/>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateTime: {
    color: '#d91e18',
    fontSize: 12
  },
  raceName: {
    color: '#12242b',
    fontSize: 14
  },
  raceLocation: {
    color: '#dbd9d9',
    fontSize: 12
  }
});
