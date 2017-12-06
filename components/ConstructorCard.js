import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ListView,
  Image
} from 'react-native';

export default class ConstructorCard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    return fetch('http://ergast.com/api/f1/constructors/' + this.props.constructorId + '.json').then((response) => response.json()).then((responseJson) => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.setState({
        isLoading: false,
        constructorInfo: ds.cloneWithRows(responseJson.MRData.ConstructorTable.Constructors)
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
    return (<ListView dataSource={this.state.constructorInfo} renderRow={(rowData) => <View style={styles.driver}>
      <View style={{
        flex: 1,
        flexDirection: 'row'
      }}>
        <Image source={{
          uri: 'https://s3-eu-west-1.amazonaws.com/f1-storage/Cars/' + rowData.constructorId + '.jpg'
        }} style={styles.car}></Image>
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
  car: {
    width: 200,
    height: 50
  }
});
