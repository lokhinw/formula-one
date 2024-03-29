import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ListView,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import ScalableText from 'react-native-text';
import {StackNavigator} from 'react-navigation';

export default class ConstructorStandings extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    return fetch('http://ergast.com/api/f1/current/constructorStandings.json').then((response) => response.json()).then((responseJson) => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.setState({
        isLoading: false,
        constructorStandings: ds.cloneWithRows(responseJson.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)
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
      <View>
        <View style={{
          flexDirection: 'row',
          backgroundColor: '#25303a',
          paddingLeft: 20,
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
          }}>Constructor</ScalableText>
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
        <ListView dataSource={this.state.constructorStandings} renderRow={(rowData) => <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ConstructorCard', {constructorId: rowData.Constructor.constructorId})}>
          <View style={styles.constructor}>
            <View style={styles.constructorInfo}>
              <ScalableText style={styles.constructorPosition}>{rowData.position}</ScalableText>
              <ScalableText style={styles.constructorName}>{rowData.Constructor.name}</ScalableText>
            </View>
            <View style={styles.constructorStats}>
              <ScalableText style={styles.wins}>{rowData.wins}</ScalableText>
              <ScalableText style={styles.points}>{rowData.points}</ScalableText>
            </View>
          </View>
        </TouchableWithoutFeedback>}/>
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
  },
  constructor: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dbd9d9'
  },
  constructorInfo: {
    flex: 1,
    flexDirection: 'row'
  },
  constructorStats: {
    flex: 1,
    flexDirection: 'row'
  },
  constructorPosition: {
    flex: 1,
    color: '#d91e18',
    fontWeight: 'bold',
    marginLeft: 20
  },
  constructorName: {
    flex: 3,
    fontSize: 14,
    color: '#12242b'
  },
  wins: {
    color: '#12242b',
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    marginLeft: 40,
    marginRight: 10
  },
  points: {
    color: '#d91e18',
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    marginRight: 10
  }
});
