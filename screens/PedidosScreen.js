import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  View, FlatList,ActivityIndicator,Alert,
  RefreshControl,TouchableWithoutFeedback
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { ListItem } from 'react-native-elements'
import { Constants } from 'expo';


export default class PedidosScreen extends React.Component {

  constructor(props){
    super(props);
    this.state={isLoading: true,dataSource: [],refreshing:false}
  }1

  componentDidMount(){
    /*this.subs = [
      this.props.navigation.addListener('didFocus', () => this.isFocused()),
    ];*/
    this.isFocused();
  }  

  _onRefresh = () => {
    this.isFocused();
  }

  isFocused = async () => {
    
    this.setState({
      isLoading: true,
      dataSource: [],
    });
    this.setState({
      isLoading: false,
      dataSource: [],
    });
  }

/*  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }*/
  
  logout = async () => {
    await AsyncStorage.removeItem('userToken')
    this.props.navigation.navigate('Auth');
  }

  static navigationOptions = {
    header: null,
  };

  render() {
   
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.logout()}>
          <View style={styles.logout}>
            <Text style={styles.logout}>SALIR</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:60,
    backgroundColor: '#fff',
  },
  logout:{
    textAlign: "center"
  }
});
