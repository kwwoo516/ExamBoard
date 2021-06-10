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
import Bullet from './Bullet';
import Write from './Write';

class Board extends Component{
    constructor(props){
        super(props);
        this.state = {
            examId : this.props.examId,
            boardcheck : false,
            writecheck : false,
            searchWord : "",
            page : 1,
            title : "",
            nickName : "",
            content : "",
            date : "",
            results : [],
            open : false,
            message : "",
        }
        this.loadPage();
    }

    loadPage(){
        console.log(this.state.page);
        fetch('http://172.30.1.47:3000/examboard/' + this.state.examId + '/' + this.state.page, {
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
                console.dir(json['success_message']);
                this.setState({...this.state, check : true, results : json['success_message']});          
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    boardCheck(){
        this.setState({...this.state, boardcheck : true});
    }

    increasePage(){
        this.state.page++;
        this.loadPage();
    }

    decreasePage(){
        if(this.state.page - 1 < 1) return;
        this.state.page--;
        this.loadPage();
    }

    writeComplete(){
        this.setState({...this.state, writecheck : false});
        this.loadPage();
    }

    backBoard(){
        this.setState({...this.state, boardcheck : false});
        this.loadPage();
    }

    openModal = () => {
        this.setState({...this.state, open : true});
    }
    closeModal = () => {
        this.setState({...this.state, open : false});
    }

    render(){
        const boardlist = this.state.results.map((item, key) => {
            console.log(item);
            return (<View style={{flex: 1, padding: 16}}>
                    <TouchableOpacity
                        style={styles.boardStyle}
                        activeOpacity={0.5}
                        onPress = {() => this.setState({...this.state, boardcheck : true, title : item.title, nickName : item.nickName, content : item.content, date : item.date})}>
                        <Text style={styles.textTitleStyle}>제목 : {item.title}</Text>
                        <Text style={styles.textStyle}>닉네임 : {item.nickName}</Text>
                        <Text style={styles.textStyle}>날짜 : {item.date}</Text>
                    </TouchableOpacity>
                </View>)
        });

        if(this.state.open){
            return <ModalEx open = {() => this.openModal()} close = {() => this.closeModal()} header = {this.state.message}></ModalEx>
        }
        //게시판 내용으로 들어가는 컴포넌트
        else if(this.state.boardcheck){
            return (<Bullet redirect = {() => this.backBoard()} examId = {this.state.examId} title = {this.state.title} content = {this.state.content} nickName = {this.state.nickName} date = {this.state.date}></Bullet>);
        }
        //글작성시 눌리는 컴포넌트
        else if(this.state.writecheck){
            return <Write examId = {this.state.examId} redirect = {() => this.writeComplete()}></Write>;
        }
        else{
            return (
                <View>
                    <ScrollView>
                        {boardlist}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress = {() => this.setState({...this.state, writecheck : true})}>
                            <Text style={styles.buttonTextStyle}>글 작성</Text>
                        </TouchableOpacity>
                        <TextInput onChangeText = {(text) => this.setState({...this.state,  searchWord : text})}></TextInput>
                        <Text
                            style={{
                                textAlign: 'center',
                                marginHorizontal:'42%',
                                borderWidth: 2,
                                width:60,
                            }}
                        >
                            page : {this.state.page}
                        </Text>
                        <View style={styles.fixToText}>
                            <TouchableOpacity style={styles.bottombuttonStyle} onPress = {() => this.decreasePage()}>
                                <Text style={styles.buttonTextStyle}>prev</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bottombuttonStyle} onPress = {() => this.increasePage()}>
                                <Text style={styles.buttonTextStyle}>next</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView> 
                </View>
            )
        }
    }
}

export default Board;

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
        borderRadius: 15,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    bottombuttonStyle:{
        backgroundColor: 'blue',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 50,
        width:50,
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal:50,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal:10,
    },
    boardStyle:{
        backgroundColor:"#BBBBFF",
        height: 70,
        width:'80%',
        alignItems: 'center',
        marginHorizontal:40,
        borderWidth:2,
    },
    textTitleStyle:{
        fontSize: 16,
        color: 'black',
        fontWeight:'bold',
    },
    textStyle:{
        fontSize: 16,
        color: 'black',
    },
    buttonTextStyle: {
      color: 'white',
      paddingVertical: 10,
      fontSize: 16,
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