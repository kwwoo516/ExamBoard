import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, {useState, createRef, Component} from 'react';
import {
  StyleSheet,
  TextTextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Button,
  ScrollView,
  Picker,
} from 'react-native';
import Modal from '../Modal';
import Chart from './Chart';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

class Userinfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open : false,
            message : "",
            examId : "toeic",
            nickName : "",
            prevnickName : "",
            img : [],
            canrewrite : false,
            userId : "",
            userPassword : "",
            nickName : "",
            phoneNumber : "",
            uploadedImg : false,
            score : [],
            count : 0,
            verifyCode : "",
            userVerifyCode : "",
            checkphonenumber : false,
            disabled : true,
        }
        this.setNickName();
        this.getUserinfo();
    }

    async setNickName(){
        let nickName = await AsyncStorage.getItem('nickName');
        this.setState({...this.state, nickName : nickName, prevnickName : nickName});
    }

    async getUserinfo(){
        let nickName = await AsyncStorage.getItem('nickName');
        if(nickName == null) {
            this.setState({...this.state, open : true, message : "로그인을 해주세요"});
        }
        else{
            var body = {'nickName' : nickName};
            console.dir(body);
            fetch('http://172.30.1.47:3000/examboard/userinfo', {
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
                    var result = json['success_message'][0];
                    this.setState({...this.state, userId : result['userId'], userPassword : result['userPassword'], nickName : result['nickName'], phoneNumber : result['phoneNumber']});
                    this.getScore();
                }
            })
            .catch(error => console.log('Error : ', error));
        }
    }

    getScore(){
        if(this.state.examId == "") {
            this.setState({...this.state, open : true, message : "시험을 선택해주세요"});
            return;
        }
        var body = {'nickName' : this.state.nickName, 'examId' : this.state.examId};
        fetch('http://172.30.1.47:3000/examboard/getscore', {
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
                console.dir(this.state.score);
                this.setState({...this.state, open : true , message : "Loding....", score : json['success_message']});
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    rewriteinfo(){
        var body = {'nickName' : this.state.nickName, 'userId' : this.state.userId, 'userPassword' : this.state.userPassword, 'prevnickName' : this.state.prevnickName};
        fetch('http://172.30.1.47:3000/examboard/userinfoupdate', {
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
                this.setState({...this.state, open : true, message : '수정이 완료되었습니다.'});
                if(this.state.nickName != this.state.prevnickName){
                    AsyncStorage.setItem({'nickName' : this.state.nickName});
                    this.state.prevnickName = this.state.nickName;
                }
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    rewritePhone(){
        if(this.state.checkphonenumber == false){
            this.setState({...this.state, open : true, message : '휴대폰 인증을 먼저 해주세요'});
            return;
        }
        var body = {'nickName' : this.state.nickName, 'phoneNumber' : this.state.phoneNumber};
        fetch('http://172.30.1.47:3000/examboard/phoneupdate', {
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
                this.setState({...this.state, open : true, message : '핸드폰 번호 수정이 완료되었습니다.'});
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    setRewrite(){
        this.setState({...this.state, canrewrite : true});
    }
    /*
    uploadImg = async() => {
        if(this.state.examId == "") {
            this.setState({...this.state, open : true, message : "등록할 점수의 시험이름을 설정해 주세요"});
            return;
        }
        const formData = new FormData();
        const config = {
            header : {'content-type' : 'multipart/form-data'},
            mode : 'cors',  
        }
        formData.append('file', this.state.img[0]);
        formData.append('examId', this.state.examId);
        formData.append('nickName', this.state.nickName);
        //node로 주소를 던질때는, http://는 붙이지 않는다.
        const res = await axios.post("http://172.30.1.47:3000/examboard/examimgupload/", formData, config);
        if(res['data']['error_message']){
            console.dir(res['error_message']);
            this.setState({...this.state, open : true, message : "upload fail : " + '이미지 업로드 실패'});
            //this.setState({...this.state, img : [], uploadedImg : true});
        }
        else if(res['data']['success_message']){
            this.setState({...this.state, uploadedImg : true});
            this.setState({...this.state, img : []});
        }
    }
    */

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

    async uploadImg(image){
        if(this.state.examId == "") {
            this.setState({...this.state, open : true, message : "등록할 점수의 시험이름을 설정해 주세요"});
            return;
        }
        var body = {'nickName' : this.state.nickName, 'image' : image.base64};
        fetch('http://172.30.1.47:3000/examboard/examimgupload', {
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
                this.setState({...this.state, open : true, message : '시험 점수 이미지가 업로드 되었습니다.'});
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    checkPhonenumber() {
        var data = {'phoneNumber' : this.state.phoneNumber};
        fetch('http://172.30.1.47:3000/signup/checkphone/', {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(data),
        })
        .then(res => res.json())
        .then(json => {
            if(json.hasOwnProperty('error_message')){
                this.setState({...this.state, open : true, message : json['error_message']});
            }
            else if(json.hasOwnProperty('verifyCode')){
                console.log(json['verifyCode']);
                this.setState({...this.state, verifyCode : json['verifyCode'], open : true, message : json['success_message']});
            }
        })
        .catch(error => console.log('Error : ', error));
    }

    checkVerifycode(){
        var verifyCode = this.state.verifyCode, userVerifyCode = this.state.userVerifyCode;
        if(verifyCode == undefined) {}
        if(verifyCode == userVerifyCode){
            this.setState({...this.state, checkphonenumber : true, open : true, message : "핸드폰 인증이 완료되었습니다.", verifyCode : "", userVerifyCode : ""});
        }
        else{
            this.setState({...this.state, open : true, message : '인증번호가 다릅니다.'});
        }
    }

    openModal = () => {
        this.setState({...this.state, open : true});
    }
    closeModal = () => {
        this.setState({...this.state, open : false});
    }

    render()
    {
        return (
            (this.state.open ? 
            <Modal open = {() => this.openModal()} close = {() => this.closeModal()} header = {this.state.message}></Modal> :
            <View class="App">
                <View id="one">
                        <View className="form-inner">
                            <Text>나의 정보</Text>
                            {!this.state.canrewrite ?
                            <Button id="specialone" onClick = {() => this.setRewrite()} title = "수정하기"/>
                            :
                            <View>
                            <View className="form-group">
                                <Text htmlFor="name">ID:</Text>
                                <TextInput value = {this.state.userId} onChangeText = {(text) => this.setState({...this.state, userId : text})}/>
                            </View>
                            <View className="form-group">
                                <Text htmlFor="password">Password:</Text>
                                <TextInput value = {this.state.userPassword} onChangeText = {(text) => this.setState({...this.state, userPassword : text})}/>
                            </View>
                            <View className="form-group">
                                <Text htmlFor="nickname">닉네임:</Text>
                                <TextInput value = {this.state.nickName} onChangeText = {(text) => this.setState({...this.state, nickName : text})}/>
                            </View>
                            <Button id = 'specialone' onClick = {() => this.rewriteinfo()} title = "개인번호 수정"/> 
                            <View className="form-group">
                                <Text htmlFor="phone-number">Phone-Number:</Text>
                                <TextInput type="phone-number" name="phone-number" id="phone-number" value = {this.state.phoneNumber} onChangeText = {(text) => this.setState({...this.state, phoneNumber : text, checkphonenumber : false})}/>
                                <Button onClick = {() => this.checkPhonenumber()} title = "인증번호 전송"></Button>
                                <TextInput type="verifycode" name = "verifycode" id = "veriftycode" value = {this.state.userVerifyCode} onChangeText = {e => this.setState({...this.state, userVerifyCode : text})}/>
                                <Button onClick = {() => this.checkVerifycode()} title = "인증번호 확인"/>
                                <Button onClick = {() => this.rewritePhone()} title = "휴대폰 번호 수정"/>
                            </View>
                            </View>
                            }
                            <View className="unique">
                                <Picker name="ex" onChangeValue = {(itemValue, itemIndex) => this.setState({...this.state, examId : itemValue})} value = {this.state.examId}>
                                    <Picker.Item label = "toeic" value="toeic"/>
                                    <Picker.Item label = "toefl" value="toefl"/>
                                    <Picker.Item label = "teps" value="teps"/>
                                </Picker>
                                    {/* <TextInput type="radio" name="toeic" id="toeic"></TextInput>
                                    <Text for="toeic">토익 점수</Text>
                                    <Button id="specialseven">수정</Button>
                                    <br></br>
                                    <TextInput type="radio" name="toefl" id="toefl"></TextInput>
                                    <Text for="toefl">토플 점수</Text>
                                    <Button id="specialseven">수정</Button>
                                    <br></br>
                                    <TextInput type="radio" name="teps" id="teps"></TextInput>
                                    <Text for="teps">텝스 점수</Text>
                                    <Button id="specialseven">수정</Button> */}
                                {/*<Chart score = {this.state.score} examId = {this.state.examId}></Chart>*/}
                                <Button id = "specialone" onClick = {() => this.getScore()} title = "시험 점수 확인"></Button>
                            </View>
                            {!this.state.uploadedImg ?     
                                <View className="form-group">
                                    <Button id = "specialone" onClick = {() => this.uploadImg()} title = "시험인증사진 업로드"></Button>
                                </View>
                                :
                                    <Text>이미지 업로드 완료</Text>
                            }
                    </View>
                </View>
            </View>
        ));
    }
}

export default Userinfo;