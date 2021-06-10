import AsyncStorage from '@react-native-async-storage/async-storage';
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
import ModalEx from '../ModalEx';

class Todolist extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            examId : "",
            results : [],
            open : false,
        };
    }
    searchExam(){
        fetch('http://172.30.1.47:3000/searchexam/' + this.state.examId, {
            method : 'GET',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(json => {
            if(json.hasOwnProperty('error_message')){
                this.setState({...this.state, open : true, message : json['error_message']});
            }
            else if(json.hasOwnProperty('success_message')){
                var tjson = JSON.parse(json['success_message']);
                if(tjson['body']['items'].length <= 0){
                    this.setState({...this.state, open : true, message : "검색 결과가 없습니다.", results : []});
                }
                else{
                    this.setState({...this.state, results : tjson['body']['items']});
                }          
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    openModal = () => {
        this.setState({...this.state, open : true});
    }
    closeModal = () => {
        this.setState({...this.state, open : false});
    }

    render(){
        let element
        if(this.state.results.length > 0){
            element = this.state.results.map((data, idx) => {
                return (
                    <View>
                        <Text>시행년도 : {data.implYy}</Text>
                        <Text>필기시험 원서접수 시작일 : {data.docRegStartDt}</Text>
                        <Text>필기시험 원서접수 종료일 : {data.docRegEndDt}</Text>
                        <Text>필기시험 시작일자 : {data.docExamStartDt}</Text>
                        <Text>필기시험 종료일자 : {data.docExamEndDt}</Text>
                        <Text>필기 발표 합격 일자 : {data.docPassDt}</Text>
                        <Text>실기 면접 시험 원서접수 시작 일자 : {data.pracRegStartDt}</Text>
                        <Text>실기 면접 시험 원서접수 종료 일자 : {data.pracRegEndDt}</Text>
                        <Text>실기시험 시작일자 : {data.pracExamStartDt}</Text>
                        <Text>실기시험 종료일자 : {data.pracExamEndDt}</Text>
                        <Text>실기 발표 합격 일자 : {data.pracPassDt}</Text>
                    </View>
                    );
            });
        }
        return( this.state.open ? <ModalEx open = {() => this.openModal()} close = {() => this.closeModal()} header = {this.state.message}></ModalEx> :
            <ScrollView>
                <View className="header"
                    style={{marginTop:20,
                            marginBottom:20}}>
                    <Image 
                        source={require('../../../assets/search.png')}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: 100,
                            resizeMode: 'contain',
                            marginTop: 30,
                            marginBottom: 30,
                        }}/>
                    <TextInput 
                        style = {styles.inputTextStyle}
                        onChangeText = {(text) => this.setState({...this.state, examId : text})} value = {this.state.examId} 
                        placeholder = {"시험 이름"}/>
                    <TouchableOpacity 
                        onPress = {() => this.searchExam()}
                        style = {styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>
                            검색
                        </Text>
                    </TouchableOpacity>
                    <View style={{
                        marginHorizontal:4,
                        borderWidth:2,
                        backgroundColor: "#FFFFCC",
                        }}>
                        <Text style={{marginLeft:5,marginVertical:5}}>
                            {element}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default Todolist;

const styles = StyleSheet.create({
    buttonStyle: {
        width:"50%",
      backgroundColor: 'blue',
      borderWidth: 1,
      color: '#FFFFFF',
      borderColor: '#006600',
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      marginLeft: "25%",
      marginTop: 15,
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
    inputTextStyle: {
        borderWidth: 2,
        color:'black',
        borderColor: 'black',
        backgroundColor: "#FFFFCC",
        textAlign:'center',
        width:"70%",
        marginLeft:"15%",

    }
  });