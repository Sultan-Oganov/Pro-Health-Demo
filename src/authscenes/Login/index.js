import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import Logo from '../../../assets/images/logo.svg';
import Naming from '../../../assets/images/naming.svg';
import Email from '../../../assets/images/email.svg';
import Password from '../../../assets/images/password.svg';
import Eye from '../../../assets/images/eye.svg'
import Eyecopy from '../../../assets/images/Eyecopy.svg'
import User from '../../../assets/images/user.svg'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { authSignIn, getAuthUserData } from '../../redux/store/reducers/user-reducer';
import Spiner from '../../common/Spiner/Spiner';


function Login({ isLoading, authSignIn }) {
    const navigation = useNavigation()
    const [secretPass, setSecretPass] = useState(true);
    const handleChange = () => {
        secretPass == true ? setSecretPass(false) : setSecretPass(true);
    };
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    if (isLoading) {
        return <Spiner />
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#E5E5E5", }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <Logo width={150} alignSelf='center' height={100} />
                        <Naming width={150} alignSelf='center' style={{ marginTop: 14, }} />

                        <View style={styles.login}>
                            <View style={styles.userInfo}>
                                <Email width={20} marginLeft={16} />
                                <TextInput
                                    placeholder='E-mail'
                                    style={styles.placeholderText}
                                    value={userData.email}
                                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                                ></TextInput>
                            </View>

                            <View style={styles.userInfo1}>
                                <Password width={20} marginLeft={16} />
                                <TextInput
                                    placeholder='Пароль'
                                    style={styles.placeholderText1}
                                    secureTextEntry={secretPass}
                                    value={userData.password}
                                    onChangeText={(text) => setUserData({ ...userData, password: text })}
                                ></TextInput>
                                <TouchableOpacity onPress={() => handleChange()}>
                                    {secretPass == true
                                        ? <Eye width={20} marginRight={10} />
                                        : <Eyecopy width={20} marginRight={10} />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() =>
                                authSignIn(userData)
                            }
                            style={styles.button}>
                            <Text style={styles.buttonText}>ВОЙТИ</Text>
                        </TouchableOpacity>
                        <View style={styles.end}>
                            <User width={20} marginLeft={20} />
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('Registration')}>
                                <Text style={styles.endtext}>РЕГИСТРАЦИЯ /</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('LoginEmail')}>
                                <Text style={styles.endtext}> НАПОМНИТЬ ПАРОЛЬ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading
    }
}

export default connect(mapStateToProps, { authSignIn, getAuthUserData })(Login)

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E5E5E5",
        flex: 1,
        flexDirection: 'column',

    },
    content: {
        paddingTop: '40%',
        width: '100%',
        maxHeight: 700,
        alignItems: 'center',
    },

    login: {
        marginTop: '10%',
        alignItems: 'center',
    },

    userInfo: {
        width: '94%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginTop: 15,
        alignSelf: 'center'
    },
    userInfo1: {
        width: '90%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginTop: 15,
        alignSelf: 'center'
    },
    placeholderText: {
        fontSize: 15,
        marginLeft: 10,
        width: '80%'
    },
    placeholderText1: {
        fontSize: 15,
        marginLeft: 10,
        width: '74%'
    },
    button: {
        backgroundColor: '#159CE4',
        width: '60%',
        height: 45,
        borderRadius: 20,
        justifyContent: 'center',
        marginTop: '5%',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 15,
        color: '#ffffff',
        alignSelf: 'center'
    },
    end: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '5%',
        textAlign: 'center',
        marginBottom: '5%',

    },
    endtext: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 5,

    },
})