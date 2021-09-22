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
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.50)'
                }}>
                    <View style={{
                            width: 300,
                            height: 200,
                            backgroundColor: 'white',
                            borderRadius: 20
                        }}>
                        <Text 
                            style={{
                                flex: 1.5,
                                // width: 300,
                                backgroundColor: '#32C5E6',
                                color: 'white',
                                fontSize: 20,
                                paddingLeft: 15,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20
                            }}>
                            {pop_head}
                        </Text>
                        <Button onPress={close} title = "close"> &times; </Button>
                    </View>
                    <View>
                        <Text>{header}</Text>
                    </View>
                    <View>
                        <Button onPress={close} title = "open"></Button>
                    </View>
                </View>
            ) : null }
        </View>
    )
}

export default ModalEx;