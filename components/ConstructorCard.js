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
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.setState({
        isLoading: false,
        constructorInfo: ds.cloneWithRows(responseJson)
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
    return ( <View style={styles.driver}>
      <View style={{
        flex: 1,
        flexDirection: 'row'
      }}>
        <Image source={{
          uri: 'https://s3-eu-west-1.amazonaws.com/f1-storage/Cars/' + this.props.navigation.state.params.constructorId + '.jpg'
        }} style={styles.car}></Image>
      </View>
      <ScalableText>{this.state.constructorInfo.races}</ScalableText>

    </View>);
  }
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  car: {
    width: width,
    height: ((width) / 3.36956522)
  }
});
