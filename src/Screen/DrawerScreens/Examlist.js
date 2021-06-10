import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Board from './Board';
import exam_code from './exam_code';
import ModalEx from '../ModalEx';

const Examlist = ({props}) => {
    const [key, setKey] = useState(Object.keys(exam_code));
    const [bulletcheck, setBulletcheck] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [page, setPage] = useState(0);
    const [examId, setExamId] = useState('');

    const clickBullet = (examId_) => {
        setExamId(examId_);
        setBulletcheck(true);
    }

    const openModal = () => {
        setOpen(true);
        setMessage('');
    }

    const closeModal = () => {
        setOpen(false);
        setMessage('');
    }

    if(open == true){
        return <ModalEx open = {openModal()} close = {closeModal()} header = {message}></ModalEx>
    }
    else if(bulletcheck == true && examId != ""){
        return <Board examId = {examId}></Board>;
    }
    else{
        const content = key.map((item, idx) => {
            return (
                <View style={{flex: 1, padding: 16}}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() => clickBullet(item)}>
                        <Text style={styles.buttonTextStyle}>{item}</Text>
                    </TouchableOpacity>
                </View>
                )
        });
        return <ScrollView style={{flex: 1, padding: 16}}>{content}</ScrollView>;
    }
}

export default Examlist;

const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#307ecc',
      alignContent: 'center',
    },
    SectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
    },
    buttonStyle: {
      backgroundColor: 'blue',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 12,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
    inputStyle: {
      flex: 1,
      color: 'white',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#dadae8',
    },
    registerTextStyle: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14,
      alignSelf: 'center',
      padding: 10,
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 14,
    },
  });