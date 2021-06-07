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
} from 'react-native';
//import "../../../assets/css/modal.css";

const Modal = ( props ) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = props;
    const pop_head = "알림"
    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <View>
            { open ? (  
                <View>
                    <View>
                        <Text>{pop_head}</Text>
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

export default Modal;