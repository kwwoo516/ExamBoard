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
import Comment from './Comment'
import Revise from './Revise';

class Bullet extends Component{
    constructor(props){
        super(props);
        this.state = {
            examId : this.props.examId,
            title : this.props.title,
            content : this.props.content,
            nickName : this.props.nickName,
            date : this.props.date,
            comment : [],
            inputcomment : "",
            deleted : false,
            revise : false,
            open : false,
            message : "",
        }
        this.queryComment();
        this.queryImage();
    }

    queryComment(){
        var body = {examId : this.state.examId, title : this.state.title};
        fetch("http://172.30.1.47:3000/examboard/querycomment", {
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
                this.setState({...this.state, fail : true});
            }
            else if(json.hasOwnProperty('success_message')){
                this.setState({...this.state, comment : json['success_message']});
            }
        })
        .catch(err => {console.dir(err);});
    }

    queryImage(){
        var body = {examId : this.state.examId, title : this.state.title};
        fetch("http:///172.30.1.47:3000/examboard/queryimage", {
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
                this.setState({...this.state, open : true, message : "이미지를 불러오는데 실패했습니다."});
            }
            else if(json.hasOwnProperty('success_message')){
                this.setState({...this.state, images : json['success_message']});
                console.dir(this.state.images);
            }
        })
    }

    async updateComment(){
        //console.log('here123');
        //var islogined = await AsyncStorage.getItem('islogined')
        var nickName = await AsyncStorage.getItem('nickName');
        // if(nickName == null){ //islogined == null || 
        //     console.log(nickName);
        //     //console.log(islogined);
        //     this.setState({...this.state, open : true, message : "댓글을 작성하실려면 로그인 부터 해주세요"});
        //     return;
        // }
        if(this.state.inputcomment == ""){
            this.setState({...this.state, open : true, message : "댓글을 입력해주세요"});
            return;
        }
        else{
            var body = {examId : this.state.examId, title : this.state.title, nickName : nickName, content : this.state.inputcomment};
            fetch("http://172.30.1.47:3000/examboard/updatecomment", {
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
                    this.setState({...this.state, open : true, message : "댓글 작성을 실패했습니다."});
                }
                else if(json.hasOwnProperty('success_message')){
                    this.setState({...this.state, open : true, message : "댓글을 작성하였습니다."});
                    this.queryComment();
                }
            })
        }
    }

    async deleteWrite(){
        //let islogined = await AsyncStorage.getItem('islogined');
        let nickName = await AsyncStorage.getItem('nickName');
        //console.log(islogined);
        // if(islogined == null){
        //     this.setState({...this.state, open : true, message : "글을 삭제하실려면 로그인 부터 해주세요"});
        //     return;
        // }
        if(nickName != this.state.nickName){
            this.setState({...this.state, open : true, message : "삭제를 할 권한이 없습니다."});
            return;
        }
        else{
            var data = {'examId' : this.state.examId, 'title' : this.props.title};
            fetch("http://172.30.1.47:3000/examboard/deletewrite" , {
                method : 'POST',
                mode : 'cors',
                cache : 'no-cache',
                credentials : 'same-origin',
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(data)
            })
            .then(res => res.json())
            .then(json => {
                if(json.hasOwnProperty('error_message')){
                    console.log("fail")
                    this.setState({...this.state, open : true, message : "글을 삭제하는데 실패했습니다."});
                }
                else if(json.hasOwnProperty('success_message')){
                    console.log("success")
                    this.setState({...this.state, deleted : true, open : true, message : "글을 삭제했습니다."});
                }
            })
        }
    }

    async reviseWrite(){
        let nickName = await AsyncStorage.getItem('nickName');
        if(nickName != this.state.nickName){
            this.setState({...this.state, open : true, message : "수정을 할 권한이 없습니다."});
            return;
        }
        else
            this.setState({...this.state, revise : true});
    }

    openModal = () => {
        this.setState({...this.state, open : true});
    }
    closeModal = () => {
        this.setState({...this.state, open : false});
    }

    render(){
        const comments = this.state.comment.map((item, index) => {
            return <Comment examId = {this.state.examId} title = {item.title} content = {item.content} nickName = {item.nickName} date = {item.date} reload = {() => this.queryComment()}></Comment>
        });

        const image = this.state.images.map((item, index) => {
            let imgsrc = ".." + item.imgsrc;
            //경로 바꿔가면서 source값 찾기, source : 이미지 위치
            return <Image source = {{uri : imgsrc}}/>
        });

        if(this.state.open){
            return <Modal open = {() => this.openModal()} close = {() => this.closeModal()} header = {this.state.message}></Modal>
        }
        else if(this.state.deleted){
            //redirect코드 필요.
            return <Text>Redirect코드 필요</Text>
        }
        else if(this.state.revise){
            return <Revise examId = {this.state.examId} content = {this.state.content} title = {this.state.title} nickName = {this.state.nickName}></Revise>
        }
        else{
            return(
                <ScrollView>
                    <Text>제목 : {this.state.title}</Text>
                    <Text>내용 : {this.state.content}</Text>
                    <View>{image}</View>
                    <Text>닉네임 : {this.state.nickName}</Text>
                    <Text>날짜 : {this.state.date}</Text>
                    <TextInput onChangeText = {(text) => this.setState({...this.state, inputcomment : text})}></TextInput>
                    <Button onPress = {() => this.deleteWrite()} title = "글 삭제"></Button>
                    <Button onPress = {() => this.reviseWrite()} title = "글 수정"></Button>
                    <Button onPress = {() => this.updateComment()} title = "댓글 작성"></Button>
                    <Text>댓글 : </Text>
                    <ScrollView>{comments}</ScrollView>
                </ScrollView>
            )
        }
    }
}

export default Bullet;