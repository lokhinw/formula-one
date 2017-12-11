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
import ScalableText from 'react-native-text'

export default class ConstructorCard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    return fetch('https://bsbbycpjma.execute-api.eu-central-1.amazonaws.com/latest/f1/constructor/' + this.props.navigation.state.params.constructorId + '/details').then((response) => response.json()).then((responseJson) => {
      this.setState({
        isLoading: false,
        constructorInfo: responseJson
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
      <View style={styles.constructor}>
        <View>
          <Image source={{
            uri: 'https://s3-eu-west-1.amazonaws.com/f1-storage/Cars/' + this.props.navigation.state.params.constructorId + '.jpg'
          }} style={styles.car}></Image>
        </View>
        <View style={{
          flexDirection: 'row',
          marginHorizontal: 10
        }}>
          <View style={{
            flex: 1,
            marginRight: 10
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 4
              }}>
                <ScalableText>World Championship:</ScalableText>
              </View>
              <View style={{
                flex: 1
              }}>
                <ScalableText style={{
                  textAlign: 'right'
                }}>{this.state.constructorInfo.championship}</ScalableText>
              </View>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 36
            }}>
              <View style={{
                flex: 4
              }}>
                <ScalableText>Total Races:</ScalableText>
              </View>
              <View style={{
                flex: 1
              }}>
                <ScalableText style={{
                  textAlign: 'right'
                }}>{this.state.constructorInfo.races}</ScalableText>
              </View>
            </View>
          </View>
          <View style={{
            flex: 1,
            marginLeft: 10
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              marginBottom: 36
            }}>
              <View style={{
                flex: 4
              }}>
                <ScalableText>Total Wins:</ScalableText>
              </View>
              <View style={{
                flex: 1
              }}>
                <ScalableText style={{
                  textAlign: 'right'
                }}>{this.state.constructorInfo.wins}</ScalableText>
              </View>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 4
              }}>
                <ScalableText>Pole Position:</ScalableText>
              </View>
              <View style={{
                flex: 1
              }}>
                <ScalableText style={{
                  textAlign: 'right'
                }}>{this.state.constructorInfo.polePosition}</ScalableText>
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
  constructor: {
    flex: 1
  },
  car: {
    width: width,
    height: ((width) / 3.36956522)
  }
});
