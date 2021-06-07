import React from 'react';
import {
  View,
  Image,
  Text, 
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Examlist from './Examlist';
import Todolist from './Todolist';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, padding: 16}}>
        <Image
          source={require('../../../assets/homelogo.png')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 100,
            resizeMode: 'contain',
            marginTop: 30,
            marginBottom: 30,
          }}
        />
        <TouchableOpacity
          style={styles.imagePic}
          activeOpacity={0.5}    
          onPress={() => navigation.navigate('Examlist')}
          >
          <Image
              source={require('../../../assets/board.png')}
              style={{
                width: '70%',
                height: 100,
                resizeMode: 'contain',
                marginTop: 30,
                marginBottom: 10,
              }}
          />
          <Text style={styles.textStyle}>시험 게시판</Text>
        </TouchableOpacity>
        <Text
          style={{paddingVertical:30}}
        />
        <TouchableOpacity
          style={styles.imagePic}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Todolist')}
          >
          <Image
              source={require('../../../assets/todolist.png')}
              style={{
                width: '70%',
                height: 100,
                resizeMode: 'contain',
                marginTop: 30,
                marginBottom: 10,
              }}
          />
          <Text style={styles.textStyle}>시험 정보</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({

  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonIconStyle: {
    flex:0.3,
    backgroundColor: 'green',
    borderWidth: 0,
    color: '#FFFFFF',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 40,
    marginBottom: 15,
  },
  imagePic: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 56,
  },
  textStyle:{
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  }
});