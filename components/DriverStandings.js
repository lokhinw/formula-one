import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ListView,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import ScalableText from 'react-native-text';
import {StackNavigator} from 'react-navigation';

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
    var {navigate} = this.props.navigation;
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
      <View style={{paddingBottom: 20}}>
        <View style={{
          flexDirection: 'row',
          backgroundColor: '#25303a',
          paddingLeft: 30,
          paddingRight: 10
        }}>
          <ScalableText style={{
            color: '#fff',
            height: 22,
            lineHeight: 20,
            marginRight: 32
          }}>#</ScalableText>
          <ScalableText style={{
            color: '#fff',
            height: 22,
            lineHeight: 20,
            flex: 1
          }}>Driver</ScalableText>
          <ScalableText style={{
            color: '#fff',
            height: 22,
            lineHeight: 20,
            marginRight: 20
          }}>Wins</ScalableText>
          <ScalableText style={{
            color: '#fff',
            height: 22,
            lineHeight: 20,
            textAlign: 'right'
          }}>Points</ScalableText>
        </View>

        <ListView dataSource={this.state.driverStandings} renderRow={(rowData) => <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('DriverCard', {driverId: rowData.Driver.driverId})}>
          <View style={styles.driver}>
            <View style={styles.avatarContainer}>
              <Image source={{
                uri: 'https://s3-eu-west-1.amazonaws.com/f1-storage/Drivers/' + rowData.Driver.code + '.jpg'
              }} style={styles.avatar}></Image>
            </View>
            <View style={styles.driverInfo}>
              <View style={{
                flex: 1,
                flexDirection: 'row'
              }}>
                <ScalableText style={styles.permanentNumber}>{rowData.Driver.permanentNumber} </ScalableText>
                <ScalableText style={styles.driverName}>{rowData.Driver.givenName} {rowData.Driver.familyName}</ScalableText>
              </View>
              <View style={{
                flex: 1
              }}>
                <ScalableText style={styles.constructorName}>{rowData.Constructors[0].name}</ScalableText>
              </View>
            </View>
            <View style={styles.driverStats}>
              <ScalableText style={styles.wins}>{rowData.wins}</ScalableText>
              <ScalableText style={styles.points}>{rowData.points}</ScalableText>
            </View>
          </View>
        </TouchableWithoutFeedback>}/></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  driver: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dbd9d9'
  },
  driverName: {
    fontSize: 14,
    color: '#12242b'
  },
  driverInfo: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  driverStats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  permanentNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d91e18',
    marginRight: 4
  },
  constructorName: {
    fontSize: 12,
    color: '#dbd9d9'
  },
  wins: {
    color: '#12242b',
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    marginLeft: 20,
    marginRight: 10
  },
  points: {
    color: '#d91e18',
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    marginRight: 10
  },
  infoBox: {
    marginLeft: 10,
    marginRight: 10
  },
  avatarContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
});
