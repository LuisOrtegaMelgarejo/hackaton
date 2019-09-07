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
  RefreshControl
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
  
  goToDetail(data) {
    this.props.navigation.navigate(
      'Detail',
      {'data': data},
    );
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const loading =
    <View style={{flex: 1, paddingTop: 30}}>
      <ActivityIndicator/>
    </View>
    const data =
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
      <View style={{flex: 1}}>
     
      </View>
    </ScrollView>
      
    return (
      <View style={styles.container}>
        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>Holas</Text>
        </View>
        {this.state.isLoading?loading:data}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  semanas:{
    borderBottomWidth: 2,
    borderBottomColor: '#2C3B92',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#2C3B92',
    paddingTop: 40,
    paddingBottom: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'white',
    textAlign: 'left',
  },
  semanaText: {
    color: 'black',
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 15
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
