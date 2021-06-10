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

class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            examId : this.props.examId,
            title : this.props.title,
            nickName : this.props.nickName,
            content : this.props.content,
            date : this.props.date,
            revisecontent : "",
            open : false,
            message : "",
        }
    }
    
    async insertComment(){
        let nickName = await AsyncStorage.getItem('nickName');
        if(nickName != this.state.nickName){
            this.setState({...this.state, open : true, message : "접근권한이 없습니다."});
            return;
        }
        else{
        console.log(this.state.date);
            var body = {'examId' : this.state.examId, 'title' : this.state.title, 'revisecontent' : this.state.revisecontent, 'content' : this.state.content, 'date' : this.state.date };
            fetch("http://172.30.1.47:3000/examboard/insertcomment" , {
                method : 'POST',
                mode : 'cors',
                cache : 'no-cache',
                credentials : 'same-origin',
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(body)
            })
            .then(res => res.json())
            .then(json => {
                if(json.hasOwnProperty('error_message')){
                    this.setState({...this.state, open : true, message : '댓글을 저장하는데 실패했습니다.'});
                }
                else if(json.hasOwnProperty('success_message')){
                    this.setState({...this.state, open : true, message : '댓글 수정이 완료되었습니다.', content : this.state.revisecontent, revisecontent : ""});
                    this.props.reload();
                }
            })
        }
    };

    async deleteComment(){
        let nickName = await AsyncStorage.getItem('nickName');
        if(nickName != this.state.nickName){
            this.setState({...this.state, open : true, message : "접근권한이 없습니다."});
            return;
        }
        else{
            var body = {'examId' : this.state.examId, 'title' : this.state.title, 'content' : this.state.content, 'date' : this.state.date};
            fetch("http://172.30.1.47:3000/examboard/deletecomment" , {
                method : 'POST',
                mode : 'cors',
                cache : 'no-cache',
                credentials : 'same-origin',
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(body)
            })
            .then(res => res.json())
            .then(json => {
                if(json.hasOwnProperty('error_message')){
                    this.setState({...this.state, open : true, message : '댓글을 저장하는데 실패했습니다.'});
                }
                else if(json.hasOwnProperty('success_message')){
                    this.setState({...this.state, open : true, message : '댓글 삭제가 완료되었습니다.'});
                    this.props.reload();
                }
            })
        }
    }

    openModal = () => {
        this.setState({...this.state, open : true});
    }
    closeModal = () => {
        this.setState({...this.state, open : false});
    }

    render(){
        return(
            this.state.open ? <ModalEx open = {() => this.openModal()} close = {() => this.closeModal()} header = {this.state.message}></ModalEx> :
            <ScrollView>
            <View>
                <View style={{borderWidth:2,height:50, backgroundColor:"#DDFFFF"}}>
                    <Text>{this.state.content}</Text>
                </View>
                <View style={{backgroundColor:"white", borderBottomWidth:1}}>
                    <Text style={styles.sideText}>{this.state.nickName}</Text>
                    <Text style={styles.sideText}>{this.state.date}</Text>
                </View>
            </View>
            <TextInput onChangeText = {(text) => this.setState({...this.state, revisecontent : text})} value = {this.state.revisecontent}/>
            <TouchableOpacity style={styles.buttonStyle} onPress = {() => this.insertComment()}>
                <Text style={styles.buttonTextStyle}>댓글 수정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress = {() => this.deleteComment()}>
                <Text style={styles.buttonTextStyle}>댓글 삭제</Text>
            </TouchableOpacity>
            </ScrollView>
        );
    }
}

export default Comment;

const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#307ecc',
      alignContent: 'center',
    },
    sideText:{
        textAlign:'right',
        fontSize:13,
    },
    bodyText:{
        fontSize:15,
        marginHorizontal:5,
    },
    buttonStyle: {
      backgroundColor: 'navy',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginLeft: 50,
      marginRight: 50,
      marginTop: 5,
      marginBottom: 5,
    },
    DisablebuttonStyle: {
        backgroundColor: 'skyblue',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        marginBottom: 10,
      },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 13,
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
    headerTextStyle: {
        marginVertical:10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
  });