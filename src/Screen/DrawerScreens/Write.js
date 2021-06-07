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
  Alert,
} from 'react-native';
import Modal from '../Modal';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from 'axios';
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

//import { forModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';

class Write extends Component{
    constructor(props){
        super(props);
        console.log(this.props.examId);
        this.state = ({
            ...this.state,
            examId : this.props.examId,
            title : "", 
            content : "",
            titlecheck : false,
            open : false,
            message : "",
            writeComplete : false,
            img : [],
            uploadedImg : false,
            disabled : true,
            count : 0,
        })
    }
    
    askForPermission = async() => {
        const permissionResult = await Permissions.askAsync(Permissions.CAMERA);
        if(permissionResult.status != 'granted'){
            Alert.alert('no permissions to access camera!', [{text : 'ok'}])
            return false
        }
        return true
    }

    takeImage = async() => {
        const hasPermission = await this.askForPermission();
        console.log('camera');
        if(!hasPermission){
            this.setState({...this.state, open : true, message : "카메라 권한이 없습니다."});
        }
        else{
            let image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes : ImagePicker.MediaTypeOptions.Images,
                allowsEditing : true,
                aspect : [3, 3],
                quality : 1,
                base64 : true,
            })
            
            if(image){
                this.uploadImg(image);
            }
        }
    }

    uploadImg = async(image) =>{
        console.log(image.base64);
        var body = {'examId' : this.state.examId, 'title' : this.state.title, 'image' : image.base64};
        fetch('http://172.30.1.47:3000/examboard/uploadimg', {
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
                this.setState({...this.state, open : true, message : "이미지가 업로드 되었습니다.", uploadedImg : true});          
            }
        })
        .catch(error => console.log('Error : ', error));
    }
   /*
    takeImage(){
        const options = {
            title : 'Select Avatar',
            storageOptions : {
                skipBackup : false,
                path : 'images',
            }
        }
        console.log(launchImageLibrary);
        launchImageLibrary(options, (response) => {
            console.log(response);
        })
    }
    */
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

    completeWrite = async() => {
        let nickName = await AsyncStorage.getItem('nickName');
        nickName.nickName
        if(!this.state.titlecheck){
            this.setState({...this.state, open : true, message : "제목 중복확인을 해주세요"});
            return;
        }
        else if(nickName == null){
            this.setState({...this.state, open : true, message : "로그인을 해주세요"});
        }
        else{
            var body = {'examId' : this.state.examId, 'title' : this.state.title, 'content' : this.state.content, 'nickName' : nickName}
            fetch('http://172.30.1.47:3000/examboard/createcomplete', {
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
                    console.log(json['error_message']);
                    this.setState({...this.state, open : true, message : json['error_message']});
                }
                else if(json.hasOwnProperty('success_message')){
                    this.setState({...this.state, writeComplete : true});
                }
            })
            .catch(error => console.log('Error : ', error));
        }
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
        
        const upload = <Button id="specialfour" disabled = {this.state.disabled} onPress = {() => this.takeImage()} title = "이미지업로드"></Button>
        return(
            this.state.open ? <Modal open = {() => this.openModal()} close = {() => this.closeModal()} header = {this.state.message}></Modal> : this.state.writeComplete ?
            //redirect코드 들어가야됨
            <Text>Redirect 필요</Text> :
            <View>
            <View style={contentStlye}>
                <Text>글쓰기</Text>
                <View>
                    <TextInput onChangeText={(text) => this.setState({...this.state, title : text})} value={this.state.title} placeholderText = "제목입력"/>
                    <Button onPress={() => this.checkTitle()} title = "중복확인" ></Button>
                </View>
                <View>
                   {upload}
                </View>                
                <TextInput multiline = {true} style={bulletStyle} onChangeText={(text) => this.setState({...this.state, content: text})} value={this.state.content} placeholderText = "내용입력"/>
                <View>
                <Button onPress={() => this.completeWrite()} title = "글 작성 완료"></Button>
                </View>
           </View>
        </View>
        )
    }
}

export default Write;