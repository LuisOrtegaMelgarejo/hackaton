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


export default class HomeScreen extends React.Component {

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
  
  goToDetail() {
    this.props.navigation.navigate(
      'ListDetected',
      {'data': []},
    );
  }

  static navigationOptions = {
    header: null,
  };

  render() {

      
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between'}}>
              <Image style={styles.imgrigth} source={require('../assets/images/blacklogo.png')}/>
              <Image style={styles.imgleft} source={require('../assets/images/profile-icon.png')}/>
            </View>
          </View>  
          <View style={styles.header2}>
            <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between'}}>
              <Image style={styles.imgmed} source={require('../assets/images/step1-on.png')}/>
              <Image style={styles.imgmed} source={require('../assets/images/step2-off.png')}/>
              <Image style={styles.imgmed} source={require('../assets/images/step3-off.png')}/>
            </View>
          </View>  
          <View style = {{paddingBottom:22}}>
            <Text style={{fontWeight:"bold",color: "#8F248E",fontSize:26,textAlign:"left"}}>
              Bienvenida Adriana!
            </Text>
          </View>
          <View style = {{paddingBottom:22}}>
            <Text style={{fontSize:16}}>
              ¿Te gusta el maquillaje de tu artista o influencer favorito?
              
            </Text>
          </View>
          <View style={{paddingTop:15}}>
            <Text style={{fontSize:16}}>
              Ahora podrás conseguirlo en 3 pasos! <Image style={styles.heart} source={require('../assets/images/heart.png')}/>
            </Text>
          </View>

          <View style={styles.container_img}>
            <View style={styles.RectangleShapeView}>

                <Image style={styles.upload} source={require('../assets/images/upload.png')}/>
                <Text style={{fontSize:16}}>Sube la foto del influencer</Text>
                <Text style={{fontSize:16}}>desde tu galería</Text>

            </View>
          
          </View>

          <View style={styles.container_btn_ig}>
              <Image style={styles.upload_ig} source={require('../assets/images/ig-button-upload.png')}/>
          </View>

          <TouchableWithoutFeedback onPress={() => this.goToDetail()}>
            <View style={styles.container_sgte}>
            <Text style={{fontWeight:"bold",color: "#8F248E",fontSize:16,textAlign:"right",marginTop:20,marginRight:10}}>Siguiente</Text>
            </View>
          </TouchableWithoutFeedback>
            

        </View>
  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
    paddingTop: 40,
  },
  container_btn_ig:{
    marginTop: 30,
    alignItems: 'center'
  },
  header: {
    width: "100%",
    height: 30
  },
  header2:{
    width: "100%",
    height: 110,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    paddingTop: 40,
  },
  imgrigth:{
    width: 80,
    height: 45,
    resizeMode: 'stretch'
  },
  imgleft:{
    width: 30,
    height: 30,
    resizeMode: 'stretch'
  },
  imgmed:{
    width: 40,
    height: 40,
    resizeMode: 'stretch'
  },
  heart:{
    width: 22,
    height: 20,
    //resizeMode: 'stretch'
  },
  container_img:{
    //flex: 1,
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:"center",
    borderColor: '#A9A9A9',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    width: 310,
    height: 200,
  },
  RectangleShapeView: {
    //marginTop: 20,
    borderStyle: 'solid',
    borderColor: "#CCCCCC",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:"center",
  },
  upload:{
    width: 50,
    height: 40,
    marginBottom: 10
  },
  upload_ig:{
    width: 280,
    height: 40,
  },
  logoview1:{
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
    //width: "100%",
    width: 130,
    height: 50,
    //resizeMode: 'stretch'
  },
  icon_person:{
    //width: "100%",
    width: 50,
    height: 50,
    //resizeMode: 'stretch'
  },
  logo2:{
    width: "100%",
    height: 50,
    resizeMode: 'stretch'
  },
  grouped:{
    marginBottom: 10
  },
  inputContainer: {
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