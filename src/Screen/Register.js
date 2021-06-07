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

import Loader from './Components/Loader';

const Register = (props) => {
  const [userId, setUserId] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userVerifyCode, setUserVerifyCode] = useState('');
  const [serverVerifyCode, setServerVerifyCode] = useState('');
  const [checkVerifyCode, setCheckVerifyCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const userNicknameRef = createRef();
  const passwordRef = createRef();
  const phoneNumberRef = createRef();
  const userVerifyCodeRef= createRef();
/*
*/
  const checkPhoneNumberButton = () => {
    var data = {'phoneNumber' : phoneNumber};
    console.log(phoneNumber);
    fetch('http://172.30.1.47:3000/signup/checkphone', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type':"application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.hasOwnProperty('success_message')) {
          setServerVerifyCode(responseJson['verifyCode']);
          alert('인증번호가 전송되었습니다.');
          console.log(
            '인증번호 전송 완료'
          );
        } else {
          setErrortext(responseJson.msg);
          console.dir(responseJson);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  }

  const checkVerifyCodeButton = () => {
    var usercode = userVerifyCode;
    var servercode = serverVerifyCode;

    if(servercode == undefined) {}
    if(servercode == usercode){
      setCheckVerifyCode(true);
      alert('인증되었습니다.');
    }
    else{
      setServerVerifyCode(''); //code reset
      alert('인증번호가 틀립니다.');
    }
  }

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userId) {
      alert('아이디를 입력해주세요');
      return;
    }
    if (!userNickname) {
      alert('닉네임을 입력해주세요');
      return;
    }
    if (!userPassword) {
      alert('비밀번호를 입력해주세요');
      return;
    }
    if (!phoneNumber) {
      alert('전화번호를 입력해주세요');
      return;
    }
    if(!checkVerifyCode){
      alert('전화번호를 인증을 해주세요');
      return;
    }

    //Show Loader
    setLoading(true);
    var data = {'userId':userId, 'nickName':userNickname, 'userPassword':userPassword, 'phoneNumber':phoneNumber};

    fetch('http://172.30.1.47:3000/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        //Header Defination
        'Content-Type':
        "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.hasOwnProperty('success_message')) {
          setIsRegistraionSuccess(true);
          console.log(
            'Registration Successful. Please Login to proceed'
          );
        } else {
          setErrortext(responseJson.msg);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../assets/success.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.successTextStyle}>
          회원가입 성공
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.buttonTextStyle}>즉시 로그인하기</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#307ecc'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/photo.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userId) => setUserId(userId)}
              underlineColorAndroid="#f000"
              placeholder="ID"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() =>
                userNicknameRef.current && userNicknameRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userNickname) => setUserNickname(userNickname)}
              underlineColorAndroid="#f000"
              placeholder="Nickname"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              // keyboardType="email-address"
              ref={userNicknameRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordRef.current &&
                passwordRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userPassword) => setUserPassword(userPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                phoneNumberRef.current &&
                phoneNumberRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
              underlineColorAndroid="#f000"
              placeholder="phone number"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={phoneNumberRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                userVerifyCodeRef.current &&
                userVerifyCodeRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={checkPhoneNumberButton}>
            <Text style={styles.buttonTextStyle}>인증번호 전송</Text>
          </TouchableOpacity>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userVerifyCode) => setUserVerifyCode(userVerifyCode)}
              underlineColorAndroid="#f000"
              placeholder="verify code"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={userVerifyCodeRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={checkVerifyCodeButton}>
            <Text style={styles.buttonTextStyle}>인증번호 확인</Text>
          </TouchableOpacity>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>회원가입</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default Register;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});