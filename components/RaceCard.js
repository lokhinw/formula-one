import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ListView,
  Image,
  Dimensions
} from 'react-native';
import ScalableText from 'react-native-text';

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
          flexDirection: 'row',
          marginHorizontal: 10
        }}>
          <View style={{
            flex: 1, marginRight: 10
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1
              }}>
                <ScalableText>Number of Laps</ScalableText>
              </View>
              <View style={{
                flex: 1
              }}>
                <ScalableText style={{textAlign: 'right', fontSize: 24}}>{this.state.circuitInfo.laps}</ScalableText>
              </View>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1
              }}>
                <ScalableText>First Grand Prix</ScalableText>
              </View>
              <View style={{
                flex: 1
              }}>
                <ScalableText style={{textAlign: 'right', fontSize: 24}}>{this.state.circuitInfo.firstGP}</ScalableText>
              </View>
            </View>
          </View>
          <View style={{
            flex: 1,
            marginLeft: 10
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1
              }}>
                <ScalableText>Circuit Length (km)</ScalableText>
              </View>
              <View style={{
                flex: 1
              }}>
                <ScalableText style={{textAlign:'right', fontSize: 24}}>{this.state.circuitInfo.length}</ScalableText>
              </View>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1
              }}>
                <ScalableText>Race Distance</ScalableText>
              </View>
              <View style={{
                flex: 2
              }}>
                <ScalableText style={{textAlign:'right', fontSize: 24}}>{this.state.circuitInfo.raceDistance}</ScalableText>
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
