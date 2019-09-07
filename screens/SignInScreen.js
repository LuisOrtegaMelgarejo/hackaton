import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Image,
  Alert,AsyncStorage,ActivityIndicator
} from 'react-native';
import { Constants } from 'expo';

export default class SignInScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      isLoading: false,
    }

  }

  onClickListener = (viewId) => {
    if(!this.state.email || !this.state.password){
      return;
    }

    this.setState({
      isLoading: true,
    }, function(){

    });


    var obj = {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
    }
    obj.body = new FormData();
    obj.body.append('usuario', this.state.email);
    obj.body.append('clave', this.state.password);
    //obj.body.append('intranet', 'android');
    var scope = this;
    console.log();
    
    fetch('https://demo2.sigu.pe/alumno/entrarExterno',obj)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
      }, function(){})
      if(!responseJson.error){
        AsyncStorage.setItem('userToken',responseJson["auth-token"]);
        scope.props.navigation.navigate('Main');
      }
    })
    .catch((error) =>{
      console.error(error);
      this.setState({
        isLoading: false,
      }, function(){})
    });
    
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const loading =
    <View>
      <ActivityIndicator/>
    </View>
    const data =
    <TouchableWithoutFeedback style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
      <Text style={styles.loginText}>Iniciar Sesión</Text>
    </TouchableWithoutFeedback>
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 40}}>
        </View>
        <View style = {styles.grouped}>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Usuario"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
          </View>
        
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Contraseña"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}/>
            </View>
        </View>
        {this.state.isLoading?loading:data}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3B92',
  },
  grouped:{
    padding: 10,
    marginBottom: 10
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#2C3B92',
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
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
 