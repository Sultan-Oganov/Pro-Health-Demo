import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Logo from '../../../assets/images/logo.svg';
import Naming from '../../../assets/images/naming.svg';
import Email from '../../../assets/images/email.svg';
import Line from '../../../assets/images/line.svg';
import Backicon from '../../../assets/images/backicon.svg';
import { connect } from 'react-redux';
import { getResetToken } from '../../redux/store/reducers/user-reducer';
import Spiner from '../../common/Spiner/Spiner';


function LoginEmail({ navigation, isLoading, getResetToken }) {
    const [email, setEmail] = useState({})

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
                                    navigation.navigate('Login')}
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
                                    Введите почту, на которую зарегистрирован аккаунт, и мы вышлем пароль для восстановления
                                </Text>

                                <View style={styles.userInfo}>
                                    <Email width={20} marginLeft={16} />
                                    <TextInput
                                        placeholder='E-mail'
                                        style={styles.placeholderText}
                                        onChangeText={(text) => setEmail({ email: text })}
                                    ></TextInput>
                                </View>

                                <TouchableOpacity
                                    onPress={() =>
                                        getResetToken(email, navigation)
                                    }
                                    style={styles.button} >
                                    <Text style={styles.buttonText}>OK</Text>
                                </TouchableOpacity>
                            </View>
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
export default connect(mapStateToProps, { getResetToken })(LoginEmail)

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
    iconImg: {
        width: 20,
        height: 20,
        marginLeft: 16
    },
    placeholderText: {
        fontSize: 15,
        marginLeft: 16,
        width: '80%',

    },
    button: {
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