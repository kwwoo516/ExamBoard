import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, {useState, createRef, Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Button,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
//import "../../../assets/css/modal.css";

const ModalEx = ( props ) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = props;
    const pop_head = "알림"
    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <View>
            { open ? ( 
                <Modal
                    animationType="slide"
                    transparent={true}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                                width: 300,
                                height: 300,
                                borderWidth:2,
                                borderRadius:30,
                                backgroundColor:"#FFFFFF",
                            }}>
                            <Text 
                                style={{
                                    marginTop: 10,
                                    marginBottom: 10,
                                    color:"black",
                                    fontSize:20,
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    borderBottomWidth:2,
                                }}>
                                {pop_head}
                            </Text>
                            <View style={{
                                
                            }}>
                                <Text
                                    style={{
                                        marginTop: 70,
                                        color:"black",
                                        fontSize:20,
                                        textAlign: 'center',
                                        fontWeight: 'bold',}}>
                                    {header}
                                </Text>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    activeOpacity={0.5}
                                    onPress={close}>
                                    <Text
                                    style={styles.buttonTextStyle}>
                                        확인
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            ) : null }
        </View>
    )
}

export default ModalEx;

const styles = StyleSheet.create({
    buttonStyle: {
      backgroundColor: 'blue',
      borderWidth: 1,
      color: '#FFFFFF',
      borderColor: '#006600',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 20,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      textAlign: 'center',
      paddingVertical: 6,
      fontSize: 16,
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
    },
  });