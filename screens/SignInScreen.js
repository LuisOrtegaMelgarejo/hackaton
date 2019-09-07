import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Image,
  Alert,AsyncStorage,ActivityIndicator,ImageBackground
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
  
  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
    
    if(this.state.email=="123456" && this.state.password=="123456"){
      
      this.setState({
        isLoading: false,
      });
      AsyncStorage.setItem('userToken',this.makeid(20));
      scope.props.navigation.navigate('Main');
    }
    
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
    <TouchableWithoutFeedback onPress={() => this.onClickListener('login')}>
      <View style={styles.loginButton}>
        <Text style={styles.loginText}>INGRESAR</Text>
      </View>
    </TouchableWithoutFeedback>
    return (
      <ImageBackground source={require('../assets/images/loginbg.png')}
      imageStyle={{resizeMode: 'stretch'}}
      style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.subcontainer}>
            <View style={styles.logocontainer}>
              <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
            </View>
            <View style={styles.logocontainer2}>
              <Image style={styles.logo2} source={require('../assets/images/igbutton.png')}/>
            </View>
            <Text style={{fontWeight:"bold",color: "#E6E6E6"}}>
              - O -
            </Text>
            <View style = {styles.grouped}>
              <Text style={{color: "#E6E6E6"}}>
                Usuario
              </Text>
              <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.setState({email})}/>
              </View>
              <Text style={{color: "#E6E6E6"}}>
                Contraseña
              </Text>
              <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({password})}/>
              </View>

            </View>
            <View style={{width: "100%"}}>
              <Text style={{color: "#E6E6E6", fontSize: 10,textAlign: "right", paddingBottom:15}}>
                ¿Olvidaste tu usuario o contraseña?
              </Text>
              <Text style={{color: "#E6E6E6", fontSize: 10,textAlign: "right", paddingBottom:15}}>
                ¿No tienes cuenta?
              </Text>
            </View>
            {this.state.isLoading?loading:data}
          </View>
        </View>
      </ImageBackground>
  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
    paddingTop: 60,
  },
  subcontainer:{
    width: "100%",
    height: "100%",
    alignItems: 'center',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomColor: '#E6E6E6',
    borderTopColor: '#E6E6E6',
    borderRightColor: '#E6E6E6',
    borderLeftColor: '#E6E6E6',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
    paddingTop: 40,
  },
  logocontainer:{
    width: "100%",
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 20,
    paddingTop: 20,
  },
  logocontainer2:{
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  logo:{
    width: "100%",
    height: 60,
    resizeMode: 'stretch'
  },
  logo2:{
    width: "100%",
    height: 50,
    resizeMode: 'stretch'
  },
  grouped:{
    padding: 10,
    marginBottom: 10
  },
  inputContainer: {
      borderBottomColor: '#E6E6E6',
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
      borderBottomColor: '#E6E6E6',
      color: '#E6E6E6',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },

  loginButton:{
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomColor: '#E6E6E6',
    borderTopColor: '#E6E6E6',
    borderRightColor: '#E6E6E6',
    borderLeftColor: '#E6E6E6',
    padding:20,
    borderRadius: 25,
    width: "100%",
    textAlign: "center"
  },
  loginText: {
    color: '#E6E6E6',
    textAlign: "center"
  }
});
 