import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,ActivityIndicator,
  FlatList,
  AsyncStorage,TouchableWithoutFeedback
} from 'react-native';


export default class ListScreen extends React.Component {

  constructor(props){
    super(props);
    this.state={isLoading: true,dataSource: []}
  }1

  componentDidMount(){
    this.isFocused();
  }  
  

  isFocused = async () => {

    const userToken = await AsyncStorage.getItem('userToken');
    var obj = {  
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-access-token': userToken,
        'Host': 'api-qa.belcorp.biz',
      },
      body: JSON.stringify({ 
        "codigoConsultora": "",
        "textoBusqueda": "labial azul",
        "paginacion": { "numeroPagina": 0, "cantidad": 3 },
        "orden": { "campo": "ORDEN", "tipo": "asc" },
        "filtro": [
          {
            "NombreGrupo": "Secciones",
            "Opciones": [ { "IdFiltro": "sec-cat", "NombreFiltro": "Catalogo" } ]
          },
          {
          "idFiltro": "cat-maquillaje",
          "nombreFiltro": "Maquillaje",
          "cantidad": 276,
          "marcado": true,
          "id": 2,
          "parent": 0,
          "type": "last-inclusive-level",
          "idSeccion": "CAT",
          "totalChildren": 0
          }
        ],
        "configuracion": {
            "sociaEmpresaria": "0",
            "suscripcionActiva": "False",
            "mdo": "False",
            "rd": "False",
            "rdi": "False",
            "diaFacturacion": 0,
            "esFacturacion": false
        }
      })
    }
    fetch("https://api-qa.belcorp.biz/v2/products/PE/201914/sb-web",obj)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.productos);
      this.setState({
        isLoading: false,
        dataSource: responseJson.productos
      });
    }).catch((error) =>{
      console.error(error);
      this.setState({
        isLoading: false,
      }, function(){})
    });
  }

  _keyExtractor = (item, index) => item.CUV;
  
  goToDetail() {
    this.props.navigation.navigate(
      'Comprar',
      {'data': this.state.dataSource},
    );
  }
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
        <Text style={{color: "#8F248E", fontSize: 20, paddingBottom: 20}}>Excelente Adriana</Text>
        <Text>Ahora verás los productos que detectamos y tenemos disponibles para ti</Text>
        <View style={{width: "100%", paddingTop: 20,paddingBottom: 20, alignItems: "center"}}>
          <Image style={{width: 150,height: 180,resizeMode:'stretch'}}
                source={{uri: "https://i.pinimg.com/564x/6e/73/a2/6e73a281068289656d1783d2cb2ad13e.jpg"}}/>
        </View> 
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.dataSource}
          renderItem={({item}) => 
          <View style={{paddingLeft: 10,paddingRight: 10,backgroundColor: "#FFF4E0"}}>
            <View style={{width: "100%",borderBottomColor: "#8F248E",borderBottomWidth: 2}}>
              <Text>{item.Descripcion}</Text>
              <View style={{height: 30,width: "100%"}}>
                <View style={{flex: 1,flexDirection:"row",justifyContent: 'space-between'}}>
                  <Text>S/. {item.Precio}</Text>
                  <Text>Cyzone</Text>
                  <Text>{item.CUV}</Text>
                </View>
              </View>
            </View>
          </View>}
        />
        <View style={{paddingTop: 20,paddingBottom: 20}}>
          <Text>¿Quieres probarlos antes de comprarlos?</Text>
          <Text>Pues no esperes mas! Anímate!</Text>
        </View>

        <View style={{paddingRight: 20,paddingLeft: 20, height: 100}}>
          <View style={{flex: 1, flexDirection: "row",justifyContent:"space-between"}}>
            <View style={{width: "50%",height: 100}}>
              <Text  style = {{textAlign: 'center'}}>Tomate una foto</Text>
            </View>
            <View style={{width: "50%",height: 100}}>
              <Text  style = {{textAlign: 'center'}}>Sube una foto</Text>
            </View>
          </View>
        </View>

        <View style={{paddingTop: 20,paddingBottom: 20}}>
          <View style={{flex: 1, flexDirection: "row",justifyContent:"space-between"}}>
            <View style={{width: "50%",height: 30}}>
              <Text>Atras</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => this.goToDetail()}>
              <View style={{width: "50%",height: 30}}>
                <Text  style={{color: "#8F248E", fontSize: 20,textAlign: 'right'}}>Lo quiero!</Text>
              </View>
            </TouchableWithoutFeedback>
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
            <Image style={styles.imgmed} source={require('../assets/images/step3-off.png')}/>
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
