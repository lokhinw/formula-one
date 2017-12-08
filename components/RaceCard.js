import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ListView,
  Image,
  Dimensions
} from 'react-native';

export default class RaceCard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    return fetch('https://bsbbycpjma.execute-api.eu-central-1.amazonaws.com/latest/f1/circuit/' + this.props.navigation.state.params.circuitId + '/details').then((response) => response.json()).then((responseJson) => {
      this.setState({
        isLoading: false,
        circuitInfo: responseJson
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
        flex: 1
      }}>
        <View style={{
          flex: 1,
          marginLeft: 10,
          marginTop: 10
        }}>
          <Image source={{
            uri: 'https://s3-eu-west-1.amazonaws.com/f1-storage/Cirius/' + this.state.circuitInfo.circuitId + '.png'
          }} style={styles.map}></Image>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row'
        }}>
          <View style={{
            flex: 1
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1
              }}>
                <Text>Number of Laps</Text>
              </View>
              <View style={{
                flex: 1
              }}>
                <Text>{this.state.circuitInfo.laps}</Text>
              </View>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1
              }}>
                <Text>First Grand Prix</Text>
              </View>
              <View style={{
                flex: 1
              }}>
                <Text>{this.state.circuitInfo.firstGP}</Text>
              </View>
            </View>
          </View>
          <View style={{
            flex: 1
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1
              }}>
                <Text>Circuit Length (km)</Text>
              </View>
              <View style={{
                flex: 1
              }}>
                <Text>{this.state.circuitInfo.length}</Text>
              </View>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1
              }}>
                <Text>Race Distance</Text>
              </View>
              <View style={{
                flex: 1
              }}>
                <Text>{this.state.circuitInfo.raceDistance}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: width - 20,
    height: ((width - 20) / 1.53293413)
  }
});
