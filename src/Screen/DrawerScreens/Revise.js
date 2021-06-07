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

class Revise extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...this.state,
            prevtitle : this.props.title,
            title : this.props.title,
            content : this.props.content,
            examId : this.props.examId,
            nickName : this.props.nickName,
            open : false,
            message : "",
            disabled : true,
            redirect : false
        }
    }

    checkTitle = () => {
        var body = {'examId' : this.state.examId, 'title' : this.state.title};
        fetch('http://172.30.1.47:3000/examboard/checktitle', {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(body),
        })
        .then(res => res.json())
        .then(json => {
            if(json.hasOwnProperty('error_message')){
                this.setState({...this.state, open : true, message : json['error_message']});
            }
            else if(json.hasOwnProperty('success_message')){
                if(json['success_message'][0]['COUNT(*)'] >= 1){
                    this.setState({...this.state, open : true, message : "이미 존재하는 제목입니다."});          
                }
                else{
                    this.setState({...this.state, titlecheck : true, open : true, message : "제목을 사용할 수 있습니다.", disabled : false})
                }
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    rewriteComplete = () => {
        if(this.state.disabled){
            this.setState({...this.state, open : true, message : "제목 중복확인을 해주세요"});
            return;
        }
        var body = {'prevtitle' : this.state.prevtitle, 'examId' : this.state.examId, 'title' : this.state.title, 'nickName' : this.state.nickName, 'content' : this.state.content};
        console.dir(body);
        fetch('http://172.30.1.47:3000/examboard/updatewrite', {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(body),
        })
        .then(res => res.json())
        .then(json => {
            if(json.hasOwnProperty('error_message')){
                this.setState({...this.state, open : true, message : json['error_message']});
            }
            else if(json.hasOwnProperty('success_message')){
                this.setState({...this.state, open : true, message : "글 수정을 완료했습니다.", redirect : true});
            }
        })
        .catch(error => {
            this.setState({...this.state, open : true, message : error});
        })
    }

    openModal = () => {
        this.setState({...this.state, open : true});
    }
    closeModal = () => {
        this.setState({...this.state, open : false});
    }

    
    render(){
        var contentStlye = {
            textAlign: "center",
        }
        var bulletStyle = {
            marginTop: 10,
            marginLeft : 100,
            marginRight : 100,
            height:500,
            padding:20,
            backgroundColor: "rosybrown",
        }
        return(
            (this.state.open ? <Modal open = {() => this.openModal()} close = {() => this.closeModal()} header = {this.state.message}></Modal> :
            this.state.redirect ? <Text>Redirect 필요</Text> :
            <View style={contentStlye}>
                <Text>글수정</Text>
                <View className="form-group">
                    <TextInput onChangeText = {(text) => this.setState({...this.state, title : text})} value = {this.state.title} placeholderText = {this.state.title}/>
                    <Button onPress={() => this.checkTitle()} title = "중복확인"/>
                </View>
                <View className="form-group">
                    <TextInput multiline = {true} onChangeText = {(text) => this.setState({...this.state, content : text})} value = {this.state.content} placeholderText = {this.state.content}/>
                </View>
                <Button onPress = {() => this.rewriteComplete()} title = "수정완료"></Button>
            </View>
            )
        );
    }
}

export default Revise;