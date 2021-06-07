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
import Modal from '../Modal';

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
            this.state.open ? <Modal open = {() => this.openModal()} close = {() => this.closeModal()} header = {this.state.message}></Modal> :
            <ScrollView>
            <View>
                <Text>{this.state.content}</Text>
                <Text>{this.state.nickName}</Text>
                <Text>{this.state.date}</Text>
            </View>
            <TextInput onChangeText = {(text) => this.setState({...this.state, revisecontent : text})} value = {this.state.revisecontent}/>
            <Button onPress = {() => this.insertComment()} title = "댓글 수정"></Button>
            <Button onPress = {() => this.deleteComment()} title = "댓글 삭제"></Button>
            </ScrollView>
        );
    }
}

export default Comment;