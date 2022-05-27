import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, } from 'react-native';
import Logo from '../../../assets/images/logo.svg';
import Naming from '../../../assets/images/naming.svg';
import Nick from '../../../assets/images/nick.svg';
import Email from '../../../assets/images/email.svg';
import Phone from '../../../assets/images/phone.svg';
import Password from '../../../assets/images/password.svg';
import Eye from '../../../assets/images/eye.svg'
import Eyecopy from '../../../assets/images/Eyecopy.svg'
import { connect } from 'react-redux';
import { authSignUp } from '../../redux/store/reducers/user-reducer';
import Spiner from '../../common/Spiner/Spiner';


function Registration({ navigation, authSignUp, isLoading }) {
    const [secretPass, setSecretPass] = useState(true);
    const handleChange = () => {
        secretPass == true ? setSecretPass(false) : setSecretPass(true);
    };

    const [userData, setUserData] = useState({
        username: '',
        phone: '',
        email: '',
        password: '',
        password2: ''
    })

    const [validate, setValidate] = useState(false)

    if (isLoading) {
        return <Spiner />
    }


    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#E5E5E5", }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <ScrollView>
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                <View style={Platform.OS == 'ios' ? styles.contentIOS : styles.content}>
                    <View style={Platform.OS == 'ios' ? styles.contentLogoIOS : styles.contentLogo}>
                        <Logo alignSelf='center' height={100} marginBottom='5%' />
                        <Naming width={150} alignSelf='center' />
                    </View>

                    <View style={Platform.OS == 'ios' ? styles.contentInpIOS : styles.contentInp}>

                        <View style={styles.userInfo}>
                            <Nick width={20} marginLeft={16} />
                            <TextInput
                                placeholder='Никнейм'
                                style={styles.placeholderText}
                                value={userData.username}
                                onChangeText={(text) => setUserData({ ...userData, username: text })}
                            ></TextInput>
                        </View>

                        <View style={styles.userInfo}>
                            <Email width={20} marginLeft={16} />
                            <TextInput
                                placeholder='E-mail'
                                style={styles.placeholderText}
                                value={userData.email}
                                onChangeText={(text) => setUserData({ ...userData, email: text })}
                            ></TextInput>
                        </View>

                        <View style={styles.userInfo}>
                            <Phone width={20} marginLeft={16} />
                            <TextInput
                                placeholder='996 700 123 456'
                                // keyboardType="numeric"
                                style={styles.placeholderText}
                                value={userData.phone}
                                onChangeText={(text) => setUserData({ ...userData, phone: text })}
                            ></TextInput>
                        </View>

                        <View style={styles.userInfo}>
                            <Password width={20} marginLeft={16} />
                            <TextInput
                                placeholder='Пароль'
                                style={styles.placeholderText}
                                secureTextEntry={secretPass}
                                value={userData.password}
                                onChangeText={(text) => setUserData({ ...userData, password: text })}
                            ></TextInput>
                            <TouchableOpacity onPress={() => handleChange()}>
                                {secretPass == true
                                    ? <Eye width={20} />
                                    : <Eyecopy width={20} />
                                }
                            </TouchableOpacity>

                        </View>

                        <View style={styles.userInfo}>
                            <Password width={20} marginLeft={16} />

                            <TextInput
                                placeholder='Повторить пароль'
                                style={styles.placeholderText}
                                secureTextEntry={secretPass}
                                value={userData.password2}
                                onChangeText={(text) => setUserData({ ...userData, password2: text })}
                            ></TextInput>
                            <TouchableOpacity onPress={() => handleChange()}>
                                {secretPass == true
                                    ? <Eye width={20} />
                                    : <Eyecopy width={20} />
                                }
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                if(userData.password === userData.password2) {
                                    authSignUp(userData)
                                }else {
                                    Alert.alert('Пароли не совпадают', 'Введити заново!')
                                }
                            }}
                            style={styles.button}>
                            <Text style={styles.buttonText}>РЕГИСТРАЦИЯ</Text>
                        </TouchableOpacity>

                    </View>

                </View>
                {/* </TouchableWithoutFeedback> */}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading
    }
}

export default connect(mapStateToProps, { authSignUp })(Registration)


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E5E5E5",
        flex: 1,
        width: '100%',
    },
    content: {
        marginTop: '20%',
        alignItems: 'center',
        width: '100%',
        maxHeight: 700,
        justifyContent: 'space-around',
    },
    contentIOS: {
        marginTop: '20%',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
    },
    contentLogo: {
        height: '25%',
    },
    contentLogoIOS: {
        height: '10%',
        marginBottom: 50
    },
    contentInp: {
        width: '95%',
        height: '60%',
        alignItems: 'center',
    },
    contentInpIOS: {
        width: '95%',
        height: '70%',
        alignItems: 'center',
    },
    userInfo: {
        width: '90%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginTop: 20,
        alignSelf: 'center'
    },
    iconImg: {
        width: 20,
        height: 20,
        marginLeft: 16
    },
    placeholderText: {
        fontSize: 15,
        marginLeft: 10,
        width: '73%',
    },
    button: {
        backgroundColor: '#159CE4',
        marginTop: '5%',

        width: '60%',
        height: 45,
        borderRadius: 20,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 14,
        color: '#ffffff',
        alignSelf: 'center'
    },
    eyeImg: {
        width: 20,
        height: 20,
    }
})