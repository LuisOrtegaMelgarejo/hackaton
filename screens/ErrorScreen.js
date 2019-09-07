import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text,TouchableHighlight
} from 'react-native';

export default class ErrorScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  logout= async () => {
    await AsyncStorage.removeItem('userToken')
    this.props.navigation.navigate('Auth');
    
  }
  // Render any loading content that you like here
  render() {
    const { navigation } = this.props;
    const response = navigation.getParam('message',null);
    
    return (
      <View style={{flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC'}}>
        <Text style={{textAlign:'center'}}>ERROR</Text>
        <Text style={{textAlign:'center'}}>{JSON.parse(response).message}</Text>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.logout()}>
          <Text style={styles.loginText}>Volver a Iniciar</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 30,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#2C3B92",
  },
  loginText: {
    color: 'white',
  }
});