import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Logo from '../../../assets/images/logo.svg';
import Naming from '../../../assets/images/naming.svg';
import Password from '../../../assets/images/password.svg';
import Eye from '../../../assets/images/eye.svg'
import Eyecopy from '../../../assets/images/Eyecopy.svg'
import Line from '../../../assets/images/line.svg';
import Backicon from '../../../assets/images/backicon.svg';
import { connect } from 'react-redux';
import { resetPassword } from '../../redux/store/reducers/user-reducer';
import Spiner from './../../common/Spiner/Spiner';

const NewPassword = ({ navigation, isLoading, resetPassword }) => {

    const [secretPass, setSecretPass] = useState(true);
    const [secretPass2, setSecretPass2] = useState(true);

    const handleChange = (num) => {
        num == 1 ?
            secretPass == true ? setSecretPass(false) : setSecretPass(true)
            :
            secretPass2 == true ? setSecretPass2(false) : setSecretPass2(true)

    };

    const [userData, setUserData] = useState({
        token: '',
        password: '',
    })
    const [pass2, setPass2] = useState('')

    if (isLoading) {
        return <Spiner />
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#E5E5E5", }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('LoginEmail')}
                                style={styles.backView}>
                                <Backicon style={styles.backIcon} />
                            </TouchableOpacity>
                            <View style={styles.textView}>
                                <Text style={styles.headerText}>
                                    Восстановление пароля
                                </Text>
                                <Line style={styles.hederLine} />
                            </View>
                        </View>

                        <View style={styles.content}>
                            <View style={styles.InContent}>
                                <Logo width={150} alignSelf='center' height={100} />
                                <Naming width={150} alignSelf='center' style={{ marginTop: 14, }} />

                                <Text style={styles.emailText}>
                                    Введите новый пароль
                                </Text>

                                <View style={styles.userInfo}>
                                    <Password width={20} marginLeft={16} />
                                    <TextInput
                                        placeholder='Code'
                                        style={styles.placeholderText}
                                        onChangeText={(text) => setUserData({ ...userData, token: text })}
                                    ></TextInput>
                                </View>

                                <View style={styles.userInfo1}>
                                    <Password width={20} marginLeft={16} />
                                    <TextInput
                                        placeholder='New password'
                                        style={styles.placeholderText1}
                                        secureTextEntry={secretPass}
                                        value={userData.password}
                                        onChangeText={(text) => setUserData({ ...userData, password: text })}
                                    ></TextInput>
                                    <TouchableOpacity style={styles.eye} onPress={() => handleChange(1)}>
                                        {secretPass == true
                                            ? <Eye width={20} marginRight={10} />
                                            : <Eyecopy width={20} marginRight={10} />
                                        }
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.userInfo1}>
                                    <Password width={20} marginLeft={16} />
                                    <TextInput
                                        placeholder='Repeat password'
                                        style={styles.placeholderText1}
                                        secureTextEntry={secretPass2}
                                        value={pass2}
                                        onChangeText={(text) => setPass2(text)}
                                    ></TextInput>
                                    <TouchableOpacity style={styles.eye} onPress={() => handleChange(2)}>
                                        {secretPass2 == true
                                            ? <Eye width={20} marginRight={10} />
                                            : <Eyecopy width={20} marginRight={10} />
                                        }
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    onPress={() => {
                                        if (userData.password.length <= 0 || pass2.length <= 0) {
                                            Alert.alert('Заполните поле для паролей!', 'Повторите попытку')
                                        } else if (userData.password == pass2) {
                                            resetPassword(userData, navigation)
                                        } else {
                                            Alert.alert('Пароли не совпадают!', 'Повторите попытку')
                                        }
                                    }}
                                    style={styles.button} >
                                    <Text style={styles.buttonText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading
    }
}

export default connect(mapStateToProps, { resetPassword })(NewPassword);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E5E5E5",
        flex: 1,
    },
    contentMain: {
        width: '100%',
        maxHeight: 700,
    },
    header: {
        flexDirection: 'row',
        width: '80%',
        marginTop: 30,
        paddingVertical: 20,
        justifyContent: 'center'
    },
    backView: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 20,
        justifyContent: 'center',
        marginRight: 30
    },
    backIcon: {
        width: 10,
        height: 10
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 6
    },
    hederLine: {
        alignSelf: 'center',
        marginTop: 4
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    InContent: {
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
        paddingTop: '20%',
    },
    logoImg: {
        width: 100
    },
    namingImg: {
        width: 100
    },
    emailText: {
        width: '90%',
        textAlign: 'center',
        fontSize: 12,
        marginTop: '10%',

    },
    userInfo: {
        width: '90%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginTop: '10%',
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
    iconImg: {
        width: 20,
        height: 20,
        marginLeft: 16,

    },
    placeholderText: {
        fontSize: 15,
        marginLeft: 16,
        width: '80%',
    },
    placeholderText1: {
        fontSize: 15,
        marginLeft: 10,
        width: '74%'
    }, button: {
        backgroundColor: '#159CE4',
        width: '60%',
        height: 45,
        borderRadius: 20,
        justifyContent: 'center',
        marginTop: '10%',
        marginBottom: '5%',


    },
    buttonText: {
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 12,
        color: '#ffffff',
        alignSelf: 'center'
    },
})