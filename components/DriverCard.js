import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ListView,
  Image
} from 'react-native';

export default class DriverCard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    return fetch('http://ergast.com/api/f1/drivers/' + this.props.driverId + '.json').then((response) => response.json()).then((responseJson) => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.setState({
        isLoading: false,
        driverInfo: ds.cloneWithRows(responseJson.MRData.DriverTable.Drivers)
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
    return (<ListView dataSource={this.state.driverInfo} renderRow={(rowData) => <View style={styles.driver}>
      <View style={{
        flex: 1,
        flexDirection: 'row'
      }}>
        <View style={{
          flex: 1,
          marginLeft: 10,
          marginTop: 10
        }}>
          <Image source={{
            uri: 'https://s3-eu-west-1.amazonaws.com/f1-storage/Drivers/' + rowData.code + '.jpg'
          }} style={styles.avatar}></Image>
        </View>
        <View style={{
          flex: 1,
          marginLeft: 10
        }}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            marginRight: 10,
            marginTop: 10
          }}>
            <View>
              <Text style={styles.permanentNumber}>{rowData.permanentNumber}</Text>
            </View>
            <View style={{
              flex: 1
            }}>
              <Text style={{}}>{rowData.givenName}</Text>
              <Text style={{
                lineHeight: 10
              }}>{rowData.familyName}</Text>
            </View>
            <Image source={{
              uri: 'https://s3-eu-west-1.amazonaws.com/f1-storage/Flags/' + rowData.nationality + '.png'
            }} style={styles.flag}></Image>
          </View>
          <View style={{
            flexDirection: 'row'
          }}>
            <Text style={{color: '#afbbce'}}>Nationality: </Text>
            <Text>{rowData.nationality}</Text>
          </View>
          <View style={{
            flexDirection: 'row'
          }}>
            <Text style={{color: '#afbbce'}}>Date Of Birth: </Text>
            <Text>{(rowData.dateOfBirth).substring(8, 11)}/{(rowData.dateOfBirth).substring(5, 7)}/{(rowData.dateOfBirth).substring(0, 4)}</Text>
          </View>
          <View style={{
            flex: 1,
            alignItems: 'center'
          }}>
            <Image source={{
              uri: 'https://s3-eu-west-1.amazonaws.com/f1-storage/Helmet/' + rowData.code + '.png'
            }} style={styles.helmet}></Image>
          </View>
        </View>
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
  driver: {
    flex: 1
  },
  avatar: {
    flex: 1
  },
  permanentNumber: {
    fontSize: 40,
    lineHeight: 36,
    color: '#d91e18',
    marginRight: 4,
    marginBottom: 20
  },
  name: {
    fontSize: 14,
    color: '#12242b'
  },
  helmet: {
    justifyContent: 'center',
    height: 60,
    width: 90,
    marginTop: 10
  },
  flag: {
    width: 16,
    height: 11
  }
});
