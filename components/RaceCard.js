import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ListView,
  Image
} from 'react-native';

export default class RaceCard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    // this.props.navigation.state.params.circuitId
    return fetch('http://ergast.com/api/f1/circuits/' + 'sochi' + '.json').then((response) => response.json()).then((responseJson) => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.setState({
        isLoading: false,
        circuitInfo: ds.cloneWithRows(responseJson.MRData.CircuitTable.Circuits)
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
    return (<ListView dataSource={this.state.circuitInfo} renderRow={(rowData) => <View style={{}}>
        <View style={{
          flex: 1,
          marginLeft: 10,
          marginTop: 10
        }}>
          <Image source={{
            uri: 'https://s3-eu-west-1.amazonaws.com/f1-storage/Cirius/' + rowData.circuitId + '.png'
          }} style={{height: 167, width: 256}}></Image>
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
  }
});
