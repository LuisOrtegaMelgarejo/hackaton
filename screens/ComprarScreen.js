import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,ActivityIndicator,
  FlatList,
  AsyncStorage
} from 'react-native';


export default class ComprarScreen extends React.Component {

  constructor(props){
    super(props);
    this.state={isLoading: true,dataSource: [],dataSource2: []}
  }1

  componentDidMount(){
    this.isFocused();
  }  

  isFocused = async () => {
    const { navigation } = this.props;
    const data = navigation.getParam('data', 'null');
    const userToken = await AsyncStorage.getItem('userToken');
    var obj = {  
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-access-token': userToken,
        'Host': 'api-qa.belcorp.biz',
      }
    }
    var req = {
      "latitude": "-12.1010237",
      "longitude":"-77.0407587"
    }
    fetch(`https://api-qa.belcorp.biz/consultants/PE?latitude=${encodeURIComponent(req.latitude)}&longitude=${encodeURIComponent(req.longitude)}`,obj)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
        isLoading: false,
        dataSource: data,
        dataSource2: responseJson
      });
    }).catch((error) =>{
      console.error(error);
      this.setState({
        isLoading: false,
      }, function(){})
    });
  }

  _keyExtractor2 = (item, index) => item.consultant_code;
  _keyExtractor = (item, index) => item.CUV;

/*  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }*/
  

  static navigationOptions = {
    header: null,
  };

  render() {
    const loading =
    <View style={{flex: 1, paddingTop: 30}}>
      <ActivityIndicator/>
    </View>
    const data =
      <ScrollView style={{paddingLeft: 20,paddingRight: 20}}>
        <Text style={{color: "#8F248E", fontSize: 20, paddingBottom: 20}}>Te falta poco!</Text>
        <Text>Estas a un paso de obtener lo que deseas!</Text>
        <FlatList
          data={this.state.dataSource}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => 
          <View style={{paddingLeft: 10,paddingRight: 10,backgroundColor: "#FFF4E0"}}>
            <View style={{width: "100%",borderBottomColor: "#8F248E",borderBottomWidth: 2}}>
              <Text>{item.Descripcion}</Text>
              <View style={{height: 30,width: "100%"}}>
                <View style={{flex: 1,flexDirection:"row",justifyContent: 'space-between'}}>
                <Image style={{width: 150,height: 180,resizeMode:'stretch'}}
                source={require('../assets/images/check.png')}/>
                  <Text>S/. {item.Precio}</Text>
                  <Text>Cyzone</Text>
                  <Text>{item.CUV}</Text>
                </View>
              </View>
            </View>
          </View>}
        />
        <View style={{paddingTop: 20,paddingBottom: 20}}>
          <Text>¿Como obtendras los productos?</Text>
        </View>

        <View style={{paddingRight: 20,paddingLeft: 20, height: 100}}>
          <View style={{flex: 1, flexDirection: "row",justifyContent:"space-between"}}>
            <View style={{width: "33%",height: 100}}>
              <Text  style = {{textAlign: 'center'}}>Recojo en tienda</Text>
            </View>
            <View style={{width: "33%",height: 100}}>
              <Text  style = {{textAlign: 'center'}}>Envio a domicilio</Text>
            </View>
            <View style={{width: "33%",height: 100}}>
              <Text  style = {{textAlign: 'center'}}>Contactar a consultora</Text>
            </View>
          </View>
        </View>
        <View style={{paddingTop: 20,paddingBottom: 20}}>
          <Text>Estas son las consultoras cercanas a tu ubicacion</Text>
          <FlatList
          data={this.state.dataSource2}
          keyExtractor={this._keyExtractor2}
          renderItem={({item}) => 
          <View style={{paddingLeft: 10,paddingRight: 10,backgroundColor: "#FFF4E0"}}>
            <View style={{width: "100%",borderBottomColor: "#8F248E",borderBottomWidth: 2}}>
              <Text>{item.full_name}</Text>
              <View style={{height: 30,width: "100%"}}>
                <View style={{flex: 1,flexDirection:"row"}}>
                  <Text>{item.phones[0].number}   </Text>
                  <Text>{item.addresses[0].address}</Text>
                </View>
              </View>
            </View>
          </View>}
        />
        </View>
        <View style={{paddingTop: 20,paddingBottom: 20}}>
          <View style={{flex: 1, flexDirection: "row",justifyContent:"space-between"}}>
            <View style={{width: "50%",height: 30}}>
              <Text>Atras</Text>
            </View>
            <View style={{width: "50%",height: 30}}>
              <Text  style={{color: "#8F248E", fontSize: 20,textAlign: 'right'}}>Finalizar</Text>
            </View>
          </View>
        </View>

      </ScrollView>

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
            <Image style={styles.imgmed} source={require('../assets/images/step2-on.png')}/>
            <Image style={styles.imgmed} source={require('../assets/images/step3-on.png')}/>
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
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    width: "100%",
    height: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  header2:{
    width: "100%",
    height: 110,
    paddingLeft: 50,
    paddingRight: 50,
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
  }
});
